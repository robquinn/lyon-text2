import React from 'react';
import * as ReactDOMClient from 'react-dom/client';

import App from './root/App';
import './styles.css';

const container = document.getElementById('index');

const root = ReactDOMClient.createRoot(container as HTMLElement);

root.render(<App />);
