

function Introduction(props) {

    return (
        <main className="container">
            <div className="p-4 p-md-5 mb-4 rounded text-bg-info">
                <div className="col-md-6 px-0">
                    <h1 className="display-4 fst-italic">Käytä Excel tiedostojasi pilvessä.</h1>
                    <p className="lead my-3">Ekseli on vapaasti käytettävä ohjelma, joka hyödyntää Googlen tarjoamaa ilmaista Drive palvelua.</p>
                    <p className="lead my-3">Ekseli tarjoaa sinulle mobiili käyttöliittymän Spreadsheet (Excel) tiedostoihisi Googlen Drive palvelussa.</p>
                    <p className="lead my-3">Ekseli kautta voit myös itse säätää käyttöliittymän halutun laiseksi.</p>
                    <p className="lead my-3">Ohjelma tarvitsee Google Drive käyttöoikeuden. <a href="https://www.google.com/drive/" className="text-white fw-bold">Google Drive</a></p>
                    <p className="lead my-3">1. Kirjaudu sisään Google tunnuksilla.</p>
                    <p className="lead my-3">2. Luo Drive hakemistoon uusi Spreadsheet (Excel).</p>
                </div>
            </div>
            <div className="p-4 p-md-5 mb-4 rounded text-bg-warning">
                <div className="col-md-6 px-0">
                    <h3 className="fst-italic">Palvelu on testikäytössä.</h3>
                    <p className="lead my-3">Voit halutessasi ilmoittautua testi käyttäjäksi.<a href="sami.pyy@gmail.com" className="text-white fw-bold">sami.pyy@gmail.com</a></p>
                </div>
            </div>
        </main>
    );
  }
  
  
  export default Introduction;