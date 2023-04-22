declare namespace ValidateConditions {
  type ShouldExcludeUser = ({
    offices,
    ninjas,
    roles,
  }: {
    offices: CheckResponse.Instance;
    ninjas: CheckResponse.Instance;
    roles: CheckResponse.Instance;
  }) => boolean;
  type ShouldIncludeUser = ({
    offices,
    ninjas,
    roles,
  }: {
    offices: CheckResponse.Instance;
    ninjas: CheckResponse.Instance;
    roles: CheckResponse.Instance;
  }) => boolean;
}
