declare namespace FormatUtils {
  type FormatUser = ({
    user,
    response,
  }: {
    user: User.SheetObj;
    response: SmsData.Payload;
  }) => User.ReturnType;

  type FormatE164Phone = (phone: string) => string;

  type FormatSmsForSheet = (sms: {
    id: string;
    response: FormatUtils.Twilio.RequestResponse;
    user: TwilioRequest.User;
  }) => SmsForSheet;

  interface SmsForSheet
    extends Twilio.SmsResponse,
      Pick<User.Feedback, 'firstName' | 'lastName' | 'office'> {
    id: string;
    role: string;
    ninja: string | boolean;
  }

  namespace User {
    interface SheetObj {
      ['First Name']: string;
      ['Last Name']: string;
      ['Office']: OfficeResolver.Office;
      ['Role']: string;
      ['Ninja']: string;
      ['Phone']: string;
    }
    type Message = string;
    type OfficesData = OfficesWrapper.Offices;

    interface Args {
      user: SheetObj;
      response: SmsData.Payload;
      format: 'sms' | 'feedback';
    }

    interface Feedback {
      firstName: string;
      lastName: string;
      office: string;
      role: string[];
      isNinja: boolean;
    }
    interface Sms extends Feedback {
      phone: string;
      message: string;
    }
    interface ReturnType {
      sms: Sms;
      feedback: Feedback;
    }
  }
  namespace Twilio {
    interface RequestResponse {
      body: string;
      from: string;
      to: string;
      status: string;
      date_created: string;
      date_sent: string;
      date_updated: string;
      error_code: string;
      error_message: string;
      messaging_service_sid: string;
      num_media: string;
      num_segments: string;
      price: string;
      price_unit: string;
      sid: string;
      subresource_uris: string;
      account_sid: string;
      api_version: string;
      uri: string;
      direction: string;
      user: FormatUtils.User.Feedback;
    }
    interface SmsResponse {
      message: string;
      from: string;
      to: string;
      status: string;
      dateCreated: string;
      dateSent: string;
      dateUpdated: string;
      errorCode: string;
      errorMessage: string;
      messagingServiceSid: string;
      numMedia: string;
      numSegments: string;
      price: string;
      priceUnit: string;
      sid: string;
      subResourceUris: string;
      accountSid: string;
      apiVersion: string;
      uri: string;
      direction: string;
    }
  }
}
