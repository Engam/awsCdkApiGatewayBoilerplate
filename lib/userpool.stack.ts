
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import * as cognito from 'aws-cdk-lib/aws-cognito';
import { IUserPoolStackProps } from '../interfaces/stack/userpool-stack.interface';
import * as wafv2 from 'aws-cdk-lib/aws-wafv2';

export class UserpoolStack extends cdk.Stack {
  public readonly pool: cognito.UserPool;
  
  constructor(scope: Construct, id: string, props: IUserPoolStackProps) {
    super(scope, id, props);

    const pool = new cognito.UserPool(this, props.appName + '-userpool', {
      selfSignUpEnabled: false,
      autoVerify: {
        email: true,
        phone:true,
      },
      accountRecovery: cognito.AccountRecovery.NONE,
      signInAliases: {
        username: true
      },

      advancedSecurityMode: cognito.AdvancedSecurityMode.ENFORCED,
      mfa: cognito.Mfa.OFF,
    });

    pool.addClient(props.appName + '-userpoolClient', {
      accessTokenValidity: cdk.Duration.minutes(5),
      refreshTokenValidity: cdk.Duration.hours(1),
      idTokenValidity: cdk.Duration.minutes(5),
      authFlows: {
        userPassword: true,
        adminUserPassword: false,
        custom: false,
        userSrp: false
      }
    });

    const wafAssociation = new wafv2.CfnWebACLAssociation(this, props.appName + '-cognito-waf-association', {
      resourceArn: pool.userPoolArn,
      webAclArn: props.waf.attrArn
    });



    this.pool = pool;

  }
  
}