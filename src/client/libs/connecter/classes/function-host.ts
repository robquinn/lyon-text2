abstract class FunctionHost<FM extends FunctionMap> {
  protected _serverFunctions: ServerFunctions<FM> = {} as ServerFunctions<FM>;

  get serverFunctions(): ServerFunctions<FM> {
    return this._serverFunctions;
  }
}

export default FunctionHost;
