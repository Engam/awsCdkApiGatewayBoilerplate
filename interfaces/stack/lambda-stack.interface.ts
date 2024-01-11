import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { IAppStackProps } from './stack.interface';

export interface LambdaProps extends IAppStackProps {
  dbs: {
    user: dynamodb.ITable
  }
}

