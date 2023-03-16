import Instructions from './Instructions';


const Content = props => {

    const renderMetadataOpen = element => {
        if (element.ownedByMe) {
            return (
                <a href="#" className="stretched-link" onClick={ () => props.onSpreadsheet(element) }>Avaa</a>
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

    const renderFile = element => {        
        if (props.activeNavbarItem === 'Google Sheets') {
            return (            
                <div className="col p-4 d-flex flex-column position-static">
                    <strong className="d-inline-block mb-2 text-success">Google Sheet</strong>
                    <h3 className="mb-0">{ element.name }</h3>
                    <div className="mb-1 text-muted">{ element.modifiedTime }</div>
                    <div className="mb-1 text-muted">Viimeksi muokannut { element.lastModifyingUser.displayName }</div>
                    <p className="card-text mb-4">Tiedoston seliteteksti.</p>
                    { renderSpreadsheetOpen(element) }
                </div>                
            );
        } else {
            return (            
                <div className="col p-4 d-flex flex-column position-static">
                    <strong className="d-inline-block mb-2 text-primary">Käyttöliittymä konfiguraatio</strong>
                    <h3 className="mb-0">{ element.name }</h3>
                    { renderOwned(element) }
                    <p className="card-text mb-4">Tiedoston seliteteksti.</p>
                    { renderSpreadsheetOpen(element) }
                </div>                
            );
        }    
    }

    const renderColumn = element => {        
        if (element) {
            return (            
                <div className="col-md-6">
                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        { renderFile(element) }        
                    </div>
                </div>                
            );
        } else {
            return (            
                <div className="col-md-6">
                </div>            
            );
        }    
    }

    const renderRow = (row, index) => {
        return (
            <div key={ parseInt(index) } className="row">
                { renderColumn(row.firstColumn) }
                { renderColumn(row.secondColumn) }
            </div>
        );
    }

    const renderSpreadsheets = props => {
        let rows = [];
        let n = 0;

        while (n < props.spreadsheets.length) {
            rows.push({
                firstColumn: props.spreadsheets.at(n),
                secondColumn: props.spreadsheets.at(n + 1)
            });

            n = n + 2;
        }        

        return rows.map((element, index) => { 
            return renderRow(element, index);
        });
    }
    
    return (
        <main className="container"> 
            <div className="mt-4" />
            { renderSpreadsheets(props) }                  
        </main>
    );
  }
  
  
  export default Content;
