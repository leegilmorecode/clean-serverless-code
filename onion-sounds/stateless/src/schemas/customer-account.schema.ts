export const schema = {
  type: 'object',
  required: [
    'id',
    'firstName',
    'surname',
    'paymentStatus',
    'subscriptionType',
    'created',
    'updated',
  ],
  maxProperties: 7,
  minProperties: 7,
  properties: {
    id: {
      type: 'string',
    },
    firstName: {
      type: 'string',
      pattern: '^[a-zA-Z]+$',
    },
    surname: {
      type: 'string',
      pattern: '^[a-zA-Z]+$',
    },
    paymentStatus: {
      type: 'string',
      enum: ['Valid', 'Invalid'],
    },
    subscriptionType: {
      type: 'string',
      enum: ['Basic', 'Upgraded'],
    },
    created: {
      type: 'string',
    },
    updated: {
      type: 'string',
    },
  },
};
