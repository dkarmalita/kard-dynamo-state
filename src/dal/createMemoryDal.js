const dbTables = {};

const ddbu = {
  isTableExists(tableName) {
    return !!dbTables[tableName];
  },
  createTable(tableName) {
    dbTables[tableName] = {};
  },
  deleteTable(tableName) {
    delete dbTables[tableName];
  },
};

const dcu = {
  getItem(tableName, keyData) {
    return dbTables[tableName][keyData.eventId];
  },
  putItem(tableName, itemData) {
    dbTables[tableName][itemData.eventId] = itemData;
  },
  deleteItemIfExists(tableName, itemData) {
    delete dbTables[tableName][itemData.eventId];
  },
};

async function createMemoryDal(config = {}) {
  const { tableName, dbId, stateIdField } = config;

  if (!ddbu.isTableExists(tableName)) {
    ddbu.createTable(tableName);
  }

  const dbItemToState = (dbItem) => (!dbItem ? [null, null] : [dbItem.state, dbItem.updates]);

  return {
    setState: async (state, updates) => dcu
      .putItem(tableName, { [stateIdField]: dbId, state, updates }),
    getState: async () => dbItemToState(dcu.getItem(tableName, { [stateIdField]: dbId })),
    deleteState: async () => dcu.deleteItemIfExists(tableName, { [stateIdField]: dbId }),
    deleteTable: async () => ddbu.deleteTable(tableName),
  };
}

module.exports = createMemoryDal;
