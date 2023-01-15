import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';

import { AwsAuthRoutingModule } from './aws-auth-routing.module';
import { AwsAuthOptions } from './shared/aws-auth-options';
import { AwsAuthOptionsToken } from './shared/aws-auth-options.token';
import { GoogleLoginButtonComponent } from './shared/google-login-button/google-login-button.component';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  declarations: [SignInComponent, GoogleLoginButtonComponent],
  imports: [
    CommonModule,
    AwsAuthRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    TranslateModule.forChild({
      extend: true,
    }),
  ],
  exports: [SignInComponent],
  entryComponents: [SignInComponent],
})
export class AwsAuthModule {
  static forRoot(options: AwsAuthOptions): ModuleWithProviders<AwsAuthModule> {
    if (!options || !options.amplify) {
      throw new Error(
        'AwsAuthModule requires options to be initialized! ' +
          'Please make sure you are importing it with .forRoot(options)'
      );
    }
    return {
      ngModule: AwsAuthModule,
      providers: [
        {
          provide: AwsAuthOptionsToken,
          useValue: options,
        },
      ],
    };
  }
}
