const proxySmsData: FormProxy.ProxySmsData = (smsData: SmsData.Payload) =>
  new Proxy(smsData, {
    get(target, prop, receiver) {
      const args: boolean | Array<string | number> = Reflect.get(
        target,
        prop,
        receiver
      ) as boolean | Array<string | number>;
      if (prop !== 'all') {
        return (args as Array<string | number>)?.length > 0 ? args : undefined;
      }
      return args;
    },
  });

export default proxySmsData;
