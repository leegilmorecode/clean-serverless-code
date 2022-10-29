import * as apigw from 'aws-cdk-lib/aws-apigateway';
import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as events from 'aws-cdk-lib/aws-events';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodeLambda from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';

import { Construct } from 'constructs';

export interface ConsumerProps extends cdk.StackProps {
  accountsTable: dynamodb.Table;
  accountsEventBus: events.EventBus;
}

export class OnionSoundsStatelessStack extends cdk.Stack {
  private readonly accountsTable: dynamodb.Table;
  private readonly accountsEventBus: events.EventBus;

  constructor(scope: Construct, id: string, props: ConsumerProps) {
    super(scope, id, props);

    this.accountsTable = props.accountsTable;
    this.accountsEventBus = props.accountsEventBus;

    const createAccountLambda: nodeLambda.NodejsFunction =
      new nodeLambda.NodejsFunction(this, 'CreateAccountLambda', {
        runtime: lambda.Runtime.NODEJS_16_X,
        entry: path.join(
          __dirname,
          'src/adapters/primary/create-customer-account/create-customer-account.adapter.ts'
        ),
        memorySize: 1024,
        handler: 'createCustomerAccountAdapter',
        bundling: {
          minify: true,
          externalModules: ['aws-sdk'],
        },
        environment: {
          TABLE_NAME: this.accountsTable.tableName,
          EVENT_BUS: this.accountsEventBus.eventBusArn,
        },
      });

    const retrieveAccountLambda: nodeLambda.NodejsFunction =
      new nodeLambda.NodejsFunction(this, 'RetrieveAccountLambda', {
        runtime: lambda.Runtime.NODEJS_16_X,
        entry: path.join(
          __dirname,
          'src/adapters/primary/retrieve-customer-account/retrieve-customer-account.adapter.ts'
        ),
        memorySize: 1024,
        handler: 'retrieveCustomerAccountAdapter',
        bundling: {
          minify: true,
          externalModules: ['aws-sdk'],
        },
        environment: {
          TABLE_NAME: this.accountsTable.tableName,
          EVENT_BUS: this.accountsEventBus.eventBusArn,
        },
      });

    const upgradeAccountLambda: nodeLambda.NodejsFunction =
      new nodeLambda.NodejsFunction(this, 'UpgradeAccountLambda', {
        runtime: lambda.Runtime.NODEJS_16_X,
        entry: path.join(
          __dirname,
          'src/adapters/primary/upgrade-customer-account/upgrade-customer-account.adapter.ts'
        ),
        memorySize: 1024,
        handler: 'upgradeCustomerAccountAdapter',
        bundling: {
          minify: true,
          externalModules: ['aws-sdk'],
        },
        environment: {
          TABLE_NAME: this.accountsTable.tableName,
          EVENT_BUS: this.accountsEventBus.eventBusArn,
        },
      });

    this.accountsTable.grantWriteData(createAccountLambda);
    this.accountsTable.grantReadData(retrieveAccountLambda);
    this.accountsTable.grantReadWriteData(upgradeAccountLambda);

    this.accountsEventBus.grantPutEventsTo(createAccountLambda);
    this.accountsEventBus.grantPutEventsTo(upgradeAccountLambda);

    const accountsApi: apigw.RestApi = new apigw.RestApi(this, 'AccountsApi', {
      description: 'Onion Accounts API',
      deploy: true,
      deployOptions: {
        stageName: 'prod',
        loggingLevel: apigw.MethodLoggingLevel.INFO,
      },
    });

    const accounts: apigw.Resource = accountsApi.root.addResource('accounts');
    const account: apigw.Resource = accounts.addResource('{id}');

    accounts.addMethod(
      'POST',
      new apigw.LambdaIntegration(createAccountLambda, {
        proxy: true,
      })
    );

    account.addMethod(
      'GET',
      new apigw.LambdaIntegration(retrieveAccountLambda, {
        proxy: true,
      })
    );

    account.addMethod(
      'PATCH',
      new apigw.LambdaIntegration(upgradeAccountLambda, {
        proxy: true,
      })
    );
  }
}
