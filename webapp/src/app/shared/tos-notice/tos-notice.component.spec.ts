import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TosNoticeComponent } from './tos-notice.component';

describe('TosNoticeComponent', () => {
  let component: TosNoticeComponent;
  let fixture: ComponentFixture<TosNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TosNoticeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TosNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
