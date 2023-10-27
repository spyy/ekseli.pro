import React, { useState, useRef} from 'react';

import Loading from './Loading';
import OffCanvas from './OffCanvas';
import Navbar from './Navbar';
import Introduction from './Introduction';
import TokenExpired from './TokenExpired';

import appConfig from './config/app.json';


//window.gapi.load('client', () => console.log('gapi loaded'));


const App = () => {
  const [state, setState] = useState('logged out');
  
  const tokenClient = useRef(0);

  const handleTokenResponse = tokenResponse => {
    console.log(tokenResponse);

    if (tokenResponse && tokenResponse.access_token) {    
        setState('logged in');
    }
  }

  const initTokenClient = () => {
    if (tokenClient.current) {
      console.log('client already initialized');
    } else {
      if (window.google) {
        tokenClient.current = window.google.accounts.oauth2.initTokenClient({
          client_id: appConfig.client_id,
          scope: appConfig.scope,
          callback: handleTokenResponse
        });
      } else {
        console.log('google not initialized');      
        return false;
      }
    }

    return true;
  }

  const requestAccessToken = () => {
    console.log('requestAccessToken');

    if (window.gapi.client.getToken() === null) {
        tokenClient.current.requestAccessToken({prompt: 'consent'});
    } else {
        tokenClient.current.requestAccessToken({prompt: ''});
    }
  }

  const onSignIn = () => {
    console.log('onSignIn');

    if (initTokenClient()) {
      requestAccessToken();
    } else {
      console.log('signin failed');
    }
  }

  const onSignOut = () => {
    setState('logged out');
  }

  const onTokenExpired = () => {
    setState('token expired');
  }

  switch (state) {
    case 'logged out':
      return (
        <>
          <Navbar items={[]} />
          <Introduction onSignIn={onSignIn} />
        </>
      );
    case 'logged in':
      return (
        <>
          <OffCanvas onSignOut={onSignOut} onTokenExpired={onTokenExpired} />
        </>
      );
    case 'token expired':
      return (
        <>
          <TokenExpired />
        </>
      );
    default:
      return (
        <>
          <Navbar items={[]} />
          <Loading />
        </>
      );
  }
}

export default App;
