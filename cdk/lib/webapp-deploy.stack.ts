import * as cdk from 'aws-cdk-lib';
import { CfnOutput, NestedStack, NestedStackProps } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import { resolve } from 'path';

export class WebappDeploymentStack extends NestedStack {
  constructor(scope: Construct, id: string, props?: NestedStackProps) {
    super(scope, id, props);

    const bucket = Bucket.fromBucketName(
      this,
      'webapp-bucket',
      'scholar-council-webapp'
    );

    new BucketDeployment(this, 'webapp-bucket-deployment', {
      sources: [Source.asset(resolve(__dirname, '../webapp.zip'))],
      destinationBucket: bucket,
      prune: true,
      retainOnDelete: false,
      memoryLimit: 128,
    });

    new CfnOutput(scope, 'webapp-bucket-dns', {
      value: bucket.bucketWebsiteDomainName,
    });
  }
}

export class WebappDeployStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new WebappDeploymentStack(this, 'webapp-deploy', props);
    // TODO invalidate cloudfront cache
  }
}
