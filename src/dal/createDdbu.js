function createDynamoDbUtils(dynamodb) {
  const waitForTime = (ms) => new Promise((r) => setTimeout(r, ms));

  const createTable = async (tableName, params) => dynamodb
    .createTable({ ...params, TableName: tableName }).promise();

  const deleteTable = async (tableName) => dynamodb
    .deleteTable({ TableName: tableName }).promise();

  const getTableDescriptiin = async (tableName) => dynamodb
    .describeTable({ TableName: tableName }).promise();

  const isTableExists = async (tableName) => {
    try {
      await getTableDescriptiin(tableName);
      return true;
    } catch (e) {
      if (e.code === 'ResourceNotFoundException') {
        return false;
      }
      throw e;
    }
  };

  const getTibleStatus = async (tableName) => {
    const tableDescription = await getTableDescriptiin(tableName);
    return tableDescription.Table.TableStatus;
  };

  const isTableActive = async (tableName) => {
    const tableStatus = await getTibleStatus(tableName);
    // console.log('tableStatus', tableStatus);
    return tableStatus === 'ACTIVE';
  };

  const waitForTableActive = async (tableName, baseInterval = 100) => {
    let i = 1;
    /* eslint-disable no-await-in-loop */
    while (!await isTableActive(tableName)) {
      // eslint-disable-next-line no-plusplus
      await waitForTime(baseInterval * i++);
    }
  };

  return {
    createTable,
    deleteTable,
    getTableDescriptiin,
    isTableExists,
    waitForTime,
    waitForTableActive,
  };
}

module.exports = createDynamoDbUtils;
