import * as cdk from 'aws-cdk-lib';

export interface IAppStackProps extends cdk.StackProps {
  appName: string;
  
}