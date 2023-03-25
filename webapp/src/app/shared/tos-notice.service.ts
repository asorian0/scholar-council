import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TosNoticeService {
  public readonly tosOk$ = new ReplaySubject<boolean>(1);
}
