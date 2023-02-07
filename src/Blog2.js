import React, { useState, useEffect } from 'react';

import Introduction from './Introduction';
import NavBar from './NavBar';
import Content from './Content';

import appConfig from './config/app.json'
import defaultConfig from './config/default.json'
import Sheet from './Sheet2';


const Blog = props => {
  const [spreadsheet, setSpreadsheet] = useState('');
  const [config, setConfig] = useState('');
  const [spreadsheets, setSpreadsheets] = useState([]);
  const [configs, setConfigs] = useState([]);
  const [state, setState] = useState('loading');

  let tokenClient;

  useEffect(() => {
    console.log('state: ' + state);

    switch (state) {
      case 'loading':
        break;
      case 'loaded':
        //initGoogle();
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
        } else {
          console.log('sssssssssss')
        }
        break;
      case 'getConfigs':
        getConfigs();
        break;
      case 'configs':
        break;
      case 'spreadsheetSelected':
        break;
      case 'spreadsheetChanged':
        setState('spreadsheetSelected');
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
      .then(setState('configs'))
      .catch(err => console.log(err))
  }

  const handleTokenResponse = token => {
    console.log(token);

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

    spreadsheet == '' ? setState('spreadsheetSelected') : setState('spreadsheetChanged'); 
    
    setSpreadsheet(spreadsheet);
  }

  const renderSignInButton = () => {
    if (state == 'loaded') {
      return (
        <a className="btn btn-sm btn-outline-secondary" href="#" onClick={onSignIn}>Kirjaudu sisään</a>
      );
    } else if (state == 'initialized') {
      return (
        <a className="btn btn-sm btn-outline-secondary" href="#" onClick={onSignOut}>Kirjaudu ulos</a>
      );
    } else {
      return null;
    }
  }

  const renderContent = props => {
    switch (state) {
      case 'configs':
        return (
          <Content spreadsheets={ spreadsheets } configs={ configs } onSpreadsheet={spreadsheet => onSpreadsheet(spreadsheet)} />
        );
      case 'spreadsheetSelected':
        return (<Sheet spreadsheet={ spreadsheet } />);
      case 'spreadsheetChanged':
        return (<></>);
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
              <a className="link-secondary" href="#">Työpöytä</a>
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

      <NavBar spreadsheets={ spreadsheets } selected={ spreadsheet } onSpreadsheet={spreadsheet => onSpreadsheet(spreadsheet)} />

      { renderContent(props) }
    </>
  );
}

export default Blog;
