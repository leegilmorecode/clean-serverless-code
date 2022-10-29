import { schema } from './create-customer-account.schema';
import { schemaValidator } from '@packages/schema-validator';

describe('create-customer-schema', () => {
  it('should validate successfully a valid object', () => {
    // arrange
    const payload = {
      firstName: 'Lee',
      surname: 'Gilmore',
    };
    // act / assert
    expect(() => schemaValidator(schema, payload)).not.toThrow();
  });

  it('should not validate if the firstName is null', () => {
    // arrange
    const payload = {
      firstName: null, // invalid
      surname: 'Gilmore',
    };
    // act / assert
    expect(() =>
      schemaValidator(schema, payload)
    ).toThrowErrorMatchingInlineSnapshot(
      `"[{\\"instancePath\\":\\"/firstName\\",\\"schemaPath\\":\\"#/properties/firstName/type\\",\\"keyword\\":\\"type\\",\\"params\\":{\\"type\\":\\"string\\"},\\"message\\":\\"must be string\\"}]"`
    );
  });

  it('should not validate if the firstName is invalid', () => {
    const payload = {
      firstName: '±', // invalid
      surname: null,
    };
    expect(() =>
      schemaValidator(schema, payload)
    ).toThrowErrorMatchingInlineSnapshot(
      `"[{\\"instancePath\\":\\"/firstName\\",\\"schemaPath\\":\\"#/properties/firstName/pattern\\",\\"keyword\\":\\"pattern\\",\\"params\\":{\\"pattern\\":\\"^[a-zA-Z]+$\\"},\\"message\\":\\"must match pattern \\\\\\"^[a-zA-Z]+$\\\\\\"\\"},{\\"instancePath\\":\\"/surname\\",\\"schemaPath\\":\\"#/properties/surname/type\\",\\"keyword\\":\\"type\\",\\"params\\":{\\"type\\":\\"string\\"},\\"message\\":\\"must be string\\"}]"`
    );
  });

  it('should not validate if the surname is null', () => {
    // arrange
    const payload = {
      firstName: 'Lee',
      surname: null, // invalid
    };
    // act / assert
    expect(() =>
      schemaValidator(schema, payload)
    ).toThrowErrorMatchingInlineSnapshot(
      `"[{\\"instancePath\\":\\"/surname\\",\\"schemaPath\\":\\"#/properties/surname/type\\",\\"keyword\\":\\"type\\",\\"params\\":{\\"type\\":\\"string\\"},\\"message\\":\\"must be string\\"}]"`
    );
  });

  it('should not validate if the firstName is invalid', () => {
    // arrange
    const payload = {
      firstName: 'Lee',
      surname: '±', // invalid
    };
    // act / assert
    expect(() =>
      schemaValidator(schema, payload)
    ).toThrowErrorMatchingInlineSnapshot(
      `"[{\\"instancePath\\":\\"/surname\\",\\"schemaPath\\":\\"#/properties/surname/pattern\\",\\"keyword\\":\\"pattern\\",\\"params\\":{\\"pattern\\":\\"^[a-zA-Z]+$\\"},\\"message\\":\\"must match pattern \\\\\\"^[a-zA-Z]+$\\\\\\"\\"}]"`
    );
  });
});
