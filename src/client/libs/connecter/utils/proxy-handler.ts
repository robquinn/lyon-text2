import { v4 as uuidv4 } from 'uuid';

declare const window: AppWindow;

const proxyHandler = (
  target: unknown,
  functionName: string
): ((...args: unknown[]) => Promise<unknown>) => {
  const id = uuidv4();
  const promise = new Promise((resolve, reject) => {
    window.gasStore[id] = { resolve, reject };
  });
  return (...args: unknown[]) => {
    window.parent.postMessage(
      {
        type: 'REQUEST',
        id,
        functionName,
        args: [...args],
      },
      '*'
    );
    return promise;
  };
};

export default proxyHandler;
