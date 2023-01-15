import {
  CfnOutput,
  NestedStack,
  NestedStackProps,
  RemovalPolicy,
} from 'aws-cdk-lib';
import { Bucket, BucketAccessControl, IBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class WebappStack extends NestedStack {
  private readonly bucketName = 'scholar-council-webapp';
  private readonly bucket: IBucket;

  constructor(scope: Construct, id: string, props?: NestedStackProps) {
    super(scope, id, props);

    try {
      this.bucket = Bucket.fromBucketName(
        this,
        'webapp-bucket',
        this.bucketName
      );
    } catch (e) {
      this.bucket = new Bucket(this, 'webapp-bucket', {
        websiteIndexDocument: 'index.html',
        websiteErrorDocument: 'index.html',
        publicReadAccess: true,
        enforceSSL: false,
        bucketName: this.bucketName,
        removalPolicy: RemovalPolicy.RETAIN,
        versioned: false,
        accessControl: BucketAccessControl.PUBLIC_READ,
      });
    }

    new CfnOutput(scope, 'webapp-bucket-dns', {
      value: this.bucket.bucketWebsiteDomainName,
    });
  }
}
