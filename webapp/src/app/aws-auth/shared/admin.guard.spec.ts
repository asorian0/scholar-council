import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ReplaySubject } from 'rxjs';

import { AdminGuard } from './admin.guard';
import { AwsAuthService } from './aws-auth.service';

describe('AdminGuard', () => {
  const user$ = new ReplaySubject(1);
  const auth = {
    user$,
  } as unknown as AwsAuthService;

  let guard: AdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AwsAuthService,
          useValue: auth,
        },
      ],
    });
    guard = TestBed.inject(AdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true', (done) => {
    user$.next({ admin: true });

    guard
      .canActivate(
        {} as unknown as ActivatedRouteSnapshot,
        {} as unknown as RouterStateSnapshot
      )
      .subscribe((value) => {
        expect(value).toBe(true);
        done();
      });
  });

  it('should return false', (done) => {
    user$.next({ admin: false });

    guard
      .canActivate(
        {} as unknown as ActivatedRouteSnapshot,
        {} as unknown as RouterStateSnapshot
      )
      .subscribe((value) => {
        expect(value).toBe(false);
        done();
      });
  });
});
