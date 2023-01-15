import { Component, HostBinding, HostListener, Inject } from '@angular/core';
import { WINDOW } from 'ngx-window-token';

@Component({
  selector: 'app-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss'],
})
export class ScrollToTopComponent {
  @HostBinding('class.d-block')
  public windowScrolled = false;

  constructor(@Inject(WINDOW) private readonly window: Window) {}

  @HostListener('window:scroll', [])
  public onWindowScroll(): void {
    if (
      this.window.pageYOffset ||
      this.window.document.documentElement.scrollTop ||
      this.window.document.body.scrollTop > 100
    ) {
      this.windowScrolled = true;
    } else if (
      (this.windowScrolled && this.window.pageYOffset) ||
      this.window.document.documentElement.scrollTop ||
      this.window.document.body.scrollTop < 10
    ) {
      this.windowScrolled = false;
    }
  }

  public triggerScroll(): void {
    const currentScroll =
      this.window.document.documentElement.scrollTop ||
      this.window.document.body.scrollTop;

    if (currentScroll > 0) {
      this.window.requestAnimationFrame(this.triggerScroll);
      this.window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }
}
