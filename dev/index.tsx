import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import serverFunctions from '../src/client/libs/serverFunctions';

const { FILENAME, PORT } = process.env;

function DevServer() {
  const iframe = React.useRef(null);
  useEffect(() => {
    const handleRequest = (event) => {
      const request = (event as DevServerRequestEvent).data;
      const { type, functionName, id, args } = request;

      if (type !== 'REQUEST') return;

      serverFunctions[functionName](...args)
        .then((response: DevServerResponse) => {
          return (
            iframe.current as unknown as GASDevServerIFrame
          ).contentWindow.postMessage(
            {
              type: 'RESPONSE',
              id,
              status: 'SUCCESS',
              response,
            } as DevServerResponse,
            `https://localhost:${PORT as string}`
          );
        })
        .catch((err) => {
          (
            iframe.current as unknown as GASDevServerIFrame
          ).contentWindow.postMessage(
            {
              type: 'RESPONSE',
              id,
              status: 'ERROR',
              response: err,
            },
            `https://localhost:${PORT as string}`
          );
        });
    };

    window.addEventListener('message', handleRequest, false);
  }, []);

  return (
    <div
      // we want our dev environment to fill the dialog window
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <iframe
        title="Dev Server Window"
        style={{
          width: '100%',
          height: '100%',
          border: '0',
          position: 'absolute',
        }}
        ref={iframe}
        src={`https://localhost:${PORT as string}/${
          FILENAME as string
        }-impl.html`}
      />
    </div>
  );
}

const container = document.getElementById('index');
const root = createRoot(container as HTMLElement);
root.render(<DevServer />);
