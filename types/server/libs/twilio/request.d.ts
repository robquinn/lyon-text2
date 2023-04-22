declare namespace TwilioRequest {
  interface Instance {
    user: () => User;
    request: () => Request;
  }

  type Uknown = Pick<User, 'firstName' | 'lastName' | 'office' | 'isNinja'> & {
    role: string[];
  };

  interface User {
    firstName: string;
    lastName: string;
    office: string;
    role: string;
    isNinja: string | boolean;
  }

  interface Request {
    url: Url;
    options: Options;
  }

  type Url = string;

  interface Options {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    method: import('twilio/lib/interfaces').HttpMethod;
    payload: Payload;
    muteHttpExceptions: boolean;
    headers: Headers;
    [name: string]: unknown;
  }

  interface Headers {
    Authorization: string;
    [key: string]: string;
  }

  interface Payload {
    To: string;
    Body: string;
    From: string;
    StatusCallback?: string;
    MessagingServiceSid?: string;
  }
}
