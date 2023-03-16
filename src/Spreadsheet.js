import React, { useEffect, useState } from 'react';

import Sheets from './Sheets';
import Metadata from './Metadata';
import Values from './Values';


const Spreadsheet = props => {
    const [state, setState] = useState('getSpreadsheet');
    const [spreadsheet, setSpreadsheet] = useState('');
    const [selectedSheet, setSelectedSheet] = useState(0);
    
  
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

    const handleGetSpreadsheetResponse = body => {
        console.log(body);

        setSpreadsheet(body);

        setState('spreadsheet');
    }

    const getSpreadsheet = () => {
        const path = 'https://sheets.googleapis.com/v4/spreadsheets/' + props.spreadsheet.id;
        const args = {
          'path': path,
          'params': {
            'fields': 'sheets.properties,spreadsheetId,properties.title'
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
        
        setSelectedSheet(sheet.properties.index);
    }

    const render = props => {
        if (props.activeNavbarItem === 'Käyttöliittymä') {
            return (
                <main className="container">                  
                    <div className="card border-light">
                        <Metadata spreadsheetId={ spreadsheet.spreadsheetId } sheetId={ spreadsheet.sheets[selectedSheet].properties.sheetId } />
                    </div>
                    <div className="form-check form-switch my-4">
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDisabled" disabled />
                        <label className="form-check-label">Ensimmäinen rivi määrittää sarakkeiden nimet ja määrän</label>
                    </div>
                </main>                
            );   
        } else {
            return (
                <main className="container">                  
                    <div className="card border-light">
                        <Values spreadsheetId={ spreadsheet.spreadsheetId } sheet={ spreadsheet.sheets[selectedSheet] } />
                    </div>
                </main>                
            );
        }
    }

    switch (state) {
        case 'updateSheet':
            return render(props);
        case 'getSpreadsheet':
            return (<></>);
        case 'spreadsheet':
            return render(props);
        case 'sheetSelected':
            return (<></>);
        case 'sheetChanged':
            return render(props);
        default:
            return (<></>);
    }
}


export default Spreadsheet;