import React, { useState, useEffect } from 'react';

//import Blog from './Blog';
import Navbar from './Navbar';
import Loading from './Loading';
import Introduction from './Introduction';
import Instructions from './Instructions';
import NavScroller from './NavScroller';
import Spreadsheet from './Spreadsheet';
import Content from './Content';

import * as utils from './utils';

const navbarItems = ['Google Sheets', 'Käyttöliittymä', 'Ohje'];

const App = () => {
  const [state, setState] = useState('loading');
  const [activeNavbarItem, setActiveNavbarItem] = useState('');
  const [spreadsheet, setSpreadsheet] = useState(null);
  const [spreadsheets, setSpreadsheets] = useState([]);

  window.onGoogleLibraryLoad = () => {
    console.log('onGoogleLibraryLoad');

    window.gapi.load('client', () => setState('api loaded'));
  };

  useEffect(() => {
    console.log('state: ' + state);

    switch (state) {
      case 'loading':
        break;
      case 'api loaded':
          break;               
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

  const onRefresh = () => {
    console.log('onRefresh');

    setActiveNavbarItem('');

    setSpreadsheets([]);
    
    setSpreadsheet(null);

    setState('get files');
  }

  const onNavbarItem = item => {
    console.log(item);

    setActiveNavbarItem(item);
  }

  const onNavItem = item => {
    console.log(item);

    setSpreadsheet(item);

    setState('spreadsheetSelected');
  }

  const onLogin = () => {
    console.log('onLogin');

    setState('get files');
  }

  const onLogout = () => {
    console.log('onLogout');

    setActiveNavbarItem('');

    setSpreadsheets([]);

    setSpreadsheet(null);

    setState('api loaded');
  }

  const onSpreadsheet = spreadsheet => {
    console.log(spreadsheet);

    
    setSpreadsheet(spreadsheet);
  }

  const renderNavbar = () => {    
    return (
      <Navbar items={navbarItems} active={activeNavbarItem} onItem={onNavbarItem} onLogin={onLogin} onLogout={onLogout} />
    );   
  }

  const renderNavScroller = () => {
    if (spreadsheet && activeNavbarItem !== 'Ohje') {
      return (
        <NavScroller activeNavbarItem={activeNavbarItem} spreadsheets={filteredSheets()} spreadsheet={spreadsheet} onItem={onNavItem} />
      );
    } else {
      return null;
    }   
  }

  const renderMain = () => {    
    
      switch (activeNavbarItem) {
        case 'Google Sheets':
        case 'Käyttöliittymä':
          if (spreadsheet) {
            return (
              <Spreadsheet activeNavbarItem={activeNavbarItem} spreadsheet={ spreadsheet } />
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
          return (
            <Introduction />
          );
      }
    
  }

  switch (state) {
    case 'loading':
      return (
        <Loading />
      );
    case 'spreadsheetSelected':
      return (
        <>
          { renderNavbar() }
          { renderNavScroller() }
        </>
      );
    default:
      return (
        <>
          { renderNavbar() }
          { renderNavScroller() }
          { renderMain() }
        </>
      );
}
}

export default App;
