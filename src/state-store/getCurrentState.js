const getState = async ({ dal }) => {
  const [state, updates] = await dal.getState();
  return { state, updates };
};

module.exports = getState;
