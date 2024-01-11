export interface IConfig {
  "DB": IDBConfig
  "AWS": IAWSConfig
  "APP": IAPPConfig
}

interface IAPPConfig {
  "name": string,
}

interface IDBConfig {
  "ENV": string,
  "tables": ITableConfig
}

interface ITableConfig {
  "USER": string;

}

interface IAWSConfig {
  "REGION"?: string,
  "ACCOUNT_ID"?: string,
}