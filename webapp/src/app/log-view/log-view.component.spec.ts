import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AppSyncService } from '../shared/app-sync.service';

import { LogViewComponent } from './log-view.component';

describe('LogViewComponent', () => {
  const api = {
    query: jest.fn(() => of({ data: { getReport: {} } })),
  } as unknown as AppSyncService;
  const route = {
    snapshot: {
      params: {
        id: 'id',
      },
    },
  } as unknown as ActivatedRoute;

  let component: LogViewComponent;
  let fixture: ComponentFixture<LogViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogViewComponent],
      providers: [
        {
          provide: AppSyncService,
          useValue: api,
        },
        {
          provide: ActivatedRoute,
          useValue: route,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on init', () => {
    component.ngOnInit();

    expect(api.query).toHaveBeenCalled();
    expect(component.data).toBeDefined();
  });
});
