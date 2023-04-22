export default (() => {
  const Accounts: TwilioConfig.Accounts<'Live' | 'Test'> = {
    Live: {
      sid: process.env.TWILIO__LIVE__ACCOUNT_SID as string,
      authToken: process.env.TWILIO__LIVE__AUTH_TOKEN as string,
    },
    Test: {
      sid: process.env.TWILIO__TEST__ACCOUNT_SID as string,
      authToken: process.env.TWILIO__TEST__AUTH_TOKEN as string,
    },
  };

  const Services: TwilioConfig.Services<'Live' | 'Test'> = {
    Live: {
      messagingServiceSid: process.env
        .TWILIO__PROD__MESSAGING_SERVICE_SID as string,
      statusCallback: process.env.TWILIO__PROD__STATUS_CALLBACK as string,
      fromNumber: process.env.TWILIO__PROD__FROM_NUMBER as string,
    },
    Test: {
      messagingServiceSid: process.env
        .TWILIO__DEV__MESSAGING_SERVICE_SID as string,
      statusCallback: process.env.TWILIO__DEV__STATUS_CALLBACK as string,
      fromNumber: process.env.TWILIO__DEV__FROM_NUMBER as string,
      // fromNumber: process.env.TWILIO__TEST__MAGIC_SUCCESS_FROM_NUMBER as string,
    },
  };

  return {
    Accounts,
    Services,
  };
})() as Config.Twilio;
