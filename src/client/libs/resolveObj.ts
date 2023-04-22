export function resolveObjPath(path, obj) {
  return (path as string).split('.').reduce((prev, curr) => {
    return prev ? (prev as object)[curr] : null;
    // eslint-disable-next-line no-restricted-globals
  }, obj || self);
}

export function resolveObjProps(rest, obj) {
  return (rest as string[]).reduce((acc, val) => {
    acc[val] = (obj as object)[val];
    return acc;
  }, {});
}
