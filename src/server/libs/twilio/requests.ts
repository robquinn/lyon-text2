import TwilioSmsRequest from './request';
import { formatUser } from '../utils/format';
import { shouldExcludeUser, shouldIncludeUser } from '../validate/conditions';
import CheckNinja from '../validate/ninjas';
import CheckOffices from '../validate/offices';
import CheckResponses from '../validate/responses';
import CheckRoles from '../validate/roles';
import getUsers from '../wrapper/users';
import proxySmsData from '../form/proxy';

const getRequestsFromSmsData: TwilioRequests.GetRequestsFromSmsData = (
  smsData: SmsData.Payload
) => {
  const response: SmsData.Payload = proxySmsData(smsData);

  const users: SheetObject.Data = getUsers();

  const requests: TwilioRequests.Request[] = [];

  const newSms = ({
    message,
    to,
    user,
  }: {
    message: string;
    to: `+${number}`;
    user: FormatUtils.User.Feedback;
  }) => {
    const twilioSmsRequest = new TwilioSmsRequest(message, to, user);
    requests.push({
      request: twilioSmsRequest.request(),
      user: twilioSmsRequest.user(),
    });
  };

  if (new CheckResponses(response).manyAreUndefined()) {
    console.log('Too many variable undefined');
  } else {
    for (let i = 0; i < users.length; i++) {
      const { sms: user, feedback } = formatUser({
        user: users[i] as unknown as FormatUtils.User.SheetObj,
        response,
      });

      const [offices, roles, ninjas] = [
        new CheckOffices(response, user),
        new CheckRoles(response, user),
        new CheckNinja(response, user),
      ];

      if (response.all === true) {
        if (shouldExcludeUser({ offices, ninjas, roles })) {
          continue;
        } else {
          newSms({
            to: user.phone as `+${number}`,
            message: user.message,
            user: feedback,
          });
        }
      } else if (shouldIncludeUser({ offices, ninjas, roles })) {
        newSms({
          to: user.phone as `+${number}`,
          message: user.message,
          user: feedback,
        });
      } else {
        continue;
      }
    }
  }
  if (response.phones?.length > 0) {
    for (let i = 0; i < response.phones?.length; i++) {
      newSms({
        to: response.phones[i] as `+${number}`,
        message: response.message,
        user: TwilioSmsRequest.unknown() as FormatUtils.User.Feedback,
      });
    }
  }
  return requests;
};

export default getRequestsFromSmsData;
