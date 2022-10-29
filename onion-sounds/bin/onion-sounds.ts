#!/usr/bin/env node

import 'source-map-support/register';

import * as cdk from 'aws-cdk-lib';

import { OnionSoundsStatefulStack } from '../stateful/stateful';
import { OnionSoundsStatelessStack } from '../stateless/stateless';

const app = new cdk.App();
const statefulStack = new OnionSoundsStatefulStack(
  app,
  'OnionSoundsStatefulStack',
  {}
);
new OnionSoundsStatelessStack(app, 'OnionSoundsStatelessStack', {
  accountsTable: statefulStack.accountsTable,
  accountsEventBus: statefulStack.accountsEventBus,
});
