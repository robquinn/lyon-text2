import checkAllowList from '../utils/check-allow-list';
import proxyHandler from '../utils/proxy-handler';
import FunctionHost from './function-host';

declare const window: AppWindow;

class ServerProxy<FM extends FunctionMap> extends FunctionHost<FM> {
  constructor(private _config?: ServerConfig) {
    super();
    window.gasStore = {};
    window.addEventListener('message', this.buildMessageListener(), false);
    this._serverFunctions = new Proxy(
      {},
      { get: proxyHandler }
    ) as ServerFunctions<FM>;
  }

  private buildMessageListener(): (event: MessageEvent) => void {
    return (event: MessageEvent) => {
      const allowOrigin = checkAllowList(
        event.origin,
        this._config?.allowedDevelopmentDomains
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (!allowOrigin || event.data.type !== 'RESPONSE') return;

      const { response, status, id } = event.data;
      const { resolve, reject } = window.gasStore[id as string];

      if (status === 'ERROR') {
        reject(response);
      }
      resolve(response);
    };
  }
}

export default ServerProxy;
