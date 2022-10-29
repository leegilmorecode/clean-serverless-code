import { APIGatewayProxyResult } from 'aws-lambda';

// we would typically use middy - but to keep this simple to read
// without mutliple additional packages lets build outselves
export function errorHandler(error: Error | unknown): APIGatewayProxyResult {
  console.error(error);

  let errorMessage: string;
  let statusCode: number;

  if (error instanceof Error) {
    switch (error.name) {
      case 'ValidationError':
        errorMessage = error.message;
        statusCode = 400;
        break;
      case 'PaymentInvalidError':
        errorMessage = 'The payment is invalid';
        statusCode = 400;
        break;
      default:
        errorMessage = 'An error has occurred';
        statusCode = 500;
        break;
    }
  } else {
    errorMessage = 'An error has occurred';
    statusCode = 500;
  }

  return {
    statusCode: statusCode,
    body: JSON.stringify(errorMessage),
  };
}
