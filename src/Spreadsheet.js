import React, { useEffect, useState } from 'react';

import Sheets from './Sheets';
import Metadata from './Metadata';
import Values from './Values';
import AddRow from './AddRow';

import sheetDefault from './config/sheet.json'

import * as utils from './utils';


const Spreadsheet = props => {
    const [state, setState] = useState('getSpreadsheet');
    const [spreadsheet, setSpreadsheet] = useState({});
    const [metadata, setMetadata] = useState({});
    const [selectedSheet, setSelectedSheet] = useState(0);
    const [appendRange, setAppendRange] = useState('');
    const [appendValues, setAppendValues] = useState([]);
    const [action, setAction] = useState(props.action);
    
  
    useEffect(() => {
        console.log('state: ' + state);
    
        switch (state) {            
            case 'getSpreadsheet':
                getSpreadsheet();
                break;               
            case 'spreadsheet':
                setState('getDeveloperMetadata');
                break;
            case 'getDeveloperMetadata':
                getDeveloperMetadata();
                break;               
            case 'metadataNotFound':
                setMetadata(sheetDefault);
                setState('metadata');
                break;
            case 'metadataFound':
                setState('metadata');
                break;
            case 'metadata':
                break;
            case 'append':
                append();
                break;
            case 'appendAgain':
                append();
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

    const handleDeveloperMetadataResponse = metadataValue => {
        console.log('handleResponse');

        switch (typeof(metadataValue)){
            case 'object':
                setMetadata(metadataValue);
                break;
            default:
                console.log(typeof(metadataValue));
        }

        setState('metadataFound');
    }

    const handleErrorResponse = err => {
        console.log(err);

        if (err?.status === 401) {
            props.onTokenExpired();
        } else {
            setState('metadataNotFound');
        }
    }

    const getDeveloperMetadata = () => {
        const metadataId = spreadsheet.sheets[selectedSheet].properties.sheetId + 1;
        const path = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheet.spreadsheetId + '/developerMetadata/' + metadataId;
        const args = {
          'path': path
        };

        console.log(path);
        
        window.gapi.client.request(args)
          .then(utils.parseBody)
          .then(utils.parsemetadataValue)
          .then(handleDeveloperMetadataResponse)
          .catch(handleErrorResponse)
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
          .then(utils.parseJson)
          .then(handleGetSpreadsheetResponse)
          .catch(err => utils.handleUnauthorized(err, props.onTokenExpired))
    }

    const updateIfNeeded = range => {
        if (range.original === range.converted) {
            setAction('search');
            setState('metadata');
        } else {
            setAppendRange(range.converted);

            setState('appendAgain');
        }
    }

    const append = () => {       
        const path = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheet.spreadsheetId + '/values/' + appendRange + ':append';
        const args = {
          'path': path,
          'method': 'POST',
          'params': {
            'valueInputOption': 'RAW'
          },
          'body': {
            'values': [appendValues]
          }
        };

        console.log(path);
        
        window.gapi.client.request(args)
          .then(utils.parseResult)
          .then(utils.parseUpdates)
          .then(utils.parseUpdatedRange)
          .then(utils.parseA1Notation)
          .then(utils.convertA1Notation)
          .then(updateIfNeeded)
          .catch(err => utils.handleUnauthorized(err, props.onTokenExpired))
    }

    const onSheet = sheet => {
        console.log(sheet);
    
        setState('sheetSelected'); 
        
        setSelectedSheet(sheet.properties.index);
    }

    const onAdd = values => {
        console.log('onAdd');

        setAppendRange(spreadsheet.sheets[selectedSheet].properties.title);
        
        setAppendValues(values);
        
        setState('append');
    }

    const renderSearchOrAdd = props => {
        if (action === 'add') {
            return (
                <AddRow metadata={ metadata } onAdd={ onAdd } />                
            );   
        } else {
            return (
                <Values spreadsheetId={ spreadsheet.spreadsheetId } sheet={ spreadsheet.sheets[selectedSheet] } metadata={ metadata } onTokenExpired={ props.onTokenExpired } />                
            );
        }        
    }        

    const render = props => {
        if (props.activeNavbarItem === 'Käyttöliittymä') {
            return (
                <main className="container">                  
                    <div className="card border-light">
                        <Sheets spreadsheet={ spreadsheet } selected={ selectedSheet } onSheet={onSheet} />
                        <Metadata spreadsheetId={ spreadsheet.spreadsheetId } sheetId={ spreadsheet.sheets[selectedSheet].properties.sheetId } metadata={ metadata } onTokenExpired={ props.onTokenExpired } />
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
                        <Sheets spreadsheet={ spreadsheet } selected={ selectedSheet } onSheet={onSheet} />
                        { renderSearchOrAdd(props) }
                    </div>
                </main>                
            );
        }
    }

    switch (state) {
        case 'getSpreadsheet':            
        case 'spreadsheet':
        case 'getDeveloperMetadata':
        case 'metadataNotFound':
        case 'metadataFound':
        case 'append':
        case 'appendAgain':
            return (<></>);
        case 'metadata':        
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