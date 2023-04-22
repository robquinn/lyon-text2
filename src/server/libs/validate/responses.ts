export default class CheckResponses implements CheckResponses.Instance {
  // eslint-disable-next-line no-useless-constructor
  constructor(private response) {}

  manyAreUndefined() {
    if (
      this.response.all === false &&
      (this.response.offices?.length === 0 || this.response.offices == null) &&
      (this.response.ninjas?.length === 0 || this.response.ninjas == null) &&
      (this.response.roles?.length === 0 || this.response.roles == null)
    )
      return true;
    return false;
  }
}
