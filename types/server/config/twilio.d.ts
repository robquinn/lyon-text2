declare namespace TwilioConfig {
  interface Account {
    sid: string;
    authToken: string;
  }

  interface Service {
    messagingServiceSid: string;
    statusCallback: string;
    fromNumber: string;
  }

  type Services<T extends string> = Record<T, Service>;
  type Accounts<T extends string> = Record<T, Account>;

  interface All {
    Accounts: Accounts<'Live' | 'Test'>;
    Services: Services<'Live' | 'Test'>;
  }
}
