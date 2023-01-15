import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AppSyncService } from '../../shared/app-sync.service';

import { SuggestionListComponent } from './suggestion-list.component';

describe('SuggestionListComponent', () => {
  const query = jest.fn(() => of({ data: { listSuggestion: [] } }));
  const api = {
    query,
  } as unknown as AppSyncService;

  let component: SuggestionListComponent;
  let fixture: ComponentFixture<SuggestionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuggestionListComponent],
      providers: [{ provide: AppSyncService, useValue: api }],
    }).compileComponents();

    fixture = TestBed.createComponent(SuggestionListComponent);
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
