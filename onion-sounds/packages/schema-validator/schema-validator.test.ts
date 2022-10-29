import { schemaValidator } from './schema-validator';

let body = {
  firstName: 'Lee',
  surname: 'Gilmore',
};

let schema = {
  type: 'object',
  required: ['firstName', 'surname'],
  maxProperties: 2,
  minProperties: 2,
  properties: {
    firstName: {
      type: 'string',
      pattern: '^[a-zA-Z]+$',
    },
    surname: {
      type: 'string',
      pattern: '^[a-zA-Z]+$',
    },
  },
};

describe('schema-validator', () => {
  it('should validate a schema correctly', () => {
    expect(() => schemaValidator(schema, body)).not.toThrow();
  });

  it('should throw an error if the schema is invalid', () => {
    const badBody = {
      ...body,
      firstName: null,
    };
    expect(() =>
      schemaValidator(schema, badBody)
    ).toThrowErrorMatchingInlineSnapshot(
      `"[{\\"instancePath\\":\\"/firstName\\",\\"schemaPath\\":\\"#/properties/firstName/type\\",\\"keyword\\":\\"type\\",\\"params\\":{\\"type\\":\\"string\\"},\\"message\\":\\"must be string\\"}]"`
    );
  });
});
