import { Component } from '@angular/core';
import { TosNoticeService } from '../tos-notice.service';

@Component({
  selector: 'app-tos-notice',
  templateUrl: './tos-notice.component.html',
  styleUrls: ['./tos-notice.component.scss']
})
export class TosNoticeComponent {
  constructor(private readonly service: TosNoticeService) {
  }

  public tosOk(): void {
    this.service.tosOk$.next(true);
  }
}
