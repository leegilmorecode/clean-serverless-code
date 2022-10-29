import * as AWS from 'aws-sdk';

import { CustomerAccountProps } from '@models/types';
import { config } from '@config/config';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

// this is the secondary adapter which creates the account from the db
// Note: you would typically use a module or package here to interact
// with the database technology - for example dynamoose

// domain --> use case --> (adapter)
export async function createAccount(
  customerAccount: CustomerAccountProps
): Promise<CustomerAccountProps> {
  const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
    TableName: config.get('tableName'),
    Item: customerAccount,
  };

  await dynamoDb.put(params).promise();

  return customerAccount;
}

// this is the secondary adapter which updates the account in the db
// domain --> use case --> (adapter)
export async function updateAccount(
  customerAccount: CustomerAccountProps
): Promise<CustomerAccountProps> {
  const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
    TableName: config.get('tableName'),
    Item: customerAccount,
  };

  await dynamoDb.put(params).promise();
  return customerAccount;
}

// this is the secondary adapter which retrieves the account from the db
// domain --> use case via port --> (adapter)
export async function retrieveAccount(
  id: string
): Promise<CustomerAccountProps> {
  const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
    TableName: config.get('tableName'),
    Key: {
      id,
    },
  };

  const { Item: item } = await dynamoDb.get(params).promise();

  const customer: CustomerAccountProps = {
    ...(item as CustomerAccountProps),
  };

  return customer;
}
