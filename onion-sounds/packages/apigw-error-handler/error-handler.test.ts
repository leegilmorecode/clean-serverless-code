import { PaymentInvalidError } from '@errors/payment-invalid-error';
import { ValidationError } from '@errors/validation-error';
import { errorHandler } from './error-handler';

describe('error-handler', () => {
  it('should default the error and status code on unknown instance type', () => {
    // arrange
    const error = null;

    // act / assert
    expect(errorHandler(error)).toMatchInlineSnapshot(`
Object {
  "body": "\\"An error has occurred\\"",
  "statusCode": 500,
}
`);
  });

  it('should default the error and status code on unknown error', () => {
    // arrange
    const error = new Error('unknown error');

    // act / assert
    expect(errorHandler(error)).toMatchInlineSnapshot(`
Object {
  "body": "\\"An error has occurred\\"",
  "statusCode": 500,
}
`);
  });

  it('should return the correct response on ValidationError', () => {
    // arrange
    const error = new ValidationError('this is a validation error');

    // act / assert
    expect(errorHandler(error)).toMatchInlineSnapshot(`
Object {
  "body": "\\"this is a validation error\\"",
  "statusCode": 400,
}
`);
  });

  it('should return the correct response on PaymentInvalidError', () => {
    // arrange
    const error = new PaymentInvalidError('this is a payment invalid error');

    // act / assert
    expect(errorHandler(error)).toMatchInlineSnapshot(`
Object {
  "body": "\\"The payment is invalid\\"",
  "statusCode": 400,
}
`);
  });
});
