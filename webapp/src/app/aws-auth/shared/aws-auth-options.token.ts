import { InjectionToken } from '@angular/core';

const token = 'AwsAuthOptions';
export const AwsAuthOptionsToken = new InjectionToken<string>(token, {
  providedIn: 'root',
  factory: () => token,
});
