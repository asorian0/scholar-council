import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WINDOW } from 'ngx-window-token';

import { ScrollToTopComponent } from './scroll-to-top.component';

describe('ScrollToTopComponent', () => {
  const win = {
    pageYOffset: 0,
    requestAnimationFrame: jest.fn(),
    scrollTo: jest.fn(),
    querySelectorAll: jest.fn(),
    document: {
      documentElement: {
        scrollTop: 0,
      },
      body: {
        scrollTop: 0,
      },
    },
  } as unknown as Window;

  let component: ScrollToTopComponent;
  let fixture: ComponentFixture<ScrollToTopComponent>;

  beforeEach(async () => {
    jest.resetAllMocks();

    await TestBed.configureTestingModule({
      declarations: [ScrollToTopComponent],
      providers: [
        {
          provide: WINDOW,
          useValue: win,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollToTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set windowScrolled to true', () => {
    component.onWindowScroll();

    expect(component.windowScrolled).toBe(false);
  });

  it('should set windowScrolled to false', () => {
    component.windowScrolled = true;

    component.onWindowScroll();

    expect(component.windowScrolled).toBe(false);
  });

  it('should triggerScroll', () => {
    win.document.body.scrollTop = 1;

    component.triggerScroll();

    expect(win.requestAnimationFrame).toHaveBeenCalled();
    expect(win.scrollTo).toHaveBeenCalled();
  });

  it('should not triggerScroll', () => {
    win.document.body.scrollTop = 0;

    component.triggerScroll();

    expect(win.requestAnimationFrame).not.toHaveBeenCalled();
    expect(win.scrollTo).not.toHaveBeenCalled();
  });
});
