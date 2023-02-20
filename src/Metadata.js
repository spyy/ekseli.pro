import React, { useEffect, useState, useRef } from 'react';

import sheetDefault from './config/sheet.json'
import alphabets from './config/alphabets.json'

import MetadataModal from './MetadataModal';

const jupi = {
	'columns': {
		'A': {
			'id': 'A',
			'name': 'A'
		},
		'B': {
			'id': 'B',
			'name': 'B'
		}
	}
}


const Metadata = props => {
    const [state, setState] = useState('getDeveloperMetadata');
    const [metadata, setMetadata] = useState(sheetDefault);
    const [columnCount, setColumnCount] = useState(sheetDefault.metadataValue);
    const [row, setRow] = useState('fff');
    const [rowIndex, setRowIndex] = useState(-1);

    const [show, setShow] = useState('hidden');

  
    useEffect(() => {
        console.log('state: ' + state);
    
        switch (state) {               
            case 'getDeveloperMetadata':
                getDeveloperMetadata();
                break;               
            case 'metadata':
                break;
            case 'sheetSelected':
                setState('sheetChanged');
                break;
            case 'sheetChanged':
                break;            
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
                break;
            default:
                console.log(typeof(metadataValue));
        }

        setState('metadata');
    }

    const handleErrorResponse = err => {
        console.log(err);

        setState('metadata');
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

    const onSave = () => {
        //const values = generateValues();
    
        props.onSave(metadata);
    }

    const onSaveColumn = column => {
        console.log(column);

        setState('hideModal');
    }

    const onHideModal = () => {
        console.log('onHideModal');
    
        setState('hideModal');
    }

    const onRowClicked2 = (element, index)  => {
        console.log(element);

        setRow(element);
        setRowIndex(index);

        setState('showModal');
    }

    const onRowClicked = (key, value)  => {
        console.log(key);
        console.log(value);   
        
        setRow(value);
        setRowIndex(key);

        setState('showModal');
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

    const renderRow2 = (element, index) => {      
        return (
            <tr key={ index }>
            <th scope="row"><a className="d-inline-block" href='#' onClick={ () => onRowClicked(element, index)}>{ alphabets[index] }</a></th>
            <td>{ element.name }</td>
            <td>{ element.type }</td>
            <td>{ element.required ? 'Kyllä' : 'Ei' }</td>
            <td>{ element.disabled ? 'Ei' : 'Kyllä' }</td>
            <td>{ element.readonly ? 'Kyllä' : 'Ei' }</td>
            <td>{ element.inputmode }</td>
            </tr>
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
                { columns }
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

                <div className="input-group my-4">
                    <label className="input-group-text">Sarakkeiden määrä</label>
                    <select className="form-select" value={ columnCount } onChange={event => setColumnCount(event.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </select>
                </div>   

                <div className="d-grid d-md-flex justify-content-md-end">                    
                    <button className="btn btn-outline-primary btn-lg" type="button" disabled>Talleta</button>
                </div>

                <MetadataModal state={ state } column={ row } columnKey={rowIndex} onCancel={onHideModal} onSave={onSaveColumn} />
                
            </div>
        );      
    }

    switch (state) {
        case 'updateSheet':
            return render(props);
        case 'getDeveloperMetadata':
            return (<></>);
        case 'metadata':
            return render(props);
        case 'sheetSelected':
            return (<></>);
        case 'sheetChanged':
        case 'showModal':
        case 'hideModal':
            return render(props);
        default:
            return (<></>);
    }
}


export default Metadata;