import { IAppStackProps } from "./stack.interface";
import * as wafv2 from 'aws-cdk-lib/aws-wafv2';

export interface IUserPoolStackProps extends IAppStackProps {
  waf: wafv2.CfnWebACL
}