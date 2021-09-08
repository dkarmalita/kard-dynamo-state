/* eslint-disable no-restricted-syntax, guard-for-in */

const deepClone = (aObject) => {
// v20210905
  if (
    !aObject
    || (typeof aObject !== 'object')
  ) {
    return aObject;
  }

  let v;
  const bObject = Array.isArray(aObject) ? [] : {};
  for (const k in aObject) {
    v = aObject[k];
    bObject[k] = (typeof v === 'object') ? deepClone(v) : v;
  }

  return bObject;
};

module.exports = {
  deepClone,
};
