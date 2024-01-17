import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { IAppStackProps } from './stack.interface';
import * as wafv2 from 'aws-cdk-lib/aws-wafv2';
export interface APIProps extends IAppStackProps {
  lambdas: {
    getUserLambda: lambda.Function
  },
  userpool: cognito.UserPool,
  waf: wafv2.CfnWebACL
}