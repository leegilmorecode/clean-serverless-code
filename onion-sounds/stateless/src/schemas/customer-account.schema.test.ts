import {
  PaymentStatus,
  SubscriptionType,
  UnmarshalledCustomerAccount,
} from '../models';

import { schema } from './customer-account.schema';
import { schemaValidator } from '../../../packages/schema-validator';

let body: UnmarshalledCustomerAccount = {
  id: 'f39e49ad-8f88-448f-8a15-41d560ad6d70',
  firstName: 'Lee',
  surname: 'Gilmore',
  paymentStatus: PaymentStatus.Valid,
  subscriptionType: SubscriptionType.Upgraded,
  created: '2022-01-01T00:00:00.000Z',
  updated: '2022-01-01T00:00:00.000Z',
};

describe('customer-account-schema', () => {
  it('should validate correctly with the correct payload', () => {
    expect(() => schemaValidator(schema, body)).not.toThrow();
  });

  it('should throw an error when there are more than 7 properties', () => {
    const badBody = {
      ...body,
      additionalProp: 'tree',
    };
    expect(() =>
      schemaValidator(schema, badBody)
    ).toThrowErrorMatchingInlineSnapshot(
      `"[{\\"instancePath\\":\\"\\",\\"schemaPath\\":\\"#/maxProperties\\",\\"keyword\\":\\"maxProperties\\",\\"params\\":{\\"limit\\":7},\\"message\\":\\"must NOT have more than 7 properties\\"}]"`
    );
  });

  it('should throw an error when there are less than 7 properties', () => {
    const badBody = {};
    expect(() =>
      schemaValidator(schema, badBody)
    ).toThrowErrorMatchingInlineSnapshot(
      `"[{\\"instancePath\\":\\"\\",\\"schemaPath\\":\\"#/minProperties\\",\\"keyword\\":\\"minProperties\\",\\"params\\":{\\"limit\\":7},\\"message\\":\\"must NOT have fewer than 7 properties\\"},{\\"instancePath\\":\\"\\",\\"schemaPath\\":\\"#/required\\",\\"keyword\\":\\"required\\",\\"params\\":{\\"missingProperty\\":\\"id\\"},\\"message\\":\\"must have required property 'id'\\"},{\\"instancePath\\":\\"\\",\\"schemaPath\\":\\"#/required\\",\\"keyword\\":\\"required\\",\\"params\\":{\\"missingProperty\\":\\"firstName\\"},\\"message\\":\\"must have required property 'firstName'\\"},{\\"instancePath\\":\\"\\",\\"schemaPath\\":\\"#/required\\",\\"keyword\\":\\"required\\",\\"params\\":{\\"missingProperty\\":\\"surname\\"},\\"message\\":\\"must have required property 'surname'\\"},{\\"instancePath\\":\\"\\",\\"schemaPath\\":\\"#/required\\",\\"keyword\\":\\"required\\",\\"params\\":{\\"missingProperty\\":\\"paymentStatus\\"},\\"message\\":\\"must have required property 'paymentStatus'\\"},{\\"instancePath\\":\\"\\",\\"schemaPath\\":\\"#/required\\",\\"keyword\\":\\"required\\",\\"params\\":{\\"missingProperty\\":\\"subscriptionType\\"},\\"message\\":\\"must have required property 'subscriptionType'\\"},{\\"instancePath\\":\\"\\",\\"schemaPath\\":\\"#/required\\",\\"keyword\\":\\"required\\",\\"params\\":{\\"missingProperty\\":\\"created\\"},\\"message\\":\\"must have required property 'created'\\"},{\\"instancePath\\":\\"\\",\\"schemaPath\\":\\"#/required\\",\\"keyword\\":\\"required\\",\\"params\\":{\\"missingProperty\\":\\"updated\\"},\\"message\\":\\"must have required property 'updated'\\"}]"`
    );
  });

  it('should throw an error if id is not valid', () => {
    const badBody = {
      ...body,
      id: 111, // not a string
    };
    expect(() =>
      schemaValidator(schema, badBody)
    ).toThrowErrorMatchingInlineSnapshot(
      `"[{\\"instancePath\\":\\"/id\\",\\"schemaPath\\":\\"#/properties/id/type\\",\\"keyword\\":\\"type\\",\\"params\\":{\\"type\\":\\"string\\"},\\"message\\":\\"must be string\\"}]"`
    );
  });

  it('should throw an error if firstName is not valid', () => {
    const badBody = {
      ...body,
      firstName: '!@$%*', // not valid
    };
    expect(() =>
      schemaValidator(schema, badBody)
    ).toThrowErrorMatchingInlineSnapshot(
      `"[{\\"instancePath\\":\\"/firstName\\",\\"schemaPath\\":\\"#/properties/firstName/pattern\\",\\"keyword\\":\\"pattern\\",\\"params\\":{\\"pattern\\":\\"^[a-zA-Z]+$\\"},\\"message\\":\\"must match pattern \\\\\\"^[a-zA-Z]+$\\\\\\"\\"}]"`
    );
  });

  it('should throw an error if surname is not valid', () => {
    const badBody = {
      ...body,
      surname: '!@$%*', // not valid
    };
    expect(() =>
      schemaValidator(schema, badBody)
    ).toThrowErrorMatchingInlineSnapshot(
      `"[{\\"instancePath\\":\\"/surname\\",\\"schemaPath\\":\\"#/properties/surname/pattern\\",\\"keyword\\":\\"pattern\\",\\"params\\":{\\"pattern\\":\\"^[a-zA-Z]+$\\"},\\"message\\":\\"must match pattern \\\\\\"^[a-zA-Z]+$\\\\\\"\\"}]"`
    );
  });

  it('should throw an error if paymentStatus is not valid', () => {
    const badBody = {
      ...body,
      paymentStatus: 'Tree', // not valid
    };
    expect(() =>
      schemaValidator(schema, badBody)
    ).toThrowErrorMatchingInlineSnapshot(
      `"[{\\"instancePath\\":\\"/paymentStatus\\",\\"schemaPath\\":\\"#/properties/paymentStatus/enum\\",\\"keyword\\":\\"enum\\",\\"params\\":{\\"allowedValues\\":[\\"Valid\\",\\"Invalid\\"]},\\"message\\":\\"must be equal to one of the allowed values\\"}]"`
    );
  });

  it('should throw an error if subscriptionType is not valid', () => {
    const badBody = {
      ...body,
      subscriptionType: 'Tree', // not valid
    };
    expect(() =>
      schemaValidator(schema, badBody)
    ).toThrowErrorMatchingInlineSnapshot(
      `"[{\\"instancePath\\":\\"/subscriptionType\\",\\"schemaPath\\":\\"#/properties/subscriptionType/enum\\",\\"keyword\\":\\"enum\\",\\"params\\":{\\"allowedValues\\":[\\"Basic\\",\\"Upgraded\\"]},\\"message\\":\\"must be equal to one of the allowed values\\"}]"`
    );
  });

  it('should throw an error if created is not valid', () => {
    const badBody = {
      ...body,
      created: 111, // not a string
    };
    expect(() =>
      schemaValidator(schema, badBody)
    ).toThrowErrorMatchingInlineSnapshot(
      `"[{\\"instancePath\\":\\"/created\\",\\"schemaPath\\":\\"#/properties/created/type\\",\\"keyword\\":\\"type\\",\\"params\\":{\\"type\\":\\"string\\"},\\"message\\":\\"must be string\\"}]"`
    );
  });

  it('should throw an error if updated is not valid', () => {
    const badBody = {
      ...body,
      updated: 111, // not a string
    };
    expect(() =>
      schemaValidator(schema, badBody)
    ).toThrowErrorMatchingInlineSnapshot(
      `"[{\\"instancePath\\":\\"/updated\\",\\"schemaPath\\":\\"#/properties/updated/type\\",\\"keyword\\":\\"type\\",\\"params\\":{\\"type\\":\\"string\\"},\\"message\\":\\"must be string\\"}]"`
    );
  });
});
