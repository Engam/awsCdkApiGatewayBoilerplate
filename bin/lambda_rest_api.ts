#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';

import { IConfig } from '../interfaces/config.interface';
import * as config from '../config.json';
import { DBStack } from '../lib/db.stack';
import { UserpoolStack } from '../lib/userpool.stack';
import { APIStack } from '../lib/api.stack';
import { LambdaStack } from '../lib/lambda.stack';
import { WAFStack } from '../lib/waf.stack';
const myConfig: IConfig = config as IConfig;

const ACCOUNT  = myConfig.AWS.ACCOUNT_ID ??  process.env?.CDK_DEFAULT_ACCOUNT ?? undefined; //Build should fail if account id is not found
const REGION = myConfig.AWS.REGION ?? process.env?.CDK_DEFAULT_REGION ?? 'eu-central-1'; //defaults to eu-central-1 (Frankfurt)

const app = new cdk.App();

const dbStack = new DBStack(app, myConfig.APP.name + 'DBsStack', {
  appName: myConfig.APP.name,
  env: { account: ACCOUNT, region: REGION },
  db: {
    ENV: myConfig.DB.ENV,
    usertable: {
      tableName: myConfig.DB.tables.USER
    }
  }
})

const lambdaStack = new LambdaStack(app, myConfig.APP.name + 'LambdaStack', {
  appName: myConfig.APP.name,
  env: { account: ACCOUNT, region: REGION },
  dbs: {
    user: dbStack.userTable
  }
});

const wafStack = new WAFStack(app, myConfig.APP.name + 'WAFStack', {
  env: { account: ACCOUNT, region: REGION },
  appName: myConfig.APP.name
})

const userpoolStack = new UserpoolStack(app, myConfig.APP.name + 'UserpoolStack', {
  env: { account: ACCOUNT, region: REGION },
  appName: myConfig.APP.name,
  waf: wafStack.waf
})

new APIStack(app, myConfig.APP.name + 'APIStack', {
  env: { account:ACCOUNT, region: REGION},
  appName: myConfig.APP.name,
  lambdas: {
    getUserLambda: lambdaStack.getUser
  },
  userpool : userpoolStack.pool,
  waf: wafStack.waf
});
