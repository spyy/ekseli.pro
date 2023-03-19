import React, { useState, useEffect } from 'react';

import Header from './Header';
import Introduction from './Introduction';
import Instructions from './Instructions';
import NavScroller from './NavScroller';
import Spreadsheet from './Spreadsheet';
import Content from './Content';

import * as utils from './utils';


const OffCanvas = props => {
  const [state, setState] = useState('introduction');
  const [spreadsheet, setSpreadsheet] = useState(null);
  const [spreadsheets, setSpreadsheets] = useState([]);

  useEffect(() => {
    console.log('state: ' + state);

    switch (state) {
      case 'introduction':
        break;
      case 'get files':
        getFiles();
        break;
      case 'spreadsheets':
        if (spreadsheets.length) {
          setState('content');
        } else {
          setState('instructions');
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

    setSpreadsheets([]);

    setSpreadsheet(null);

  }

  const onLogin = () => {
    console.log('onLogin');

    setState('get files');
  }

  const onLogout = () => {
    console.log('onLogout');

    clear();

    setState('introduction');
  }

  const onBack = event => {
    setState('content');
  }

  const onSpreadsheet = spreadsheet => {
    console.log(spreadsheet);

    setState('spreadsheetSelected');

    setSpreadsheet(spreadsheet);
  }


  const renderMain = props => {
    switch (state) {
      case 'introduction':
        return (<Introduction />);
      case 'instructions':
        return (<Instructions />);
      case 'content':
        return (
          <Content
            spreadsheets={ filteredSheets() }
            onSpreadsheet={ onSpreadsheet } />
        );
      case 'spreadsheetSelected':
        return (<></>);
      case 'spreadsheetChanged':
        return (
          <Spreadsheet spreadsheet={ spreadsheet } />
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
            <NavScroller spreadsheets={ filteredSheets() } selected={ spreadsheet } onSpreadsheet={ onSpreadsheet } />
        );
      default:
          return null;
    }
  }

  return (
    <>
      <div className="container">
        <Header onLogin={ onLogin } onLogout={ onLogout } onBack={ onBack } />
        { renderNav(props) }
      </div>

      { renderMain(props) }

      <footer className="my-5 pt-5 text-muted text-center text-small">
        <p className="mb-1">© 2023- ekseli.pro</p>
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
