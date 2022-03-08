import React from 'react';
import ReactDOM from 'react-dom';
import { MoralisProvider } from 'react-moralis';
import { MoralisDappProvider } from './providers/MoralisDappProvider/MoralisDappProvider';
import App from './App';
import './scss/style.scss';

/** Get your free Moralis Account https://moralis.io/ */

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

const Application = () => {
  const isServerInfo = !!(APP_ID && SERVER_URL);
  if (isServerInfo) {
    return (
      <MoralisProvider appId={ APP_ID } serverUrl={ SERVER_URL }>
        <MoralisDappProvider>
          <App isServerInfo />
        </MoralisDappProvider>
      </MoralisProvider>
    );
  }

  return (
    <div style={ { display: 'flex', justifyContent: 'center' } }>
      NO SERVER INFO
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>,
  document.getElementById('root'),
);
