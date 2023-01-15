import { Injectable } from '@angular/core';
import {
  ApolloClient,
  ApolloClientOptions,
  ApolloLink,
  DocumentNode,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client/core';
import { AuthLink, AuthOptions, createAuthLink } from 'aws-appsync-auth-link';
import { AUTH_TYPE } from 'aws-appsync-auth-link/lib/auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { catchError, from, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

import { AwsAuthService } from '../aws-auth/shared/aws-auth.service';
import { CurrentUser } from '../aws-auth/shared/current-user.model';

@Injectable({
  providedIn: 'root',
})
export class AppSyncService {
  private readonly url = environment.apiUrl;
  private readonly region = 'eu-west-1';
  private readonly cognitoAuth: AuthOptions = {
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: () => this.getToken(),
  };
  private readonly apiKeyAuth: AuthOptions = {
    type: AUTH_TYPE.API_KEY,
    apiKey: environment.apiKey,
  };

  private client!: ApolloClient<NormalizedCacheObject>;
  private user?: CurrentUser;

  constructor(private readonly auth: AwsAuthService) {
    this.auth.user$.subscribe((user) => (this.user = user));
  }

  public query(query: DocumentNode, variables: any): Observable<any> {
    return from(
      this.client.query({
        query,
        variables,
        fetchPolicy: 'no-cache',
      })
    ).pipe(
      catchError((e: any) => {
        console.log('query error::', e);
        return of({});
      })
    );
  }

  public mutate(mutation: DocumentNode, variables: any): Observable<any> {
    return from(
      this.client.mutate({
        mutation,
        variables,
      })
    ).pipe(
      catchError((e: any) => {
        console.log('mutate error::', e);
        return of({});
      })
    );
  }

  public start(): void {
    const options: ApolloClientOptions<any> = {
      link: ApolloLink.from([
        this.createHttpLink(),
        this.createSubscriptionLink(),
      ]),
      cache: new InMemoryCache(),
    };

    this.client = new ApolloClient(options);
  }

  public stop(): void {
    this.client.stop();
    this.client
      .resetStore()
      .then(() => console.info('GqlClientService cleaned up store!'));
  }

  private createHttpLink(): AuthLink {
    return createAuthLink({
      url: this.url,
      region: this.region,
      auth: this.user != null ? this.cognitoAuth : this.apiKeyAuth,
    });
  }

  private createSubscriptionLink(): ApolloLink {
    return createSubscriptionHandshakeLink(
      {
        url: this.url,
        region: this.region,
        auth: this.user != null ? this.cognitoAuth : this.apiKeyAuth,
      },
      new HttpLink({ uri: this.url })
    );
  }

  private getToken(): string {
    return this.user?.accessToken as string;
  }
}
