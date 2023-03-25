import { Component } from '@angular/core';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-tos',
  templateUrl: './tos.component.html',
  styleUrls: ['./tos.component.scss']
})
export class TosComponent {
  public readonly subtitle = environment.subtitle;
}
