import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { ApiStack } from './api.stack';
import { AuthStack } from './auth.stack';
import { WebappStack } from './webapp.stack';

export class CdkStack extends cdk.Stack {
  private readonly authStack: AuthStack;
  private readonly apiStack: ApiStack;
  private readonly webappStack: WebappStack;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.authStack = new AuthStack(this, 'auth', props);
    this.apiStack = new ApiStack(this, 'api', this.authStack, props);
    this.webappStack = new WebappStack(this, 'webapp', props);
    // TODO Cloudfront
    // TODO Route53
  }
}
