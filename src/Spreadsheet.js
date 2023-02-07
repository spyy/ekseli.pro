import React, { useEffect, useState } from 'react';

import Sheets from './Sheets';
import Sheet from './Sheet';


const Spreadsheet = props => {
    const [state, setState] = useState('getSpreadsheet');
    const [spreadsheet, setSpreadsheet] = useState('');
    const [sheet, setSheet] = useState(0);

  
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
            default:
                break;
        }
    },[state]);

    const parseJson = res => {
        //console.log(res); 
        
        return JSON.parse(res.body);
    }

    const handleResponse = body => {
        console.log(body);

        setSpreadsheet(body);

        setState('spreadsheet');
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
          .then(handleResponse)
          .then(setState('ready'))
          .catch(err => console.log(err))
    }

    const onSheet = sheet => {
        console.log(sheet);
    
        setState('sheetSelected'); 
        
        setSheet(sheet.properties.index);
    }

    const renderSheet = props => {
        return (
            <main className="container">    
                <Sheets spreadsheet={ spreadsheet } selected={ sheet } onSheet={sheet => onSheet(sheet)} />
                <Sheet spreadsheet={ spreadsheet } selected={ sheet } />
            </main>
        );    
    }

    const renderTabs = props => {
        return (
            <main className="container">    
                <Sheets spreadsheet={ spreadsheet } selected={ sheet } onSheet={sheet => onSheet(sheet)} />
            </main>
        );    
    }

    switch (state) {
        case 'getSpreadsheet':
            return (<></>);
        case 'spreadsheet':
            return renderSheet(props);
        case 'sheetSelected':
            return renderTabs(props);
        case 'sheetChanged':
            return renderSheet(props);
        default:
            return (<></>);
    }
}


export default Spreadsheet;