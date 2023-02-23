import React, { useEffect, useState } from 'react';

import sheetDefault from './config/sheet.json'

import MetadataModal from './MetadataModal';



const Metadata = props => {
    const [state, setState] = useState('getDeveloperMetadata');
    const [metadata, setMetadata] = useState({});
    const [metadataChanged, setMetadataChanged] = useState(false);
    const [metadataFound, setMetadataFound] = useState(false);
    const [columnCount, setColumnCount] = useState(0);
    const [row, setRow] = useState({});
    const [rowKey, setRowKey] = useState('');

  
    useEffect(() => {
        console.log('state: ' + state);
    
        switch (state) {               
            case 'getDeveloperMetadata':
                getDeveloperMetadata();
                break;               
            case 'metadataNotFound':
                setMetadata(sheetDefault);
                setColumnCount(sheetDefault.columnCount);
                setState('metadata');
                break;
            case 'metadataFound':
                setMetadataFound(true);
                setColumnCount(metadata.columnCount);
                setState('metadata');
                break;
            case 'metadata':
                break;
            case 'metadataUpdated':         
                setMetadataFound(true);
                setMetadataChanged(false);
                setState('metadataChanged');
                break;
            case 'metadataChanged':         
            case 'showModal':
            case 'hideModal':
                break;            
            default:
                break;
        }
    },[state]);

    const parseBody = res => {
        //console.log(res); 
        
        return JSON.parse(res?.body);
    }

    const parsemetadataValue = res => {
        //console.log(res); 
        
        return JSON.parse(res?.metadataValue);
    }

    const handleResponse = metadataValue => {
        console.log('handleResponse');

        switch (typeof(metadataValue)){
            case 'object':
                setMetadata(metadataValue);
                setMetadataFound(true);
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
        const metadataId = props.sheetId + 1;
        const path = 'https://sheets.googleapis.com/v4/spreadsheets/' + props.spreadsheetId + '/developerMetadata/' + metadataId;
        const args = {
          'path': path
        };

        console.log(path);
        
        window.gapi.client.request(args)
          .then(parseBody)
          .then(parsemetadataValue)
          .then(handleResponse)
          .catch(handleErrorResponse)
    }

    const handleUpdateResponse = body => {
        console.log(body);

        setState('metadataUpdated');
    }

    const createDeveloperMetadata = () => {
        const path = 'https://sheets.googleapis.com/v4/spreadsheets/' + props.spreadsheetId + ':batchUpdate';
        const args = {
            path: path,
            method: 'POST',
            body: {
                requests: [{
                    createDeveloperMetadata: {
                        developerMetadata: {
                            metadataId: props.sheetId + 1,
                            metadataKey: 'configuration',
                            metadataValue: JSON.stringify(metadata),
                            visibility: 'DOCUMENT',
                            location: {
                                sheetId: props.sheetId
                            }
                        }
                    }
                }]
            }
        };

        console.log(path);
        console.log(args);
        
        window.gapi.client.request(args)
          .then(parseBody)
          .then(handleUpdateResponse)
          .catch(err => console.log(err))
    }

    const updateDeveloperMetadata = () => {
        const path = 'https://sheets.googleapis.com/v4/spreadsheets/' + props.spreadsheetId + ':batchUpdate';
        const args = {
            path: path,
            method: 'POST',
            body: {
                requests: [{
                    updateDeveloperMetadata: {
                        fields: '*',
                        dataFilters: [{
                            developerMetadataLookup: {
                                metadataId: props.sheetId + 1
                            }
                        }],
                        developerMetadata: {
                            metadataKey: 'configuration',
                            metadataValue: JSON.stringify(metadata),
                            location: {
                                sheetId: props.sheetId
                            },
                            visibility: 'DOCUMENT'
                        }
                    }
                }]
            }
        };

        console.log(path);
        console.log(args);
        
        window.gapi.client.request(args)
          .then(parseBody)
          .then(handleUpdateResponse)
          .catch(err => console.log(err))
    }

    const onSave = () => {
        if (metadataFound) {
            updateDeveloperMetadata();            
        } else {
            createDeveloperMetadata();
        }        
    }

    const onSaveColumn = (key, value) => {
        metadata.columns[key] = value;

        setMetadata(metadata);

        setMetadataChanged(true);

        setState('hideModal');
    }

    const onHideModal = () => {
        console.log('onHideModal');
    
        setState('hideModal');
    }

    const onRowClicked = (key, value)  => {
        console.log(key);
        console.log(value);   
        
        setRow(value);
        setRowKey(key);

        setState('showModal');
    }

    const onChange = event  => {
        metadata.columnCount = event.target.value;

        setMetadata(metadata);

        setMetadataChanged(true);  

        setColumnCount(event.target.value);
    }

    const renderHead = props => {
        return (    
            <thead>        
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nimi</th>
                    <th scope="col">Tyyppi</th>
                    <th scope="col">Pakollinen</th>
                    <th scope="col">Käytössä</th>
                    <th scope="col">Vain luku</th>
                    <th scope="col">Syöte</th>
                </tr>
            </thead>
        );
    }

    const renderRow = (key, value) => {      
        return (
          <tr key={ key }>
            <th scope="row"><a className="d-inline-block" href='#' onClick={ () => onRowClicked(key, value)}>{ key }</a></th>
            <td>{ value.name }</td>
            <td>{ value.type }</td>
            <td>{ value.required ? 'Kyllä' : 'Ei' }</td>
            <td>{ value.disabled ? 'Ei' : 'Kyllä' }</td>
            <td>{ value.readonly ? 'Kyllä' : 'Ei' }</td>
            <td>{ value.inputmode }</td>
          </tr>
        );
    }

    const renderBody = props => {
        let columns = [];       

        for (const [key, value] of Object.entries(metadata.columns)) {
            columns.push(renderRow(key, value));
        }

        return (            
            <tbody>
                { columns.slice(0, columnCount) }
            </tbody>
        );
    }

    const renderSave = props => {
        if ( metadataChanged ) {
            return ( <button className="btn btn-outline-primary btn-lg" type="button" onClick={onSave}>Talleta</button> );
        } else {
            return ( <button className="btn btn-outline-primary btn-lg" type="button" disabled>Talleta</button> );
        }
    }

    const render = props => {
        return (
            <div className="card-body">

                <table className="table table-striped caption-top my-4">
                    { renderHead(props) }
                    { renderBody(props) }
                </table>

                <div className="input-group my-4">
                    <label className="input-group-text">Sarakkeiden määrä</label>
                    <select className="form-select" value={ columnCount } onChange={onChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                    </select>
                </div>   

                <div className="d-grid d-md-flex justify-content-md-end">                    
                    { renderSave(props) }
                </div>

                <MetadataModal state={ state } column={ row } columnKey={rowKey} onCancel={onHideModal} onSave={onSaveColumn} />
                
            </div>
        );      
    }

    switch (state) {
        case 'metadata':
        case 'metadataUpdated':
        case 'metadataChanged':
        case 'showModal':
        case 'hideModal':
            return render(props);
        default:
            return (<></>);
    }
}


export default Metadata;