import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppSyncService } from '../../shared/app-sync.service';

import { ReportListComponent } from './report-list.component';

describe('ReportListComponent', () => {
  const api = {
    query: jest.fn(() =>
      of({
        data: {
          listReport: [],
        },
      })
    ),
  } as unknown as AppSyncService;

  let component: ReportListComponent;
  let fixture: ComponentFixture<ReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportListComponent],
      providers: [
        {
          provide: AppSyncService,
          useValue: api,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on init', () => {
    component.ngOnInit();

    expect(api.query).toHaveBeenCalled();
    expect(component.dataSource).toBeDefined();
  });
});
