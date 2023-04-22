export const shouldExcludeUser: ValidateConditions.ShouldExcludeUser = ({
  offices,
  ninjas,
  roles,
}: {
  offices: CheckResponse.Instance;
  ninjas: CheckResponse.Instance;
  roles: CheckResponse.Instance;
}) => {
  return (
    (offices.isDefined() && offices.matchesUser()) ||
    (ninjas.isDefined() && ninjas.matchesUser()) ||
    (roles.isDefined() && roles.matchesUser())
  );
};
export const shouldIncludeUser = ({
  offices,
  ninjas,
  roles,
}: {
  offices: CheckResponse.Instance;
  ninjas: CheckResponse.Instance;
  roles: CheckResponse.Instance;
}) => {
  return (
    (offices.isUndefined() || offices.matchesUser()) &&
    (ninjas.isUndefined() || ninjas.matchesUser()) &&
    (roles.isUndefined() || roles.matchesUser())
  );
};
