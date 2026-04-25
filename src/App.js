import React, { useState, useRef, useEffect} from 'react';

import Loading from './Loading';
import OffCanvas from './OffCanvas';
import Navbar from './Navbar';
import Introduction from './Introduction';
import TokenExpired from './TokenExpired';

import appConfig from './config/app.json';


const App = () => {
  const [state, setState] = useState('loaded');
  const [token, setToken] = useState('');
  
  const tokenClient = useRef(0);

  useEffect(() => {
      console.log('state: ' + state);
  
      switch (state) {
        case 'loaded':
          if (initTokenClient()) {
            setState('initialized');
          }
          break;
        case 'initialized':
        case 'logged in':
        case 'logged out':
        case 'token expired':
          break;
        default:
          break;
      }
    },[state]);

  const handleTokenResponse = tokenResponse => {
    console.log(tokenResponse);

    if (tokenResponse && tokenResponse.access_token) {  
      setToken(tokenResponse.access_token);  
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

    if (token === null) {
      // prompts: '' (none), 'consent' (force screen), or 'select_account'
        tokenClient.current.requestAccessToken({prompt: 'consent'});
    } else {
        tokenClient.current.requestAccessToken({prompt: ''});
    }
  }

  const onSignIn = () => {
    console.log('onSignIn');

    requestAccessToken();
  }

  const onSignOut = () => {
    setState('logged out');
  }

  const onTokenExpired = () => {
    setState('token expired');
  }

  switch (state) {
    case 'loaded':
    case 'initialized':
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
          <OffCanvas token={token} onSignOut={onSignOut} onTokenExpired={onTokenExpired} />
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
