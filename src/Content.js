
function Content(props) {
    const renderRow = element => {
        return (
            <div className="row mb-2">
                <div className="col-md-6">
                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col p-4 d-flex flex-column position-static">
                        <strong className="d-inline-block mb-2 text-primary">Configuration</strong>
                        <h3 className="mb-0">{ element.name }</h3>
                        <div className="mb-1 text-muted">Päivitetty</div>
                        <p className="card-text mb-auto">Tarvitset erillesen salasanan konfiguraation avaukseen.</p>
                        <a href="#" className="stretched-link">Avaa</a>
                    </div>

                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col p-4 d-flex flex-column position-static">
                        <strong className="d-inline-block mb-2 text-success">Spreadsheet</strong>
                        <h3 className="mb-0">{ element.name }</h3>
                        <div className="mb-1 text-muted">Käyttöönotettu</div>
                        <p className="mb-auto">Tiedoston seliteteksti tähän.</p>
                        <a href="#" className="stretched-link">Avaa</a>
                    </div>          
                    </div>
                </div>                
            </div>
        );
    }
        
    
    return (
        <main className="container">            
            { 
                props.configs.map(element => { 
                    return renderRow(element);
                }) 
            }
        </main>
    );
  }
  
  
  export default Content;
