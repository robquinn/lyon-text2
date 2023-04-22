export default abstract class CheckResponse implements CheckResponse.Instance {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    protected response: SmsData.Payload,
    protected user: FormatUtils.User.Sms,
    protected type: keyof SmsData.Payload
  ) {}

  public isDefined() {
    return this.response[this.type] != null;
  }

  public isUndefined() {
    return this.response[this.type] == null;
  }

  abstract matchesUser(): boolean;
}
