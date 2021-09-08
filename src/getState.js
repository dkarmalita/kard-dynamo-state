const { getCurrentState } = require('./state-store');
const createDal = require('./dal');

const getState = async (dbId, { config }) => {
  const dal = await createDal({ ...config, dbId });

  return getCurrentState({ dal });
};

module.exports = getState;
