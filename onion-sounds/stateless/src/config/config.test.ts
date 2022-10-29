const OLD_ENV = process.env;

describe('config', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  describe('table-name', () => {
    it('should return the default value', () => {
      // arrange
      const { config } = require('./config');
      // act / assert
      expect(config.get('tableName')).toEqual('tableName');
    });

    it('should return the value from enviornment variable', () => {
      // arrange
      process.env.TABLE_NAME = 'tableNameFromEnv';
      const { config } = require('./config');

      // act / assert
      expect(config.get('tableName')).toEqual('tableNameFromEnv');
    });
  });
  describe('event-bus', () => {
    it('should return the default value', () => {
      // arrange
      const { config } = require('./config');
      // act / assert
      expect(config.get('eventBus')).toEqual('eventBus');
    });

    it('should return the value from enviornment variable', () => {
      // arrange
      process.env.EVENT_BUS = 'eventBusFromEnv';
      const { config } = require('./config');

      // act / assert
      expect(config.get('eventBus')).toEqual('eventBusFromEnv');
    });
  });
});
