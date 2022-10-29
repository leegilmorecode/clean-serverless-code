import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { CustomerAccountProps } from '@models/types';
import { ValidationError } from '@errors/validation-error';
import { errorHandler } from '@packages/apigw-error-handler';
import { upgradeCustomerAccountUseCase } from '@use-cases/upgrade-customer-account';
import { v4 as uuid } from 'uuid';

// adapts a proxy event (infra) into a dto for the use case
// (adapter) --> use case --> domain
export const upgradeCustomerAccountAdapter = async ({
  pathParameters,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const correlationId = uuid();
    const method = 'upgrade-customer-account.handler';
    const prefix = `${correlationId} - ${method}`;

    if (!pathParameters || !pathParameters?.id)
      throw new ValidationError('no id in the path parameters of the event');

    const { id } = pathParameters;

    console.log(`${prefix} - customer account id: ${id}`);

    const customerAccount: CustomerAccountProps =
      await upgradeCustomerAccountUseCase(id);

    console.log(
      `${prefix} - upgraded customer account: ${JSON.stringify(
        customerAccount
      )}`
    );

    return {
      statusCode: 200,
      body: JSON.stringify(customerAccount),
    };
  } catch (error) {
    return errorHandler(error);
  }
};
