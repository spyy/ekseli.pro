import Instructions from './Instructions';


const Content = props => {

    const renderMetadataOpen = element => {
        if (element.ownedByMe) {
            return (
                <a href="#" className="stretched-link" onClick={ () => props.onMetadata(element) }>Avaa</a>
            );
        } else {
            return null;
        }
    }

    const renderSpreadsheetOpen = element => {
        if (element.ownedByMe) {
            return (
                <a href="#" className="stretched-link" onClick={ () => props.onSpreadsheet(element) }>Avaa</a>
            );
        } else {
            return null;
        }
    }

    const renderOwned = element => {
        if (element.ownedByMe) {
            return (
                <div className="mb-1 text-muted">Omistuksessasi: Kyllä</div>
            );
        } else {
            return (
                <div className="mb-1 text-muted">Omistuksessasi: Ei</div>
            );
        }
    }

    const renderRow = (element, index) => {
        return (
            <div key={ parseInt(index) } className="row mb-2">
                <div className="col-md-6">
                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div className="col p-4 d-flex flex-column position-static">
                            <strong className="d-inline-block mb-2 text-primary">Käyttöliittymä</strong>
                            <h3 className="mb-0">{ element.name }</h3>
                            { renderOwned(element) }
                            <p className="card-text mb-auto">Voit konfiguroida omistamasi tiedoston käyttöliittymän.</p>
                            { renderMetadataOpen(element) }
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div className="col p-4 d-flex flex-column position-static">
                            <strong className="d-inline-block mb-2 text-success">Google Sheet</strong>
                            <h3 className="mb-0">{ element.name }</h3>
                            <div className="mb-1 text-muted">Viimeksi muokannut: { element.modifiedByMeTime }</div>
                            <p className="mb-auto">Voit muokata omistamiasi ja sinulle jaettuja tiedostoja.</p>
                            { renderSpreadsheetOpen(element) }
                        </div>          
                    </div>
                </div>                
            </div>
        );
    }

    const renderSpreadsheets = props => {
        return props.spreadsheets.map((element, index) => { 
            return renderRow(element, index);
        });
    }

    const renderInstructions = props => {
        return (
            <Instructions />
        );
    }
    
    return (
        <main className="container">            
            { props.spreadsheets.length ? renderSpreadsheets(props) : renderInstructions(props) }
        </main>
    );
  }
  
  
  export default Content;
