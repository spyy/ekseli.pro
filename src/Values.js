import React, { useEffect, useState } from 'react';

import sheetDefault from './config/sheet.json'

import ValuesModal from './ValuesModal';



const Values = props => {
    const [state, setState] = useState('getDeveloperMetadata');
    const [metadata, setMetadata] = useState({});
    const [row, setRow] = useState({});
    const [rowIndex, setRowIndex] = useState(-1);
    const [values, setValues] = useState([]);

  
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
            case 'showModal':
            case 'hideModal':
                break;            
            default:
                break;
        }
    },[state]);

    const parseBody = res => {
        console.log(res); 
        
        return JSON.parse(res.body);
    }

    const parsemetadataValue = res => {
        //console.log(res); 
        
        return JSON.parse(res?.metadataValue);
    }

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

        setState('metadataNotFound');
    }

    const getDeveloperMetadata = () => {
        const metadataId = props.sheet.properties.sheetId + 1;
        const path = 'https://sheets.googleapis.com/v4/spreadsheets/' + props.spreadsheetId + '/developerMetadata/' + metadataId;
        const args = {
          'path': path
        };

        console.log(path);
        
        window.gapi.client.request(args)
          .then(parseBody)
          .then(parsemetadataValue)
          .then(handleDeveloperMetadataResponse)
          .catch(handleErrorResponse)
    }

    const handleGetValuesResponse = body => {
        console.log(body);

        setValues(body.values);

        setState('values');
    }

    const handleGetValuesError = err => {
        console.log(err);

        setValues([]);

        setState('values');
    }

    const getValues = () => {    
        const range = props.sheet.properties.title;
        const path = 'https://sheets.googleapis.com/v4/spreadsheets/' + props.spreadsheetId + '/values/' + range;
        const args = {
          'path': path
        };

        console.log(path);
        
        window.gapi.client.request(args)
          .then(parseBody)
          .then(handleGetValuesResponse)
          .catch(handleGetValuesError)
    }

    const onHideModal = () => {
        console.log('onHideModal');
    
        setState('hideModal');
    }

    const onRowClicked = (element, index)  => {
        console.log(element);   
        
        setRow(element);
        setRowIndex(index);

        setState('showModal');
    }

    const onSaveRow = (element, index) => {
        console.log(element);
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
            <th scope="row"><a className="d-inline-block" href='#' onClick={() => onRowClicked(element, index)}>{ index + 1 }</a></th>
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
                values.map((element, index) => {
                  return renderRow(element, index);
                })
              }
            </tbody>
          );
      }

    const render = props => {
        return (
            <div className="card-body">
                <table className="table table-striped caption-top my-4">
                    { renderHead(props) }
                    { renderBody(props) }
                </table>

                <ValuesModal state={ state } row={ row } rowIndex={rowIndex} columns={metadata.columns} columnCount={metadata.columnCount} onCancel={onHideModal} onSave={onSaveRow} />
            </div>
        );      
    }

    switch (state) {
        case 'values':
        case 'showModal':
        case 'hideModal':
            return render(props);
        default:
            return (<></>);
    }
}


export default Values;