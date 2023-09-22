import React, { useState, useEffect } from 'react';

import Spreadsheet from './Spreadsheet';
import Content from './Content';
import Instructions from './Instructions';


const Spreadsheets = props => {
  const [state, setState] = useState('spreadsheets');
  const [spreadsheet, setSpreadsheet] = useState(null);

  useEffect(() => {
    console.log('state: ' + state);

    switch (state) {
      case 'spreadsheets':
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

  const onSpreadsheet = spreadsheet => {
    console.log(spreadsheet);
    
    setSpreadsheet(spreadsheet);
  }

  const onTokenExpired = () => {
    console.log('onTokenExpired');
  }

  const renderSpreadsheets = props => {
    if (spreadsheet) {
      return (
        <Spreadsheet activeNavbarItem={props.activeNavbarItem} spreadsheet={ spreadsheet } onTokenExpired={ onTokenExpired } />
      );
    } else {
      return (
        <Content 
          activeNavbarItem={props.activeNavbarItem}
          spreadsheets={props.spreadsheets} 
          onSpreadsheet={onSpreadsheet} />
      );
    }
  }

  switch (props.activeNavbarItem) {    
    case 'Ohje':
      return (
        <Instructions onRefresh={props.onRefresh} />
      );
    default:
      return (renderSpreadsheets(props));
  }
}

export default Spreadsheets;
