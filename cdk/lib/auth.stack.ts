import { CfnOutput, NestedStack, NestedStackProps } from 'aws-cdk-lib';
import {
  CfnUserPool,
  CfnUserPoolClient,
  CfnUserPoolDomain,
  CfnUserPoolIdentityProvider,
} from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';

export class AuthStack extends NestedStack {
  public userPool: CfnUserPool;

  constructor(scope: Construct, id: string, props?: NestedStackProps) {
    super(scope, id, props);

    this.userPool = new CfnUserPool(this, 'user-pool', {
      accountRecoverySetting: {
        recoveryMechanisms: [
          {
            name: 'verified_email',
            priority: 1,
          },
          {
            name: 'verified_phone_number',
            priority: 2,
          },
        ],
      },
      adminCreateUserConfig: {
        allowAdminCreateUserOnly: false,
        unusedAccountValidityDays: 7,
      },
      autoVerifiedAttributes: ['email'],
      deviceConfiguration: {
        challengeRequiredOnNewDevice: false,
        deviceOnlyRememberedOnUserPrompt: true,
      },
      emailConfiguration: {
        emailSendingAccount: 'COGNITO_DEFAULT',
      },
      policies: {
        passwordPolicy: {
          minimumLength: 8,
          requireLowercase: true,
          requireUppercase: true,
          requireNumbers: true,
          requireSymbols: false,
        },
      },
      userPoolName: 'scholar-council',
      usernameAttributes: ['email'],
      usernameConfiguration: {
        caseSensitive: true,
      },
    });

    const googleProvider = new CfnUserPoolIdentityProvider(
      this,
      'user-pool-google',
      {
        attributeMapping: {
          email: 'email',
        },
        providerName: 'Google',
        providerType: 'Google',
        providerDetails: {
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          authorize_scopes: 'openid profile email',
        },
        userPoolId: this.userPool.ref,
      }
    );
    googleProvider.addDependsOn(this.userPool);

    const webClient = new CfnUserPoolClient(this, 'user-pool-client', {
      userPoolId: this.userPool.ref,
      allowedOAuthFlows: ['code'],
      allowedOAuthFlowsUserPoolClient: true,
      allowedOAuthScopes: [
        'phone',
        'email',
        'openid',
        'profile',
        'aws.cognito.signin.user.admin',
      ],
      callbackUrLs: [
        'http://localhost:4200',
        'https://consejo-escolar.ceip-mariana-pineda.click',
      ],
      clientName: 'scholar-council-web-client',
      explicitAuthFlows: [
        'ALLOW_ADMIN_USER_PASSWORD_AUTH',
        'ALLOW_USER_SRP_AUTH',
        'ALLOW_REFRESH_TOKEN_AUTH',
      ],
      generateSecret: false,
      logoutUrLs: [
        'http://localhost:4200',
        'https://consejo-escolar.ceip-mariana-pineda.click',
      ],
      preventUserExistenceErrors: 'ENABLED',
      refreshTokenValidity: 7,
      supportedIdentityProviders: ['Google'],
    });
    webClient.addDependsOn(this.userPool);
    webClient.addDependsOn(googleProvider);

    new CfnUserPoolDomain(this, 'user-pool-domain', {
      domain: 'scholar-council',
      userPoolId: this.userPool.ref,
    }).addDependsOn(this.userPool);

    new CfnOutput(scope, 'auth-user-pool-id', {
      value: this.userPool.ref,
    });
    new CfnOutput(scope, 'auth-user-pool-web-client-id', {
      value: webClient.ref,
    });
  }
}
