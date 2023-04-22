declare namespace SmsFormInputs {
  interface All {
    answer: boolean;
  }
  interface Offices {
    data: OfficesWrapper.Offices;
    answers: Record<string, boolean>;
  }
  interface Roles {
    data: RolesWrapper.Roles;
    answers: Record<string, boolean>;
  }
  interface Ninjas {
    data: NinjasWrapper.Ninjas;
    answers: Record<string, boolean>;
  }
  interface Phones {
    answers: Array<{ id: string; value: string }>;
  }
  interface Message {
    answer: string;
  }
  interface Action {
    all: All;
    offices: Offices;
    roles: Roles;
    ninjas: Ninjas;
    phones: Phones;
    message: Message;
  }
}
