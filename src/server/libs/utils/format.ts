import _ from 'lodash';
import Ninjas from '../../config/ninjas';
import OfficeResolver from './office';

export const formatUser: FormatUtils.FormatUser = ({
  user,
  response,
}: FormatUtils.User.Args): FormatUtils.User.ReturnType => {
  const {
    'First Name': firstName,
    'Last Name': lastName,
    Office: office,
    Role: role,
    Ninja: ninja,
    Phone: phone,
  } = user;

  const actualOffice = response.offices?.includes(_.kebabCase("Lyon's Den"))
    ? new OfficeResolver(office).getActual()
    : new OfficeResolver(office).getActualWithoutLyonsDen();
  const actualRole = role.split(',').map((r) => r.trim());
  const common = {
    firstName,
    lastName,
    isNinja: Ninjas.Identifier.isValid.test(ninja),
  };
  return {
    sms: {
      ...common,
      office: _.kebabCase(actualOffice),
      role: actualRole.map((r) => _.kebabCase(r)),
      phone: `+1${phone.replaceAll('-', '')}`,
      message: response.message
        ? response.message
            .replaceAll(`{{FIRST}}`, firstName)
            .replaceAll(`{{LAST}}`, lastName)
            .replaceAll(`{{ROLE}}`, role)
            .replaceAll(`{{OFFICE}}`, office)
        : response.message,
    },
    feedback: {
      ...common,
      office: actualOffice,
      role: actualRole,
    },
  };
};

export const formatE164Phone: FormatUtils.FormatE164Phone = (phone) => {
  return `+1${phone
    .replaceAll(/\D+/gi, '')
    // eslint-disable-next-line no-unsafe-optional-chaining
    .slice((this as unknown as string)?.length - 11)}`;
};

export const formatSmsForSheet: FormatUtils.FormatSmsForSheet = (sms) => {
  const {
    id,
    response,
    user,
  }: {
    id: string;
    response: FormatUtils.Twilio.RequestResponse;
    user: TwilioRequest.User;
  } = sms;
  return {
    /* id */
    id,
    /* user */
    firstName: user.firstName,
    lastName: user.lastName,
    office: user.office,
    role: user.role,
    ninja: user.isNinja,
    /* response */
    message: response.body ?? 'null',
    from: response.from ?? 'null',
    to: response.to ?? 'null',
    status: response.status ?? 'null',
    dateCreated: response.date_created ?? 'null',
    dateSent: response.date_sent ?? 'null',
    dateUpdated: response.date_updated ?? 'null',
    errorCode: response.error_code ?? 'null',
    errorMessage: response.error_message ?? 'null',
    messagingServiceSid: response.messaging_service_sid ?? 'null',
    numMedia: response.num_media ?? 'null',
    numSegments: response.num_segments ?? 'null',
    price: response.price ?? 'null',
    priceUnit: response.price_unit ?? 'null',
    sid: response.sid ?? 'null',
    subResourceUris: response.subresource_uris ?? 'null',
    accountSid: response.account_sid ?? 'null',
    apiVersion: response.api_version ?? 'null',
    uri: response.uri ?? 'null',
    direction: response.direction ?? 'null',
  };
};
