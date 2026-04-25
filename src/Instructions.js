import React, { useState } from 'react';

import SpreadsheetModal from './SpreadsheetModal';

import * as api from './api';


const Instructions = props => {
    const [state, setState] = useState('instructions');

    const handleResponse = result => {
        console.log(result);

        props.onRefresh();
    }

    const onSave = title => {
        api.createSpreadsheet(props.token, title, handleResponse, err => console.log(err));
        
        setState('hideModal');
    }

    return (
        <main className="container">

            <div className="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
                <div className="lh-1">
                    <p className="lead my-3">1. Kirjaudu sisään Google tunnuksilla.</p>
                    <p className="lead my-3">2. Käyttöliittymä listaa sovelluksella luodut Spreadsheet tiedostot.</p>
                    <p className="lead my-3">3. Jos tiedosto on omistuksessasi, voit konfiguroida sen käyttöliittymää.</p>
                </div>
            </div>

            <div className="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
                <div className="lh-1">
                    <p className="lead my-3">Ohjelma tarvitsee seuraavat <a href="https://www.google.com/drive/" target="_blank" className="text-white fw-bold">Google Drive</a> käyttöoikeudet.</p>
                    <p className="lead my-3">- Katsoa, muokata, luoda ja poistaa omia Spreadsheet tiedostoja.</p>
                </div>
            </div>
      
            <div className="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
                <div className="lh-1">
                    <p className="lead my-3">Tästä voit luoda uuden Spreadsheet tiedoston Google Drive palveluun.</p>
                    <p className="lead my-3">Luotu tiedosto on tyhjä, joten voit tarvittaessa kopioida siihen sisällön Excel tiedostosta.</p>
                    <button className="btn btn-success btn-lg float-end" type="button" onClick={() => setState('showModal')}>Uusi tiedosto</button>
                </div>                
            </div>

            <SpreadsheetModal state={ state } onCancel={() => setState('hideModal')} onSave={onSave} />
     
        </main>
    );
}
  
  
  export default Instructions;