declare namespace SmsData {
  namespace Values {
    type All = boolean;
    type Offices = string[];
    type Roles = string[];
    type Ninjas = number[];
    type Phones = string[];
    type Message = string;

    type Each = All | Offices | Roles | Ninjas | Phones | Message;
  }

  interface Payload {
    all: Values.All;
    offices: Values.Offices;
    roles: Values.Roles;
    ninjas: Values.Ninjas;
    phones: Values.Phones;
    message: Values.Message;
  }

  namespace Properties {
    type All = 'all';
    type Offices = 'offices';
    type Roles = 'roles';
    type Ninjas = 'ninjas';
    type Phones = 'phones';
    type Message = 'message';

    type Each = All | Offices | Roles | Ninjas | Phones | Message;
  }

  type ChannelReturnTypes<T extends Properties.Each> = T extends Properties.All
    ? Values.All
    : T extends Properties.Offices
    ? Values.Offices
    : T extends Properties.Roles
    ? Values.Roles
    : T extends Properties.Ninjas
    ? Values.Ninjas
    : T extends Properties.Phones
    ? Values.Phones
    : T extends Properties.Message
    ? Values.Message
    : never;

  type Channel = () => void;

  type Sendable = boolean;
  type Sending = boolean;
  type Fetching = boolean;
  type Estimate = number | null;

  interface Action {
    data: Payload;
    sendable: Sendable;
    sending: Sending;
    estimate: Estimate;
  }
}
