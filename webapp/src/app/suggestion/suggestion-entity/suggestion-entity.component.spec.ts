import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AppSyncService } from '../../shared/app-sync.service';

import { SuggestionEntityComponent } from './suggestion-entity.component';

describe('SuggestionEntityComponent', () => {
  const api = {
    query: jest.fn(() =>
      of({
        data: {
          getSuggestion: {},
        },
      })
    ),
    mutate: jest.fn(() => of({})),
  } as unknown as AppSyncService;
  const snackbar = {
    open: jest.fn(),
  } as unknown as MatSnackBar;

  let component: SuggestionEntityComponent;
  let fixture: ComponentFixture<SuggestionEntityComponent>;
  const route = {
    snapshot: {
      params: {},
    },
  } as unknown as ActivatedRoute;
  const router = {
    navigateByUrl: jest.fn(),
  } as unknown as Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuggestionEntityComponent],
      providers: [
        {
          provide: AppSyncService,
          useValue: api,
        },
        {
          provide: ActivatedRoute,
          useValue: route,
        },
        {
          provide: MatSnackBar,
          useValue: snackbar,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SuggestionEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not load data on init if id is present', () => {
    route.snapshot.params = {};

    component.ngOnInit();

    expect(api.query).not.toHaveBeenCalled();
  });

  it('should load data on init if id is present', () => {
    route.snapshot.params['id'] = 'id';

    component.ngOnInit();

    expect(api.query).toHaveBeenCalled();
  });

  it('should submit successfully', () => {
    component.form.setValue({
      senderName: 'name',
      email: 'name@host.com',
      content: 'content',
    });

    component.submit();

    expect(api.mutate).toHaveBeenCalled();
    expect(snackbar.open).toHaveBeenCalledWith(component.submitSuccessMessage, '', { duration: 5000 });
  });

  it('should submit failing', () => {
    component.form.setValue({
      senderName: 'name',
      email: 'name@host.com',
      content: 'content',
    });
    (api.mutate as jest.Mock).mockImplementationOnce(() => {
      return throwError(() => {
        throw new Error();
      });
    });

    component.submit();

    expect(api.mutate).toHaveBeenCalled();
    expect(snackbar.open).toHaveBeenCalledWith(component.submitFailMessage);
  });
});
