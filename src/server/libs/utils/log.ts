const logResponseFieldChecks: LogUtils.LogResponseFieldChecks = ({
  offices,
  ninjas,
  roles,
}: {
  offices: CheckResponse.Instance;
  ninjas: CheckResponse.Instance;
  roles: CheckResponse.Instance;
}) => {
  console.log('offices.matchesUser()', offices.matchesUser(), 'offices.isUndefined()', offices.isUndefined(), 'offices.isDefined()',offices.isDefined()); // prettier-ignore
  console.log('ninjas.matchesUser()', ninjas.matchesUser(), 'ninjas.isUndefined()', ninjas.isUndefined(), 'ninjas.isDefined()',ninjas.isDefined()); // prettier-ignore
  console.log('roles.matchesUser()', roles.matchesUser(), 'roles.isUndefined()', roles.isUndefined(), 'roles.isDefined()',roles.isDefined()); // prettier-ignore
};

export default logResponseFieldChecks;
