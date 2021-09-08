const AWS = require('aws-sdk');
const createAwsConfig = require('./createAwsConfig');
const createDynamoDbUtils = require('./createDdbu');
const createDocumentClientUtils = require('./createDcu');
const createMemoryDal = require('./createMemoryDal');
const createTableSchema = require('./createTableSchema');

async function createDal(config = {}) {
  const { tableName, dbId, stateIdField } = config;
  if (!tableName) {
    throw new Error('DAL Configuration Error: tableName must be defined');
  }

  if (!dbId) {
    throw new Error('DAL Configuration Error: dbId must be defined');
  }

  if (config.memoryDal) {
    return createMemoryDal(config);
  }

  const awsConfig = createAwsConfig(config);
  AWS.config.update(awsConfig);

  const ddbu = createDynamoDbUtils(new AWS.DynamoDB());

  if (config.allowCreateTable && !await ddbu.isTableExists(tableName)) {
    await ddbu.createTable(tableName, createTableSchema(stateIdField));
    await ddbu.waitForTableActive(tableName);
  }

  const dcu = createDocumentClientUtils(new AWS.DynamoDB.DocumentClient());

  const dbItemToState = (dbItem) => (!dbItem.Item
    ? [null, null]
    : [dbItem.Item.state, dbItem.Item.updates]);

  return {
    setState: async (state, updates) => dcu
      .putItem(tableName, { [stateIdField]: dbId, state, updates }),
    getState: async () => dbItemToState(await dcu.getItem(tableName, { [stateIdField]: dbId })),
    deleteState: async () => dcu.deleteItemIfExists(tableName, { [stateIdField]: dbId }),
    deleteTable: async () => ddbu.deleteTable(tableName),
  };
}

module.exports = createDal;
