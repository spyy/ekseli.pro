import React, { useState, useEffect } from 'react';

import Introduction from './Introduction';
import Content from './Content';
import Spreadsheet from './Spreadsheet';
import NavBar from './NavBar';
import Header from './Header';

import defaultConfig from './config/default.json';


const Blog = props => {
  const [spreadsheet, setSpreadsheet] = useState({});
  const [spreadsheets, setSpreadsheets] = useState([]);
  const [state, setState] = useState('loading');
  const [firstSelection, setFirstSelection] = useState('');

  useEffect(() => {
    console.log('state: ' + state);

    switch (state) {
      case 'loading':
        break;
      case 'introduction':
          break;               
      case 'getFiles':
        getFiles();
        break;
      case 'spreadsheets':
        if (spreadsheets.length) {
          setState('content');
        }
        break;      
      case 'content':
        setSpreadsheet('');
        break;
      case 'spreadsheetSelected':
        setState('spreadsheetChanged');
        break;
      case 'spreadsheetChanged':
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

  const onLogin = event => {
    setState('getFiles');
  }

  const onLogout = event => {
    setState('introduction');
  }

  window.onGoogleLibraryLoad = () => {
    console.log('onGoogleLibraryLoad');

    window.gapi.load('client', () => setState('introduction'));
  };

  const onSpreadsheet = spreadsheet => {
    console.log(spreadsheet);

    setState('spreadsheetSelected'); 
    
    setSpreadsheet(spreadsheet);
  }

  const onFirstSelection = (spreadsheet, selection) => {
    console.log('onFirstSelection');

    setFirstSelection(selection); 

    onSpreadsheet(spreadsheet);
  }

  const renderMain = props => {
    switch (state) {
      case 'introduction':
        return (<Introduction />);
      case 'content':
        return (
          <Content 
            spreadsheets={ spreadsheets } 
            onMetadata={ spreadsheet => onFirstSelection(spreadsheet, 'metadata') } 
            onSpreadsheet={ spreadsheet => onFirstSelection(spreadsheet, 'spreadsheet') } />
        );
      case 'spreadsheetSelected':        
        return (<></>);
      case 'spreadsheetChanged':
        return (
          <Spreadsheet firstSelection={firstSelection} spreadsheet={ spreadsheet } />
        );
      default:
        return (<></>);
    }
  }

  const renderNav = props => {
    switch (state) {
      case 'spreadsheetSelected':       
      case 'spreadsheetChanged':
        return (
            <NavBar spreadsheets={ spreadsheets } selected={ spreadsheet } onSpreadsheet={ onSpreadsheet } />
        );
      default:
          return null;
    }
  }

  const renderHeader = props => {
    return state == 'loading' ? null : <Header onLogin={ onLogin } onLogout={ onLogout } />;
  }

  return (
    <>
      <div className="container">
        { renderHeader(props) }
        { renderNav(props) }
      </div>

      { renderMain(props) }

      <footer className="my-5 pt-5 text-muted text-center text-small">
        <p className="mb-1">© 2022–2023 ekseli.fi</p>
        <ul className="list-inline">
          <li className="list-inline-item"><a href="#">Privacy</a></li>
          <li className="list-inline-item"><a href="#">Terms</a></li>
          <li className="list-inline-item"><a href="#">Support</a></li>
        </ul>
      </footer>
    </>
  );
}

export default Blog;
