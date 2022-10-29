export const schema = {
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
