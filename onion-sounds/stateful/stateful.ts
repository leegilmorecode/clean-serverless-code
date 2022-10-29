import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as events from 'aws-cdk-lib/aws-events';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as targets from 'aws-cdk-lib/aws-events-targets';

import { Construct } from 'constructs';
import { RemovalPolicy } from 'aws-cdk-lib';

export class OnionSoundsStatefulStack extends cdk.Stack {
  public readonly accountsTable: dynamodb.Table;
  public readonly accountsEventBus: events.EventBus;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // write all of the events to logs so we can track as a catch all
    const onionSoundsLogs: logs.LogGroup = new logs.LogGroup(
      this,
      'onion-sounds-event-logs',
      {
        logGroupName: 'onion-sounds-event-logs',
        removalPolicy: RemovalPolicy.DESTROY,
      }
    );

    // create the dynamodb table for storing our orders
    this.accountsTable = new dynamodb.Table(this, 'OnionCustomersTable', {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      encryption: dynamodb.TableEncryption.AWS_MANAGED,
      pointInTimeRecovery: false,
      contributorInsightsEnabled: true,
      removalPolicy: RemovalPolicy.DESTROY,
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      },
    });

    this.accountsEventBus = new events.EventBus(
      this,
      'OnionCustomersEventBus',
      {
        eventBusName: 'onion-customers-event-bus',
      }
    );
    this.accountsEventBus.applyRemovalPolicy(RemovalPolicy.DESTROY);

    new events.Rule(this, 'LogAllEventsToCloudwatch', {
      eventBus: this.accountsEventBus,
      ruleName: 'LogAllEventsToCloudwatch',
      description: 'log all orders events',
      eventPattern: {
        source: [{ prefix: '' }] as any[], // match all events
      },
      targets: [new targets.CloudWatchLogGroup(onionSoundsLogs)],
    });
  }
}
