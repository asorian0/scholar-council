import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { WINDOW } from 'ngx-window-token';
import { of, ReplaySubject } from 'rxjs';

import { AppComponent } from './app.component';
import { AwsAuthService } from './aws-auth/shared/aws-auth.service';
import { AppSyncService } from './shared/app-sync.service';

describe('AppComponent', () => {
  const user$ = new ReplaySubject(1);
  const auth = {
    signOut: jest.fn(),
    user$,
  } as unknown as AwsAuthService;
  const events$ = new ReplaySubject(1);
  const router = {
    navigateByUrl: jest.fn(() => Promise.resolve()),
    events: events$,
  } as unknown as Router;
  const route = {} as unknown as ActivatedRoute;
  const api = {
    start: jest.fn(),
    query: jest.fn(() => of({ data: { listReport: [] } })),
  } as unknown as AppSyncService;
  const win = {
    document: {
      title: '',
    },
  } as unknown as Window;

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        {
          provide: AwsAuthService,
          useValue: auth,
        },
        {
          provide: Router,
          useValue: router,
        },
        {
          provide: ActivatedRoute,
          useValue: route,
        },
        {
          provide: AppSyncService,
          useValue: api,
        },
        {
          provide: WINDOW,
          useValue: win,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should set window.document.title`, () => {
    expect(win.document.title).toEqual(component.title);
  });

  it('should start api and load data on init', () => {
    component.ngOnInit();

    expect(api.start).toHaveBeenCalled();
    expect(api.query).toHaveBeenCalled();
    expect(component.data).toBeDefined();
  });

  it('should handle logged in user', () => {
    const user = { email: 'email' };

    user$.next(user);

    expect(router.navigateByUrl).not.toHaveBeenCalled();
    expect(api.start).toHaveBeenCalled();
    expect(component.username).toBe(user.email);
  });

  it('should handle logged out user', () => {
    user$.next(null);

    expect(router.navigateByUrl).toHaveBeenCalled();
    expect(api.start).toHaveBeenCalled();
    expect(component.username).toBeUndefined();
  });

  it('should logout', () => {
    component.logout();

    expect(auth.signOut).toHaveBeenCalled();
  });
});
