import CheckResponse from './response';

export default class CheckRoles
  extends CheckResponse
  implements CheckResponse.Instance
{
  constructor(response: SmsData.Payload, user: FormatUtils.User.Sms) {
    super(response, user, 'roles');
  }

  matchesUser() {
    return (
      this.response.roles?.length > 0 &&
      this.response.roles?.some((r) => this.user.role?.includes(r))
    );
  }
}
