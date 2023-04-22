import { HttpMethod } from 'twilio/lib/interfaces';
import TwilioSms from './sms';
// import isProd from '../utils/env';

export default class TwilioSmsRequest
  extends TwilioSms
  implements TwilioRequest.Instance
{
  constructor(
    message: string,
    to: `+${number}`,
    user: FormatUtils.User.Feedback
  ) {
    super(message, to, {
      firstName: user.firstName,
      lastName: user.lastName,
      office: user.office,
      role: user.role.join(', '),
      isNinja: user.isNinja,
    });
  }

  public static unknown(): TwilioRequest.Uknown {
    const unknown = 'UNKNOWN';
    return {
      firstName: unknown,
      lastName: unknown,
      office: unknown,
      role: [unknown],
      isNinja: unknown,
    };
  }

  public user(): TwilioRequest.User {
    return this._user;
  }

  public request(): TwilioRequest.Request {
    return { url: this.url(), options: this.options() };
  }

  private url(): TwilioRequest.Url {
    return `https://api.twilio.com/2010-04-01/Accounts/${this._accountSID}/Messages.json`;
  }

  private options(): TwilioRequest.Options {
    return {
      method: 'post' as HttpMethod,
      payload: this.payload(),
      muteHttpExceptions: true,
      headers: this.headers(),
    };
  }

  private headers(): TwilioRequest.Headers {
    return {
      Authorization: `Basic ${Utilities.base64Encode(
        `${this._accountSID}:${this._authToken}`
      )}`,
    };
  }

  private payload(): TwilioRequest.Payload {
    const payload: TwilioRequest.Payload = {
      To: this._to,
      Body: this._message ? this._message : '',
      From: this._From,
      MessagingServiceSid: this._MessagingServiceSid,
      StatusCallback: this._StatusCallback,
    };
    // if (isProd()) payload.MessagingServiceSid = this._MessagingServiceSid;
    // if (isProd()) payload.StatusCallback = this._StatusCallback;
    return payload;
  }
}
