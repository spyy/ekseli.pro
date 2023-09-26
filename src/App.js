import React, { useState, useRef } from 'react';

import Loading from './Loading';
import OffCanvas from './OffCanvas';
import Navbar from './Navbar';
import Introduction from './Introduction';
import TokenExpired from './TokenExpired';

import appConfig from './config/app.json';



const App = () => {
  const [state, setState] = useState('loading');
  
  const tokenClient = useRef(0);

  const handleTokenResponse = tokenResponse => {
    console.log(tokenResponse);

    if (tokenResponse && tokenResponse.access_token) {    
        setState('logged in');
    }
  }

  const onSignIn = () => {
    if (window.gapi.client.getToken() === null) {
        tokenClient.current.requestAccessToken({prompt: 'consent'});
    } else {
        tokenClient.current.requestAccessToken({prompt: ''});
    }
  }

  const onSignOut = () => {
    setState('api loaded');
  }

  const onApiLoaded = () => {
    tokenClient.current = window.google.accounts.oauth2.initTokenClient({
        client_id: appConfig.client_id,
        scope: appConfig.scope,
        callback: handleTokenResponse
    });        

    setState('api loaded');
  }

  const onTokenExpired = () => {
    setState('token expired');
  }

  window.onGoogleLibraryLoad = () => {
    console.log('onGoogleLibraryLoad');

    //window.gapi.load('client', () => setState('api loaded'));
  };

  window.onload = event => {
    console.log("page is fully loaded");

    window.gapi.load('client', onApiLoaded);
  };

  switch (state) {
    case 'api loaded':
      return (
        <>
          <Navbar items={[]} onSignIn={onSignIn} />
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
