

const Instructions = props => {

    return (
        <main className="container">
            <div className="p-4 p-md-5 mb-4 rounded text-bg-warning">
                <div className="px-0">
                    <h4 className="display-4 fst-italic">Sinulla ei ole yhtään tai sinulle ei ole jaettu yhtään Google Sheet tiedostoa.</h4>
                    <p className="lead my-3">Käy luomassa tiedosto Google Drive:ssa. <a href="https://drive.google.com/drive/" target="_blank" className="text-white fw-bold">Google Drive</a></p>
                </div>
            </div>
        </main>
    );
  }
  
  
  export default Instructions;