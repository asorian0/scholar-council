import { TestBed } from '@angular/core/testing';

import { TosNoticeService } from './tos-notice.service';

describe('TosNoticeService', () => {
  let service: TosNoticeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TosNoticeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
