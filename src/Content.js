

const Content = props => {

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
                    <strong className="d-inline-block mb-2 text-success">Google Spreadsheet</strong>
                    <h3 className="mb-0">{ element.name }</h3>
                    <div className="mb-1 text-muted">{ element.modifiedTime }</div>
                    <div className="mb-1 text-muted">Viimeksi muokannut { element.lastModifyingUser.displayName }</div>
                    <p></p>                    
                    <div>
                        <div className="float-start">
                            <a href="#" className="icon-link text-decoration-none" onClick={ () => props.onSpreadsheet(element) }>
                            Haku <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                            </a>                            
                        </div>
                        <div className="float-end">
                            <a href="#" className="icon-link text-decoration-none" onClick={ () => props.onSpreadsheet(element) }>
                            Lisää rivi <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                            </svg>
                            </a>                                                            
                        </div>
                    </div>                                                                
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
