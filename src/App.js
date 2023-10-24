import React, { useState, useRef, useEffect } from 'react';

import Loading from './Loading';
import OffCanvas from './OffCanvas';
import Navbar from './Navbar';
import Introduction from './Introduction';
import TokenExpired from './TokenExpired';

import appConfig from './config/app.json';


//window.gapi.load('client', () => console.log('gapi loaded'));


const App = () => {
  const [state, setState] = useState('api loaded');
  
  const tokenClient = useRef(0);

  useEffect(() => {
    console.log(state);

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
        tokenClient.current = window.google.accounts.oauth2.initTokenClient({
          client_id: appConfig.client_id,
          scope: appConfig.scope,
          callback: handleTokenResponse
        });
      }

      setState('client initialized');
    }

    switch (state) {
      case 'api loaded':
        window.gapi.load('client', () => setState('gapi loaded'));
        break;
      case 'gapi loaded':
        initTokenClient();
        break;      
      default:
        break;
    }
  },[state]);

  const onSignIn = () => {
    console.log('onSignIn');

    if (window.gapi.client.getToken() === null) {
        tokenClient.current.requestAccessToken({prompt: 'consent'});
    } else {
        tokenClient.current.requestAccessToken({prompt: ''});
    }
  }

  const onSignOut = () => {
    setState('api loaded');
  }

  const onTokenExpired = () => {
    setState('token expired');
  }

  switch (state) {
    case 'client initialized':
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
