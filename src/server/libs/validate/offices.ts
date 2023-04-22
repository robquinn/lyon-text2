import OfficeResolver from '../utils/office';
import CheckResponse from './response';

export default class CheckOffices
  extends CheckResponse
  implements CheckResponse.Instance
{
  constructor(response: SmsData.Payload, user: FormatUtils.User.Sms) {
    super(response, user, 'offices');
  }

  matchesUser() {
    if (this.response.offices?.length > 0)
      return this.response.offices?.includes(
        new OfficeResolver(
          this.user.office as OfficeResolver.Office
        ).getActual()
      );
    return false;
  }
}
