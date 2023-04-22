declare namespace ProcessForm {
  interface Response {
    id: string;
    response: FormatUtils.Twilio.RequestResponse;
    user: TwilioRequest.User;
  }

  type ProcessResponse = (smsData: SmsData.Payload) => Response[];

  type GetSmsPreview = (smsData: SmsData.Payload) => TwilioRequests.Request[];
}
