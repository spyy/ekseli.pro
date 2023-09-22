import React, { useState } from 'react';

import SpreadsheetModal from './SpreadsheetModal';

import * as utils from './utils';

const Instructions = props => {
    const [state, setState] = useState('instructions');

    const onSave = title => {
        const body = {
            properties: {
                title: title
            }
        };
        const path = 'https://sheets.googleapis.com/v4/spreadsheets/';
        const args = {
          'path': path,
          'method': 'POST',
          'body': body
        };

        window.gapi.client.request(args)
          .then(res => console.log(res))
          .catch(err => console.log(err))

        setState('hideModal');
    }

    return (
        <main className="container">

            <div className="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
                <div className="lh-1">
                    <p className="lead my-3">1. Kirjaudu sisään Google tunnuksilla.</p>
                    <p className="lead my-3">2. Käyttöliittymä listaa sovelluksella luodut Google Sheets tiedostot.</p>
                    <p className="lead my-3">3. Jos tiedosto on omistuksessasi, voit konfiguroida sen käyttöliittymää.</p>
                </div>
            </div>
      
            <div className="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
                <div className="lh-1">
                    <p className="lead my-3">Jos listaus tiedostoistasi on tyhjä, voit tästä luoda uuden Spreadsheet tiedoston Google Drive palveluun.</p>
                    <button className="btn btn-success btn-lg float-end" type="button" onClick={() => setState('showModal')}>Uusi tiedosto</button>
                </div>                
            </div>

            <SpreadsheetModal state={ state } onCancel={() => setState('hideModal')} onSave={onSave} />
     
        </main>
    );
}
  
  
  export default Instructions;