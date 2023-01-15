import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { InfoComponent } from './info.component';

describe('InfoComponent', () => {
  const sheet = {
    open: jest.fn(),
  } as unknown as MatBottomSheet;

  let component: InfoComponent;
  let fixture: ComponentFixture<InfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoComponent],
      providers: [
        {
          provide: MatBottomSheet,
          useValue: sheet,
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open sheet on open()', () => {
    component.open();

    expect(sheet.open).toHaveBeenCalled();
  });
});
