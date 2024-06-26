
const Introduction = props => {

    const renderGoogleButton = props => {
        const style = {
            display: 'none'            
        };
        if (props.onSignIn) {
            return (
                <button className="gsi-material-button" onClick={() => props.onSignIn()}>
                    <div className="gsi-material-button-state"></div>
                    <div className="gsi-material-button-content-wrapper">
                        <div className="gsi-material-button-icon">
                            <img src="google.svg" alt="" />
                        </div>
                        <span className="gsi-material-button-contents">Kirjaudu sisään</span>
                        <span style={style}>Kirjaudu sisään</span>
                    </div>
                </button>
            );
        } else {
            return null;
        }        
    }

    const renderUpdate = update => {
        return (                       
            <div className="d-flex text-muted pt-3">
                <svg className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill={update.color}></rect><text x="50%" y="50%" fill={update.color} dy=".3em">32x32</text></svg>                    
                <p className="pb-3 mb-0 small lh-sm border-bottom">                    
                <strong className="d-block text-gray-dark">{update.author}</strong>
                { update.description }
                </p>                    
            </div>                
        );
    }     

    return (
        <main className="container">
      
            <div className="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
                <div className="lh-1">
                    <h2 className="display-4 fst-italic">Excel tiedostosi mobiilisti</h2>
                </div>
            </div>
    
            <div className="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
                <div className="lh-1">
                    <p className="lead my-3">1. Kirjaudu sisään.</p>
                    <p className="lead my-3">2. Luo ohjelman kautta uusi Spreadsheet (Excel) tiedosto.</p>
                    <p className="lead my-3">3. Säädä ohjelman kautta tiedostolle haluamasi käyttöliittymä (syötekentät).</p>
                </div>
            </div>

            <div className="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
                <div className="lh-1">
                    <p className="lead my-3">Ohjelma hyödyntää ilmaista <a href="https://www.google.com/drive/" target="_blank" className="text-white fw-bold">Google Drive</a> palvelua.</p>
                    <p className="lead my-3 mt-4">{ renderGoogleButton(props) }</p>
                </div>
            </div>

            <div className="my-3 p-3 bg-body rounded shadow-sm">
                <h6 className="border-bottom pb-2 mb-0">Viimeisimmät päivitykset</h6>  
                <div className="d-flex text-muted pt-3">
                    <svg className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#e83e8c"></rect><text x="50%" y="50%" fill={"#e83e8c"} dy=".3em">32x32</text></svg>                    
                    <p className="pb-3 mb-0 small lh-sm border-bottom">                    
                    <strong className="d-block text-gray-dark">sami.pyy@gmail.com</strong>
                    (07.12.2023) Versio 1.1.
                    </p>                    
                </div>                                                             
                <div className="d-flex text-muted pt-3">
                    <svg className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#e83e8c"></rect><text x="50%" y="50%" fill={"#e83e8c"} dy=".3em">32x32</text></svg>                    
                    <p className="pb-3 mb-0 small lh-sm border-bottom">                    
                    <strong className="d-block text-gray-dark">sami.pyy@gmail.com</strong>
                    (22.11.2023) Versio 1.0.
                    </p>                    
                </div>                                                             
            </div>
    
            <div className="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
                <img className="me-3" src="explicit.svg" alt="" width="48" height="38" />
                <div className="lh-1">
                    <h1 className="h6 mb-0 text-white lh-1">ekseli.pro</h1>
                    <small>2023 -</small>
                </div>
            </div>
  
        </main>
    );
  }
  
  
  export default Introduction;