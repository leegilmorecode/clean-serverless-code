const convict = require('convict');

export const config = convict({
  tableName: {
    doc: 'The database table where we store customer accounts',
    format: String,
    default: 'tableName',
    env: 'TABLE_NAME',
  },
  eventBus: {
    doc: 'The event bus that we publish events to',
    format: String,
    default: 'eventBus',
    env: 'EVENT_BUS',
  },
}).validate({ allowed: 'strict' });
