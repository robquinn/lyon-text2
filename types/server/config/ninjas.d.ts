declare namespace NinjasConfig {
  interface Answers<T, U> {
    Ninja: T;
    NonNinjas: U;
  }

  interface Choice {
    id: number;
    name: string;
  }

  type Choices = NinjasConfig.Choice[];

  interface Identifier {
    isValid: RegExp;
  }

  interface All {
    Answers: Answers<0, 1>;
    Choices: Choices;
    Identifier: Identifier;
  }
}
