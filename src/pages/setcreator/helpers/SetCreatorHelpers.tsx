function isEmpty(obj: object) {
  return Object.keys(obj).length === 0;
}

export function checkIfNullUndefinedOrEmpty(obj: object) {
  return obj === null || obj === undefined || isEmpty(obj);
}
