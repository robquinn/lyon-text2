import ignoredFunctionNames from '../utils/ignored-function-names';
import promisify from '../utils/promisify';
import FunctionHost from './function-host';

class GASPromises<FM extends FunctionMap> extends FunctionHost<FM> {
  constructor() {
    super();
    this.promisifyGASFunctions();
  }

  private promisifyGASFunctions(): void {
    this._serverFunctions = Object.keys(google.script.run).reduce(
      (acc, functionName) =>
        ignoredFunctionNames.includes(functionName)
          ? acc
          : {
              ...acc,
              [functionName]: promisify(functionName),
            },
      {}
    ) as ServerFunctions<FM>;
  }
}

export default GASPromises;
