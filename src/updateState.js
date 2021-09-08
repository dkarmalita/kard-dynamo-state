const { applyUpdate } = require('./state-store');
const createDal = require('./dal');
const ErrorState = require('./errors/ErrorState');

const createSelectReducer = (config, reducers) => (update) => {
  const reducerName = update[config.eventIdField];
  const reducer = reducers[reducerName];
  if (!reducer) {
    throw new ErrorState(`ERROR: Invalid signal. No handler exist for "${update.signalId}"`, 400);
  }
  return reducer;
};

const updateState = async (update, dbId, { config, reducers }) => {
  const dal = await createDal({ ...config, dbId });

  const selectReducer = createSelectReducer(config, reducers);

  return applyUpdate(update, { selectReducer, dal });
};

module.exports = updateState;
