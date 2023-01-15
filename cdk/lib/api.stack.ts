import {
  CfnApiKey,
  CfnDataSource,
  CfnGraphQLApi,
  CfnGraphQLSchema,
  CfnResolver,
} from 'aws-cdk-lib/aws-appsync';
import { CfnTable } from 'aws-cdk-lib/aws-dynamodb';
import {
  CfnOutput,
  Duration,
  Expiration,
  NestedStack,
  NestedStackProps,
} from 'aws-cdk-lib';
import { PolicyDocument, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { readFileSync } from 'fs';
import { sync } from 'glob';
import { resolve } from 'path';

import { AuthStack } from './auth.stack';

export class ApiStack extends NestedStack {
  constructor(
    scope: Construct,
    id: string,
    auth: AuthStack,
    props?: NestedStackProps
  ) {
    super(scope, id, props);

    const table = new CfnTable(this, 'database', {
      tableName: 'scholar-council',
      keySchema: [
        {
          attributeName: 'pk',
          keyType: 'HASH',
        },
        {
          attributeName: 'sk',
          keyType: 'RANGE',
        },
      ],
      attributeDefinitions: [
        {
          attributeName: 'pk',
          attributeType: 'S',
        },
        {
          attributeName: 'sk',
          attributeType: 'S',
        },
      ],
      billingMode: 'PAY_PER_REQUEST',
    });

    const api = new CfnGraphQLApi(this, 'api', {
      name: 'scholar-council-api',
      authenticationType: 'AMAZON_COGNITO_USER_POOLS',
      userPoolConfig: {
        userPoolId: auth.userPool.ref,
        awsRegion: 'eu-west-1',
        defaultAction: 'ALLOW',
      },
      additionalAuthenticationProviders: [
        {
          authenticationType: 'API_KEY',
        },
      ],
      xrayEnabled: false,
    });
    api.addDependsOn(auth.userPool);
    api.addDependsOn(table);

    const apiKey = new CfnApiKey(this, 'api-key', {
      apiId: api.attrApiId,
      expires: Expiration.after(Duration.days(365)).toEpoch(),
    });

    const schemaData = readFileSync(
      resolve(__dirname, '../graphql/schema.graphql'),
      { encoding: 'utf-8' }
    );

    const schema = new CfnGraphQLSchema(this, 'api-schema', {
      apiId: api.attrApiId,
      definition: schemaData.trim(),
    });
    schema.addDependsOn(api);

    const databaseSourceRole = new Role(this, 'api-database-role', {
      assumedBy: new ServicePrincipal('appsync.amazonaws.com'),
      roleName: 'scholar-council-api-database-role',
      inlinePolicies: {
        dynamodb: PolicyDocument.fromJson({
          Version: '2012-10-17',
          Statement: [
            {
              Effect: 'Allow',
              Action: [
                'dynamodb:GetItem',
                'dynamodb:Query',
                'dynamodb:PutItem',
                'dynamodb:UpdateItem',
                'dynamodb:DeleteItem',
              ],
              Resource: table.attrArn,
            },
          ],
        }),
      },
    });
    const databaseSource = new CfnDataSource(this, 'api-database', {
      apiId: api.attrApiId,
      name: 'database',
      type: 'AMAZON_DYNAMODB',
      dynamoDbConfig: {
        awsRegion: 'eu-west-1',
        tableName: table.tableName as string,
      },
      serviceRoleArn: databaseSourceRole.roleArn,
    });
    databaseSource.addDependsOn(schema);

    const resolversPath = resolve(__dirname, '../graphql/resolvers');
    const requestResolvers = sync('*.request.vtl', { cwd: resolversPath });

    requestResolvers.forEach((resolver) => {
      const resolverSplit = resolver.split('.');
      const type = resolverSplit[0];
      const operation = resolverSplit[1];

      const requestData = readFileSync(resolve(resolversPath, resolver), {
        encoding: 'utf-8',
      });
      const responseData = readFileSync(
        resolve(
          resolversPath,
          resolver.replace('.request.vtl', '.response.vtl')
        ),
        { encoding: 'utf-8' }
      );

      new CfnResolver(this, `api-resolver-${type}-${operation}`, {
        apiId: api.attrApiId,
        fieldName: operation,
        typeName: type,
        dataSourceName: databaseSource.attrName,
        kind: 'UNIT',
        requestMappingTemplate: requestData,
        responseMappingTemplate: responseData,
      }).addDependsOn(databaseSource);
    });

    new CfnOutput(scope, 'api-url', {
      value: api.attrGraphQlUrl,
    });

    new CfnOutput(scope, 'api-key', {
      value: apiKey.attrApiKey,
    });
  }
}
