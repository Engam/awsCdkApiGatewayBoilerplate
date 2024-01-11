#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';

import { IConfig } from '../interfaces/config.interface';
import * as config from '../config.json';
import { DBStack } from '../lib/db.stack';
import { UserpoolStack } from '../lib/userpool.stack';
import { APIStack } from '../lib/api.stack';
import { LambdaStack } from '../lib/lambda.stack';
const myConfig: IConfig = config as IConfig;

const ACCOUNT  = myConfig.AWS.ACCOUNT_ID ??  process.env.CDK_DEFAULT_ACCOUNT;
const REGION = myConfig.AWS.REGION ?? process.env.CDK_DEFAULT_REGION;

const app = new cdk.App();

const dbStack = new DBStack(app, myConfig.APP.name + 'DBStack', {
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

const userpoolStack = new UserpoolStack(app, myConfig.APP.name + 'UserpoolStack', {
  env: { account: ACCOUNT, region: REGION },
  appName: myConfig.APP.name
})

new APIStack(app, myConfig.APP.name + 'APIStack', {
  env: { account:ACCOUNT, region: REGION},
  appName: myConfig.APP.name,
  lambdas: {
    getUserLambda: lambdaStack.getUser
  },
  userpool : userpoolStack.pool
});
