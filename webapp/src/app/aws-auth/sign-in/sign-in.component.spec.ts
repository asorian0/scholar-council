import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AwsAuthService } from '../shared/aws-auth.service';

import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  const service = {
    signInWithGoogle: jest.fn(),
  } as unknown as AwsAuthService;

  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SignInComponent],
      providers: [
        {
          provide: AwsAuthService,
          useValue: service,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invoke signInWithGoogle() in google sign in', () => {
    component.googleSignIn();

    expect(service.signInWithGoogle).toHaveBeenCalled();
  });
});
