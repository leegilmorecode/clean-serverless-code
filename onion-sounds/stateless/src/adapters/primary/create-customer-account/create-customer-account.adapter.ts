import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { CreateCustomerAccountProps } from '@models/types';
import { ValidationError } from '@errors/validation-error';
import { createCustomerAccountUseCase } from '@use-cases/create-customer-account';
import { errorHandler } from '@packages/apigw-error-handler';
import { schema } from './create-customer-account.schema';
import { schemaValidator } from '@packages/schema-validator';
import { v4 as uuid } from 'uuid';

// adapts a proxy event (infra) into a dto for the use case
// (adapter) --> use case --> domain
export const createCustomerAccountAdapter = async ({
  body,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const correlationId = uuid();
    const method = 'create-customer-account.handler';
    const prefix = `${correlationId} - ${method}`;

    if (!body) throw new ValidationError('no order body');

    const customerAccount: CreateCustomerAccountProps = JSON.parse(body);

    schemaValidator(schema, customerAccount);

    console.log(
      `${prefix} - customer account: ${JSON.stringify(customerAccount)}`
    );

    const createdAccount: CreateCustomerAccountProps =
      await createCustomerAccountUseCase(customerAccount);

    console.log(
      `${prefix} - customer account created: ${JSON.stringify(createdAccount)}`
    );

    return {
      statusCode: 201,
      body: JSON.stringify(createdAccount),
    };
  } catch (error) {
    return errorHandler(error);
  }
};
