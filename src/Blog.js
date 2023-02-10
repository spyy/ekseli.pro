import React, { useState, useEffect } from 'react';

import Introduction from './Introduction';
import Content from './Content';
import Spreadsheet from './Spreadsheet';

import appConfig from './config/app.json'
import defaultConfig from './config/default.json'


const Blog = props => {
  const [spreadsheet, setSpreadsheet] = useState('');
  const [config, setConfig] = useState('');
  const [spreadsheets, setSpreadsheets] = useState([]);
  const [configs, setConfigs] = useState([]);
  const [state, setState] = useState('loading');
  const [loginState, setLoginState] = useState('logged out');

  let tokenClient;

  useEffect(() => {
    console.log('state: ' + state);

    switch (state) {
      case 'loading':
        break;
      case 'loaded':
        window.gapi.load('client', initializeApi);        
        break;               
      case 'token':
        setState('apiInitialized');
        break;
      case 'apiInitialized':
        setState('getFiles');
        break;
      case 'getFiles':
        getFiles();
        break;
      case 'spreadsheets':
        if (spreadsheets.length) {
          setState('getConfigs');
        }
        break;
      case 'getConfigs':
        getConfigs();
        break;
      case 'configs':
        setState('start');
        break;
      case 'start':
        setSpreadsheet('');
        setConfig('');
        break;
      case 'spreadsheetSelected':
        break;
      default:
        break;
    }
  },[state]);

  const handleGetFilesResponse = body => {
    let confs = [];

    body.files.forEach(element => {
      const obj = Object.assign(defaultConfig, { ref: element });
      confs.push(obj);

      //console.log(obj);
    });

    //setConfigs(body.files);

    console.log(body.files);

    setSpreadsheets(body.files);

    setState('spreadsheets');
  }

  const handleGetConfigsResponse = body => {
    let confs = [];

    configs.forEach(c => {
      const found = body.files.find(element => element.name == c.name);

      found ? confs.push(found) : confs.push(c);
    });

    setConfigs(confs);

    setState('configs');
  }

  const parseJson = res => {
    //console.log(res); 
    
    return JSON.parse(res.body);
  }

  const getFiles = () => {
    const args = {
      'path': 'https://www.googleapis.com/drive/v3/files',
      'params': {
        'spaces': 'drive',
        'fields': '*',
        'q': 'mimeType = "application/vnd.google-apps.spreadsheet"'
      }
    };
    
    window.gapi.client.request(args)
      .then(parseJson)
      .then(handleGetFilesResponse)
      .catch(err => console.log(err))
  }

  const getConfigs = () => {
    const args = {
      'path': 'https://www.googleapis.com/drive/v3/files',
      'params': {
        'spaces': 'appDataFolder',
        'fields': '*',
        'q': 'mimeType = "application/json"'
      }
    };
    
    window.gapi.client.request(args)
      .then(parseJson)
      .then(handleGetConfigsResponse)
      .catch(err => console.log(err))
  }

  const handleTokenResponse = token => {
    console.log(token);

    setLoginState('logged in');

    setState('token');
  }

  const initializeApi= () => {
    const args = {
      clientId: appConfig.client_id,
      apiKey: appConfig.apiKey,
      scope: appConfig.scope
    };
    
    window.gapi.client.init(args)
      .then(res => setState('apiInitialized'))
      .catch(err => console.log(err))
  
  }

  const onLoad = event => {
    setState('loaded');
  }

  window.addEventListener('load', event => onLoad(event));


  const onSignIn = () => {
    tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: appConfig.client_id,
      scope: appConfig.scope,
      callback: handleTokenResponse
    });

    if (window.gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
      tokenClient.requestAccessToken({prompt: ''});
    }
  }

  const onSignOut = () => {
    console.log('onSignOut');

  }

  const onSpreadsheet = spreadsheet => {
    console.log(spreadsheet);

    setState('spreadsheetSelected'); 
    
    setSpreadsheet(spreadsheet);
  }

  const renderSignInButton = () => {
    if (loginState == 'logged out') {
      return (
        <a className="btn btn-sm btn-outline-secondary" href="#" onClick={onSignIn}>Kirjaudu</a>
      );
    } else {
      return (
        <a className="btn btn-sm btn-outline-secondary" href="#" onClick={onSignOut}>Ulos</a>
      );
    }
  }

  const renderContent = props => {
    switch (state) {
      case 'start':
          return (
            <Content spreadsheets={ spreadsheets } configs={ configs } onSpreadsheet={spreadsheet => onSpreadsheet(spreadsheet)} />
          );
      case 'spreadsheetSelected':
          return (
            <Spreadsheet spreadsheet={ spreadsheet } />
          );
      default:
          return (<Introduction />);
    }

  }

  return (
    <>
      <div className="container">
        <header className="blog-header lh-1 py-3">
          <div className="row flex-nowrap justify-content-between align-items-center">
            <div className="col-4 pt-1">
              <a className="link-secondary" href="#" onClick={() => setState('start')}>Alkuun</a>
            </div>
            <div className="col-4 text-center">
              <a className="blog-header-logo text-dark" href="#">Ekseli</a>
            </div>
            <div className="col-4 d-flex justify-content-end align-items-center">
              { renderSignInButton() }
            </div>        
          </div>
        </header>
      </div>

      { renderContent(props) }

      <footer class="my-5 pt-5 text-muted text-center text-small">
        <p class="mb-1">© 2022–2023 ekseli.fi</p>
        <ul class="list-inline">
          <li class="list-inline-item"><a href="#">Privacy</a></li>
          <li class="list-inline-item"><a href="#">Terms</a></li>
          <li class="list-inline-item"><a href="#">Support</a></li>
        </ul>
      </footer>
    </>
  );
}

export default Blog;
