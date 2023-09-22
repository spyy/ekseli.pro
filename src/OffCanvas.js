import React, { useState, useEffect } from 'react';

import TokenExpired from './TokenExpired';
import Navbar from './Navbar';
import Instructions from './Instructions';
import Spreadsheet from './Spreadsheet';
import Content from './Content';
import Loading from './Loading';


import * as utils from './utils';

const navbarItems = ['Google Sheets', 'Käyttöliittymä', 'Ohje'];

const OffCanvas = props => {
  const [state, setState] = useState('get files');
  const [activeNavbarItem, setActiveNavbarItem] = useState('');
  const [spreadsheet, setSpreadsheet] = useState(null);
  const [spreadsheets, setSpreadsheets] = useState([]);

  useEffect(() => {
    console.log('state: ' + state);

    switch (state) {
      case 'get files':
        getFiles();
        break;
      case 'spreadsheets':
        if (spreadsheets.length) {
          setActiveNavbarItem('Google Sheets');
        } else {
          setState('instructions');
        }
        break;            
      case 'spreadsheetSelected':
        setState('spreadsheetChanged');
        break;
      case 'spreadsheetChanged':
          break;
      case 'token expired':
        break;
      default:
        break;
    }
  },[state]);

  const filteredSheets = () => {
    return spreadsheets.filter(element => element.trashed === false);
  }

  const handleGetFilesResponse = result => {
    console.log(result);

    setSpreadsheets(result.files);

    setState('spreadsheets');
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
      .then(utils.parseResult)
      .then(handleGetFilesResponse)
      .catch(err => console.log(err))
  }

  const clear = () => {
    console.log('clear');

    setActiveNavbarItem('');

    setSpreadsheets([]);
    
    setSpreadsheet(null);

  }

  const onRefresh = () => {
    console.log('onRefresh');

    if (state === 'introduction') {
      console.log('Please login first');
    } else {
      clear();

      setState('get files');
    }
  }

  const onNavbarItem = item => {
    console.log(item);

    setActiveNavbarItem(item);

    setSpreadsheet(null);
  }

  const onSpreadsheet = spreadsheet => {
    console.log(spreadsheet);

    setSpreadsheet(spreadsheet);

    setState('spreadsheetSelected');
  }

  const onTokenExpired = () => {
    clear();
    
    setState('token expired');
  }

  const renderMain = () => {      
      console.log(activeNavbarItem);  

      switch (activeNavbarItem) {
        case 'Google Sheets':
        case 'Käyttöliittymä':
          if (spreadsheet) {
            return (
              <Spreadsheet activeNavbarItem={activeNavbarItem} spreadsheet={ spreadsheet } onTokenExpired={ onTokenExpired } />
            );
          } else {
            return (
              <Content 
                activeNavbarItem={activeNavbarItem}
                spreadsheets={filteredSheets()} 
                onSpreadsheet={onSpreadsheet} />
            );
          }        
        case 'Ohje':
          return (
            <Instructions onRefresh={onRefresh} />
          );
        default:
          return (null);
      }    
  }

  switch (state) {
    case 'get files':
    case 'spreadsheetSelected':
      return (
        <>
          <Navbar items={navbarItems} active={activeNavbarItem} onItem={onNavbarItem} onSignOut={props.onSignOut} />   
          <Loading />
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
          <Navbar items={navbarItems} active={activeNavbarItem} onItem={onNavbarItem} onSignOut={props.onSignOut} />   
          { renderMain() }
        </>
      );
  }
}

export default OffCanvas;
