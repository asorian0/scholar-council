import { TestBed } from '@angular/core/testing';

import { AwsAuthService } from './aws-auth.service';

describe('AwsAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AwsAuthService = TestBed.get(AwsAuthService);
    expect(service).toBeTruthy();
  });
});
