function createDocumentClientUtils(docClient) {
  const putItem = async (tableName, itemData) => docClient
    .put({ TableName: tableName, Item: itemData }).promise();

  const getItem = async (tableName, keyData) => docClient
    .get({ TableName: tableName, Key: keyData }).promise();

  const deleteItem = async (tableName, keyData) => docClient
    .delete({ TableName: tableName, Key: keyData }).promise();

  const deleteItemIfExists = async (tableName, keyData) => {
    try {
      await deleteItem(tableName, keyData);
      return true;
    } catch (e) {
      if (e.code === 'ResourceNotFoundException') {
        return false;
      }
      throw e;
    }
  };

  return {
    putItem,
    getItem,
    deleteItem,
    deleteItemIfExists,
  };
}

module.exports = createDocumentClientUtils;
