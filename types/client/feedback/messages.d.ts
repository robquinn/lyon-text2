declare namespace Messages {
  type Types = 'preview' | 'sent' | string;

  namespace Payload {
    interface Common {
      user: {
        firstName: string;
        lastName: string;
        office: string;
        role: string;
        isNinja: boolean;
      };
    }
    interface Preview extends Common {
      request: {
        options: {
          payload: {
            to: string;
            from: string;
            body: string;
          };
        };
      };
    }

    interface Sent extends Common {
      response: {
        To: string;
        From: string;
        Body: string;
      };
    }
  }

  interface Preview {
    fetching: boolean;
    data: Array<string | number>;
  }
  interface Sent {
    fetching: boolean;
    id: string;
    data: Array<string | number>;
  }

  interface Action {
    preview: Preview;
    sent: Sent;
  }
}
