import React, { useEffect, useState } from 'react';

import Metadata from './Metadata';


const Main = props => {
    const [state, setState] = useState('spreadsheet');
    const [spreadsheet, setSpreadsheet] = useState(props.spreadsheet);
    
  
    useEffect(() => {
        console.log('state: ' + state);
    
        switch (state) {               
            case 'spreadsheet':
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

    const onSpreadsheet = element => {
        console.log(spreadsheet);

        setState('spreadsheetSelected');

        setSpreadsheet(element);
    }


    const renderMain = props => {
        return (
            <main className="container">                  
                { props.firstSelection == 'metadataSelected' ? <Metadata spreadsheet={ spreadsheet } /> : <Metadata spreadsheet={ spreadsheet } /> }
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDisabled" disabled />
                    <label className="form-check-label">Ensimmäinen rivi määrittää sarakkeet</label>
                </div>
            </main>
        );
    }    

    switch (state) {
        case 'spreadsheet':
            return renderMain(props);
        case 'spreadsheetSelected':
            return (<></>);
        case 'spreadsheetChanged':
            return renderMain(props);
        default:
            return (<></>);
    }
}


export default Main;