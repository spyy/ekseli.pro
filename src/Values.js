import React, { useEffect, useState } from 'react';

import sheetDefault from './config/sheet.json'

import ValuesModal from './ValuesModal';

import * as utils from './utils';



const Values = props => {
    const [state, setState] = useState('getDeveloperMetadata');
    const [metadata, setMetadata] = useState({});
    const [selectedRow, setSelectedRow] = useState({});
    const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
    const [rows, setRows] = useState([]);

    const [appendRange, setAppendRange] = useState('');
    const [appendValues, setAppendValues] = useState([]);
  
  
    useEffect(() => {
        console.log('state: ' + state);
    
        switch (state) {               
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
                setState('getValues');
                break;
            case 'getValues':
                getValues();
                break;
            case 'values':
                break;
            case 'update':
                setState('hideModal');
                break;
            case 'append':
                append();
                setState('hideModal');
                break;
            case 'appendAgain':
                append();
                break;
            case 'showModal':
            case 'hideModal':
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
        const metadataId = props.sheet.properties.sheetId + 1;
        const path = 'https://sheets.googleapis.com/v4/spreadsheets/' + props.spreadsheetId + '/developerMetadata/' + metadataId;
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

    const handleGetValuesResponse = values => {
        //console.log(body);

        setRows(values);

        setState('values');
    }

    const handleGetValuesError = err => {
        console.log(err);

        if (err?.status === 401) {
            props.onTokenExpired();
        } else {
            setRows([]);
            setState('values');
        }
    }

    const getValues = () => {    
        const range = props.sheet.properties.title;
        const path = 'https://sheets.googleapis.com/v4/spreadsheets/' + props.spreadsheetId + '/values/' + range;
        const args = {
          'path': path
        };

        console.log(path);
        
        window.gapi.client.request(args)
          .then(utils.parseResult)
          .then(utils.parseValues)
          .then(handleGetValuesResponse)
          .catch(handleGetValuesError)
    }

    const handleUpdateValuesResponse = (body, values, row) => {
        console.log(body);

        let temp = rows;

        temp[row - 1] = values;

        setRows(temp);

        setState('values');
    }

    const updateValues = (values, row) => {   
        const range = props.sheet.properties.title + '!' + row + ':' + row;     
        const path = 'https://sheets.googleapis.com/v4/spreadsheets/' + props.spreadsheetId + '/values/' + range;
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
          .then(utils.parseResult)
          .then(body => handleUpdateValuesResponse(body, values, row))
          .catch(err => utils.handleUnauthorized(err, props.onTokenExpired))
    }

    const updateIfNeeded = range => {
        if (range.original === range.converted) {
            setState('getValues');
        } else {
            setAppendRange(range.converted);

            setState('appendAgain');
        }
    }

    const append = () => {       
        const path = 'https://sheets.googleapis.com/v4/spreadsheets/' + props.spreadsheetId + '/values/' + appendRange + ':append';
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

    const onHideModal = () => {
        console.log('onHideModal');
    
        setState('hideModal');
    }

    const onEdit = (element, index)  => {
        console.log(element);   
        
        setSelectedRow(element);
        setSelectedRowIndex(index);

        setState('showModal');
    }

    const onSaveRow = (rowValues, rowNumber) => {
        console.log(rowValues);
        console.log(rowNumber);

        if (rowNumber) {
            updateValues(rowValues, rowNumber);

            setState('update');
        } else {
            setAppendRange(props.sheet.properties.title);
            setAppendValues(rowValues);
            setState('append');
        }
    }

    const onAdd = () => {
        setSelectedRow([]);
        setSelectedRowIndex(-1);       
        
        setState('showModal');
    }

    const renderColumn = (element, index) => {      
        return (
            <th key={ index } scope="col">{ element.name }</th>
        );
    }

    const renderHead = props => {
        let columns = [];       

        for (const [key, value] of Object.entries(metadata.columns)) {
            columns.push(value);
        };

        const slice = columns.slice(0, metadata.columnCount);

        return (   
            <thead>        
                <tr>
                    <th scope="col">#</th>
                    { slice.map((element, index) => renderColumn(element, index)) }
                </tr>
            </thead>
        );
    }

    const renderCell = (element, index) => {      
        return (
            <td key={ index }>{ element }</td>
        );
    }

    const renderRow = (element, index) => {   
        const emptyRow = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];  
        const slice = element.slice(0, metadata.columnCount);
        const concat = slice.concat(emptyRow);
        const newSlice = concat.slice(0, metadata.columnCount);



        return (
          <tr key={ index }>
            <th scope="row"><a className="d-inline-block" href='#' onClick={() => onEdit(element, index)}>{ index + 1 }</a></th>
            { 
                newSlice.map((element, index) => {
                    return renderCell(element, index);
                }) 
            }            
          </tr>
        );
      }
  
      const renderBody = props => {
          return (            
              <tbody>
              {
                rows.map((element, index) => {
                  return renderRow(element, index);
                })
              }
            </tbody>
          );
      }

    const render = props => {
        return (
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-striped caption-top my-4">
                        { renderHead(props) }
                        { renderBody(props) }
                    </table>
                </div>

                <div className="d-grid d-md-flex justify-content-md-end">                    
                    <button className="btn btn-outline-primary btn-lg" type="button" onClick={onAdd}>Lisää rivi</button>
                </div>

                <ValuesModal state={ state } rowData={ selectedRow } rowNumber={selectedRowIndex + 1} columns={metadata.columns} columnCount={metadata.columnCount} onCancel={onHideModal} onSave={onSaveRow} />
            </div>
        );      
    }

    switch (state) {
        case 'values':
        case 'append':
        case 'appendAgain':
        case 'update':
        case 'showModal':
        case 'hideModal':
            return render(props);
        default:
            return (<></>);
    }
}


export default Values;