import Twilio from '../../config/twilio';
import isProd from '../utils/env';

export default abstract class TwilioSms {
  // protected _accountSID: TwilioSms.AccountSID = isProd()
  //   ? Twilio.Accounts.Live.sid
  //   : Twilio.Accounts.Test.sid;
  protected _accountSID: TwilioSms.AccountSID = Twilio.Accounts.Live.sid;

  // protected _authToken: TwilioSms.AuthToken = isProd()
  //   ? Twilio.Accounts.Live.authToken
  //   : Twilio.Accounts.Test.authToken;
  protected _authToken: TwilioSms.AuthToken = Twilio.Accounts.Live.authToken;

  protected _MessagingServiceSid: TwilioSms.MessageServiceSid = isProd()
    ? Twilio.Services.Live.messagingServiceSid
    : Twilio.Services.Test.messagingServiceSid;

  protected _StatusCallback: TwilioSms.StatusCallback = isProd()
    ? Twilio.Services.Live.statusCallback
    : Twilio.Services.Test.statusCallback;

  protected _From: TwilioSms.From = isProd()
    ? Twilio.Services.Live.fromNumber
    : Twilio.Services.Test.fromNumber;

  // eslint-disable-next-line no-useless-constructor
  constructor(
    protected _message: string,
    protected _to: `+${number}`,
    protected _user: Pick<
      FormatUtils.User.Feedback,
      'firstName' | 'lastName' | 'office'
    > & { role: string; isNinja: string | boolean }
  ) {}
}
