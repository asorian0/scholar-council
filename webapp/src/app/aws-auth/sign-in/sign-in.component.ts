import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AwsAuthService } from '../shared/aws-auth.service';

@Component({
  selector: 'app-aws-auth-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  public form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private readonly service: AwsAuthService) {}

  public googleSignIn(): void {
    this.service.signInWithGoogle();
  }
}
