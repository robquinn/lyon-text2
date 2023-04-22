import CheckResponse from './response';
import Ninjas from '../../config/ninjas';

export default class CheckNinja
  extends CheckResponse
  implements CheckResponse.Instance
{
  constructor(response: SmsData.Payload, user: FormatUtils.User.Sms) {
    super(response, user, 'ninjas');
  }

  matchesUser() {
    switch (true) {
      case this.user.isNinja &&
        this.response.ninjas?.includes(Ninjas.Answers.Ninja):
      case !this.user.isNinja &&
        this.response.ninjas?.includes(Ninjas.Answers.NonNinjas):
      case this.isUndefined() || this.response.ninjas?.length === 0:
        return true;
      default:
        return false;
    }
  }
}
