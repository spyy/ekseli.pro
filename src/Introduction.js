

function Introduction(props) {

    return (
        <main className="container">
            <div className="p-4 p-md-5 mb-4 rounded text-bg-dark">
                <div className="col-md-6 px-0">
                    <h1 className="display-4 fst-italic">Käytä Excel tiedostojasi pilvessä.</h1>
                    <p className="lead my-3">Ekseli on vapaasti käytettävä ohjelma, joka hyödyntää ilmaista Google Drive palvelua.</p>
                    <p className="lead my-3">Ohjelma tarvitsee Google Drive käyttöoikeuden. <a href="https://www.google.com/drive/" className="text-white fw-bold">Google Drive</a></p>
                    <p className="lead my-3">1. Kirjaudu sisään Google tunnuksilla.</p>
                </div>
            </div>
        </main>
    );
  }
  
  
  export default Introduction;