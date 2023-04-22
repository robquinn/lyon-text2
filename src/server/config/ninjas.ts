export default (() => {
  enum Answers {
    Ninja = <number>0,
    NonNinjas = <number>1,
  }

  const Identifier = {
    isValid:
      /(気\+{0,2})|(Ninja\+{1,2})|(Ninja)|([0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4})/gi,
  };

  const Choices: NinjasConfig.Choice[] = [
    { id: Answers.Ninja, name: "Ninja's" },
    { id: Answers.NonNinjas, name: "Non Ninja's" },
  ];

  return {
    Answers,
    Choices,
    Identifier,
  };
})() as Config.Ninjas;
