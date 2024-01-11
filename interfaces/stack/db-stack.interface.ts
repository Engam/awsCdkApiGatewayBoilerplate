import * as cdk from 'aws-cdk-lib';
import { IAppStackProps } from './stack.interface';

export interface IDBStackProps extends IAppStackProps {
  db: IDBTableDef
}

interface IDBTableDef {
  usertable: ITableDef;
  ENV: string;
  
}
interface ITableDef {
  tableName: string;
}