import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { IAppStackProps } from './stack.interface';

export interface APIProps extends IAppStackProps {
  lambdas: {
    getUserLambda: lambda.Function
  },
  userpool: cognito.UserPool
}