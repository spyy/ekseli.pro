import React, { useState, useEffect } from 'react';

import TokenExpired from './TokenExpired';
import Navbar from './Navbar';
import Instructions from './Instructions';
import Spreadsheet from './Spreadsheet';
import Content from './Content';
import Breadcrumb from './Breadcrumb';


import * as utils from './utils';

const navbarItems = ['Spreadsheet', 'Käyttöliittymä', 'Ohje'];

const OffCanvas = props => {
  const [state, setState] = useState('get files');
  const [activeNavbarItem, setActiveNavbarItem] = useState('');
  const [action, setAction] = useState('');
  const [spreadsheet, setSpreadsheet] = useState(null);
  const [spreadsheets, setSpreadsheets] = useState([]);

  useEffect(() => {
    console.log('state: ' + state);

    switch (state) {
      case 'get files':
        getFiles();
        break;
      case 'not found':
        break;
      case 'spreadsheets':
        if (spreadsheets.length === 0) {
          setState('not found');
        }
        break;            
      case 'spreadsheetSelected':
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

    setActiveNavbarItem('Spreadsheet');

    setState('spreadsheets');
  }

  const getFiles = () => {
    const args = {
      'path': 'https://www.googleapis.com/drive/v3/files',
      'params': {
        'spaces': 'drive',
        'fields': '*',
        'q': 'mimeType = "application/vnd.google-apps.spreadsheet" and trashed = false'
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
    
    clear();

    setState('get files');
  }

  const onNavbarItem = item => {
    console.log(item);

    setActiveNavbarItem(item);

    setSpreadsheet(null);

    setState('spreadsheets');
  }

  const onSpreadsheet = (spreadsheet, action) => {
    console.log(spreadsheet);

    setSpreadsheet(spreadsheet);

    setAction(action);

    setState('spreadsheetSelected');
  }

  const renderNotFound = props => {
    return (
      <main className="container">
          <div className="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
              <div className="lh-1">
                  <p className="lead my-3">Yhtään tiedostoa ei löytynyt.</p>                
                  <p className="lead my-3">Katso <a href="#" className="text-white fw-bold" onClick={() => setActiveNavbarItem('Ohje')}>Ohje</a> kuinka luoda uusi tiedosto.</p>
              </div>
          </div>
      </main>
    );
  }

  const renderMain = props => {      
      console.log('main ' + activeNavbarItem);  

      switch (activeNavbarItem) {
        case 'Spreadsheet':
        case 'Käyttöliittymä':
          if (state === 'not found') {
            return renderNotFound(props);
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
      return (
        <></>
      );
    case 'not found':      
    case 'spreadsheets':
      return (
        <>
          <Navbar items={navbarItems} active={activeNavbarItem} onItem={onNavbarItem} onSignOut={props.onSignOut} />   
          { renderMain(props) }
        </>
      );
    case 'spreadsheetSelected':
      return (
        <>
          <Navbar items={navbarItems} active={activeNavbarItem} onItem={onNavbarItem} onSignOut={props.onSignOut} />   
          <Breadcrumb activeNavbarItem={activeNavbarItem} spreadsheet={ spreadsheet } onBack={() => setState('spreadsheets')} />
          <Spreadsheet activeNavbarItem={activeNavbarItem} spreadsheet={ spreadsheet } action={action} onTokenExpired={ props.onTokenExpired } />
        </>
      );
    case 'token expired':
      return (
        <>
          <Navbar items={[]} />
          <TokenExpired />
        </>
      );
    default:
      return (
        <></>
      );
  }
}

export default OffCanvas;
