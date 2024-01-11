import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apiGateway from 'aws-cdk-lib/aws-apigateway';
import { APIProps } from '../interfaces/stack/api-stack.interface';

export class APIStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props: APIProps) {
    super(scope, id, props);

    const api = new apiGateway.RestApi(this, props.appName + '-api', {
      restApiName: props.appName + 'API',
      description: 'This service serves ' + props.appName + ' API.',
      // apiKeySourceType: apiGateway.ApiKeySourceType.HEADER,
    });

    // api.addApiKey(props.appName + '-api-key', {
    //   apiKeyName: props.appName + '-api-key'
    // });

    const userMethod = new apiGateway.LambdaIntegration(props.lambdas.getUserLambda);

    const user = api.root.addResource('user');
    
    const authorizer = new apiGateway.CfnAuthorizer(this, props.appName + '-api-authorizer', {
      name: 'api-authorizer',
      type: apiGateway.AuthorizationType.COGNITO,
      identitySource: 'method.request.header.Authorization',
      providerArns: [props.userpool.userPoolArn],
      restApiId: api.restApiId,
    });


    const validator = new apiGateway.CfnRequestValidator(this, props.appName + '-api-validator', {
      name: 'getUser-validator',
      restApiId: api.restApiId,
      validateRequestBody: true,
      validateRequestParameters: true,
    });

    const getUser = user.addMethod('GET', userMethod, {
      apiKeyRequired: false,
      methodResponses: [
        { statusCode: '200' },
        { statusCode: '400' },
        { statusCode: '500' },
      ],
      authorizer: {
        authorizerId: authorizer.ref
      },
      // requestValidatorOptions: {
      //   requestValidatorName: validator.ref
      // },
      authorizationType: apiGateway.AuthorizationType.COGNITO
    })

  }
}