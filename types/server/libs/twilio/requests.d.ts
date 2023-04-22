declare namespace TwilioRequests {
  interface Request {
    request: TwilioRequest.Request;
    user: TwilioRequest.User;
  }

  type GetRequestsFromSmsData = (smsData: SmsData.Payload) => Request[];
}
