

const Content = props => {

    const renderSpreadsheetOpen = element => {
        if (element.ownedByMe) {
            return (
                <div>
                    <div className="float-end">
                        <a href="#" className="icon-link text-decoration-none" onClick={ () => props.onSpreadsheet(element, '') }>
                        Muokkaa <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                        </svg>
                        </a>                                                            
                    </div>
                </div>                
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
        console.log(props.activeNavbarItem);
        if (props.activeNavbarItem === 'Spreadsheet') {
            return (            
                <div className="col p-4 d-flex flex-column position-static">
                    <strong className="d-inline-block mb-2 text-success">Spreadsheet tiedosto</strong>
                    <h3 className="mb-0">{ element.name }</h3>
                    <div className="mb-1 text-muted">{ element.modifiedTime }</div>
                    <div className="mb-1 text-muted">Viimeksi muokannut { element.lastModifyingUser.displayName }</div>
                    <p></p>                    
                    <div>
                        <div className="float-start">
                            <a href="#" className="icon-link text-decoration-none" onClick={ () => props.onSpreadsheet(element, 'search') }>
                            Katsele <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                            </a>                            
                        </div>
                        <div className="float-end">
                            <a href="#" className="icon-link text-decoration-none" onClick={ () => props.onSpreadsheet(element, 'add') }>
                            Lisää rivi <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
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
