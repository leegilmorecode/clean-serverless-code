import Ajv from 'ajv';
import { ValidationError } from '@errors/validation-error';
import addFormats from 'ajv-formats';

export function schemaValidator(schema: Record<string, any>, body: any) {
  const ajv = new Ajv({
    allErrors: true,
  });

  addFormats(ajv);
  ajv.addSchema(schema);

  const valid = ajv.validate(schema, body);

  if (!valid) {
    const errorMessage = JSON.stringify(ajv.errors);
    throw new ValidationError(errorMessage);
  }
}
