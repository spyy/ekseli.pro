import React, { useEffect, useState } from 'react';

import Sheets from './Sheets';
import Sheet from './Sheet';
import Row from './Row';


const Spreadsheet = props => {
    const [state, setState] = useState('getSpreadsheet');
    const [spreadsheet, setSpreadsheet] = useState('');
    const [sheet, setSheet] = useState(0);
    const [row, setRow] = useState([]);
    const [rowIndex, setRowIndex] = useState(-1);

  
    useEffect(() => {
        console.log('state: ' + state);
    
        switch (state) {               
            case 'getSpreadsheet':
                getSpreadsheet();
                break;               
            case 'spreadsheet':
                break;
            case 'sheetSelected':
                setState('sheetChanged');
                break;
            case 'sheetChanged':
                break;
            case 'rowSelected':
                break;
            case 'updateValues':
                updateValues();
                break;
            case 'updateSheet':
                setState('spreadsheet');
                break;
            default:
                break;
        }
    },[state]);

    const parseJson = res => {
        //console.log(res); 
        
        return JSON.parse(res.body);
    }

    const handleUpdateValuesResponse = body => {
        console.log(body);

        setState('updateSheet');
    }

    const handleGetSpreadsheetResponse = body => {
        console.log(body);

        setSpreadsheet(body);

        setState('spreadsheet');
    }

    const updateValues = (values, range) => {        
        
        const path = 'https://sheets.googleapis.com/v4/spreadsheets/' + props.spreadsheet.id + '/values/' + range;
        const args = {
          'path': path,
          'method': 'PUT',
          'params': {
            'valueInputOption': 'RAW'
          },
          'body': {
            'values': [values]
          }
        };

        console.log(path);
        
        window.gapi.client.request(args)
          .then(parseJson)
          .then(handleUpdateValuesResponse)
          .catch(err => console.log(err))
    }

    const getSpreadsheet = () => {
        const path = 'https://sheets.googleapis.com/v4/spreadsheets/' + props.spreadsheet.id;
        const args = {
          'path': path,
          'params': {
            'fields': 'sheets.properties,spreadsheetId'
          }
        };

        console.log(path);
        
        window.gapi.client.request(args)
          .then(parseJson)
          .then(handleGetSpreadsheetResponse)
          .catch(err => console.log(err))
    }

    const onSheet = sheet => {
        console.log(sheet);
    
        setState('sheetSelected'); 
        
        setSheet(sheet.properties.index);
    }

    const onCancel = () => {
        console.log('onCancel');

        setState('spreadsheet');
    }

    const onSave = (values, index) => {
        const range = spreadsheet.sheets[sheet].properties.title + '!' + parseInt(index + 1) + ':' + parseInt(index + 1);

        console.log('onSave');
        console.log(range);
        
        updateValues(values, range);
    }

    const onRowSelected = (element, index)  => {
        console.log('onRowSelected');
        console.log(index);
        console.log(element);

        setRow(element);

        setRowIndex(index);

        setState('rowSelected');
    }

    const renderSheet = props => {
        return (
            <main className="container">    
                <Sheets spreadsheet={ spreadsheet } selected={ sheet } onSheet={onSheet} />
                <Sheet spreadsheet={ spreadsheet } selected={ sheet } onRowSelected={onRowSelected} />
            </main>
        );    
    }

    const renderTabs = props => {
        return (
            <main className="container">    
                <Sheets spreadsheet={ spreadsheet } selected={ sheet } onSheet={onSheet} />
            </main>
        );    
    }

    const renderRow = props => {
        return (
            <main className="container">    
                <Sheets spreadsheet={ spreadsheet } selected={ sheet } onSheet={onSheet} />
                <Row columnCount={ 9 } row={ row } index={ rowIndex } onSave={onSave} onCancel={onCancel} />
            </main>
        );    
    }

    switch (state) {
        case 'updateSheet':
            return renderTabs(props);
        case 'getSpreadsheet':
            return (<></>);
        case 'spreadsheet':
            return renderSheet(props);
        case 'sheetSelected':
            return renderTabs(props);
        case 'sheetChanged':
            return renderSheet(props);
        case 'rowSelected':
            return renderRow(props);
        default:
            return (<></>);
    }
}


export default Spreadsheet;