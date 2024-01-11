import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaProps } from '../interfaces/stack/lambda-stack.interface';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class LambdaStack extends cdk.Stack {
  public readonly getUser: lambda.Function;

  constructor(scope: Construct, id: string, props: LambdaProps) {
    super(scope, id, props);
    const getUserLambda = new lambda.Function(this, 'getUser', {
      runtime: lambda.Runtime.NODEJS_LATEST,
      code: lambda.Code.fromAsset('lambda' + '/getUser'),
      timeout: cdk.Duration.seconds(10),
      memorySize: 2048,
      handler: 'index.handler',
      environment: {
        USER_TABLE: props.dbs.user.tableName
      }
    });
    props.dbs.user.grantReadData(getUserLambda);
    this.getUser = getUserLambda;
  }
}
