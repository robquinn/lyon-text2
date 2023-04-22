declare namespace LogUtils {
  type LogResponseFieldChecks = ({
    offices,
    ninjas,
    roles,
  }: {
    offices: CheckResponse.Instance;
    ninjas: CheckResponse.Instance;
    roles: CheckResponse.Instance;
  }) => void;
}
