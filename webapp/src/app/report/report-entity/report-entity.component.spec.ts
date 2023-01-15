import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AppSyncService } from '../../shared/app-sync.service';

import { ReportEntityComponent } from './report-entity.component';

describe('ReportEntityComponent', () => {
  const api = {
    query: jest.fn(() =>
      of({
        data: {
          getReport: {},
        },
      })
    ),
    mutate: jest.fn(() => of({})),
  } as unknown as AppSyncService;
  const snackbar = {
    open: jest.fn(),
  } as unknown as MatSnackBar;

  let component: ReportEntityComponent;
  let fixture: ComponentFixture<ReportEntityComponent>;
  const route = {
    snapshot: {
      params: {},
    },
  } as unknown as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportEntityComponent],
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

    fixture = TestBed.createComponent(ReportEntityComponent);
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

  it('should create', () => {
    route.snapshot.params = {};

    component.ngOnInit();
    component.submit();

    expect(api.mutate).toHaveBeenCalled();
    expect(snackbar.open).toHaveBeenCalledWith(component.createSuccessMessage);
  });

  it('should update', () => {
    route.snapshot.params['id'] = 'id';

    component.ngOnInit();
    component.submit();

    expect(api.mutate).toHaveBeenCalled();
    expect(snackbar.open).toHaveBeenCalledWith(component.updateSuccessMessage);
  });
});
