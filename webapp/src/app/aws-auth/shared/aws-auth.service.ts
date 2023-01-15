import { Inject, Injectable } from '@angular/core';
import { Auth, CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { Hub } from '@aws-amplify/core';
import { WINDOW } from 'ngx-window-token';
import { ReplaySubject, Subject } from 'rxjs';

import { environment } from '../../../environments/environment';

import { CurrentUser } from './current-user.model';

@Injectable({
  providedIn: 'root',
})
export class AwsAuthService {
  public confirmationUsername?: string;
  public authChange$: Subject<any> = new Subject();
  public user$ = new ReplaySubject<CurrentUser>(1);

  constructor(@Inject(WINDOW) private readonly window: Window) {
    Auth.configure(environment.auth);

    Hub.listen('auth', (cb) => {
      if (cb.payload.event === 'signIn') {
        this.setUser(cb.payload.data.signInUserSession);
      } else if (cb.payload.event === 'oAuthSignOut') {
        this.setUser(null);
      }
    });

    Auth.currentSession().then((session: any) => {
      this.setUser(session);
    }).catch(() => {
      /*
       * Recurrent error happens here when there is no token or even when it was already revoked or expired.
       * Since this is expected, seems good to avoid polluting log with this kind of error; so, catching and ignoring.
       */
    });
  }

  public signInWithGoogle(): void {
    void Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google,
    });
  }

  public signOut(): void {
    Auth.signOut().then(() => {
      this.window.localStorage.clear();
    });
  }

  private setUser(session: any): void {
    if (session) {
      this.user$.next({
        accessToken: session.accessToken.jwtToken,
        idToken: session.idToken.jwtToken,
        refreshToken: session.refreshToken.jwtToken,
        email: session.idToken.payload.email,
        username: session.idToken.payload['cognito:username'],
        id: session.idToken.payload.sub,
        expiresAt: session.idToken.payload.exp,
        admin: (session.idToken.payload['cognito:groups'] ?? []).includes(
          'admin'
        ),
      });
    } else {
      this.user$.next(null as any);
    }
  }
}
