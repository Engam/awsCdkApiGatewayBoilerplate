import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { IDBStackProps } from '../interfaces/stack/db-stack.interface'; 

export class DBStack extends cdk.Stack {
  public readonly userTable: dynamodb.ITable;

  constructor(scope: Construct, id: string, props: IDBStackProps) {
    super(scope, id, props);
    const userTable = dynamodb.Table.fromTableName(this, props.db.usertable.tableName + props.db.ENV, props.appName + '-user');
    this.userTable = userTable;
  }
}

