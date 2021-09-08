const { deepClone } = require('./utils');
const ErrorState = require('../errors/ErrorState');

const applyUpdate = async (update, { selectReducer, dal }) => {
  const reduce = selectReducer(update);
  if (!reduce) {
    throw new ErrorState(`Invalid reducer: "${reduce}"`, 400);
  }
  const [state, updates] = await dal.getState();

  const newState = await reduce(state || {}, deepClone(update));

  const newUpdates = updates || [];
  newUpdates.push(update);
  await dal.setState(newState, newUpdates);
  return newState;
};

module.exports = applyUpdate;
