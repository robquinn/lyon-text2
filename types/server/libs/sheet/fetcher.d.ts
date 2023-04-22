declare namespace SheetFetcher {
  interface Instance {
    get sheetObject(): SheetObject.Instance;
    set sheetObject(sheetObject: SheetObject.Instance);

    offices: () => Offices;
    roles: () => Roles;
    users: () => Users;
    messages: (id: string) => Messages;
  }

  interface Message {
    'Batch ID': string;
    'First Name': string;
    'Last Name': string;
    Office: string;
    Role: string;
    Ninja: boolean;
    Message: string;
    From: string;
    To: string;
    Status: string;
    'Date Created': string;
    'Date Sent': string;
    'Date Updated': string;
    'Error Code': string;
    'Error Message': string;
    'Messaging Service SID': string;
    'Num Media': number;
    'Num Segments': number;
    Price: string;
    'Price Unit': string;
    SID: string;
    'SubResource URIs': string;
    'Account SID': string;
    'API Version': string;
    URI: string;
    Direction: string;
  }

  type Messages = Message[];
  type Users = SheetObject.Data;
  type Offices = string[];
  type Roles = string[];
}
