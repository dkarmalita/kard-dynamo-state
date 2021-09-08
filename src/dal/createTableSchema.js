const createTableSchema = (stateIdField) => ({
  KeySchema: [
    { AttributeName: stateIdField, KeyType: 'HASH' }, // 'eventId'
  ],
  AttributeDefinitions: [
    { AttributeName: stateIdField, AttributeType: 'S' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
});

module.exports = createTableSchema;
