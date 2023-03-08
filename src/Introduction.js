

function Introduction(props) {

    return (
        <main className="container">
            <div className="p-4 p-md-5 mb-4 rounded text-bg-secondary">
                <div className="col-12 px-0">
                    <h2 className="display-4 fst-italic">Google Sheets tiedostosi mobiilisti.</h2>
                    <p className="lead my-3">Ekseli Pro on vapaasti käytettävä ohjelma, joka hyödyntää Googlen tarjoamaa ilmaista Drive palvelua.</p>
                    <p className="lead my-3">Voit laittaa levyn nurkallasi olevat Excel tiedostosi Googlen pilveen ja käyttää niitä mobiilisti.</p>
                    <p className="lead my-3">Voit myös säätää käyttöliittymän halutunlaiseksi.</p>
                    <p className="lead my-3">Tällä hetkellä voit säätää kenttien määrän, niiden nimet ja minkälaista syötettä ne ottavat vastaan.</p>
                    <p className="lead my-3">Ohjelma tarvitsee Google Drive käyttöoikeuden. <a href="https://www.google.com/drive/" className="text-white fw-bold">Google Drive</a></p>
                    <p className="lead my-3">1. Kirjaudu sisään Google tunnuksilla.</p>
                    <p className="lead my-3">2. Käyttöliittymä listaa Google Sheets tiedostosi.</p>
                    <p className="lead my-3">3. Jos kyseinen tiedosto on omistuksessasi, sinulla on myös mahdollisuus konfiguroida käyttöliittymää.</p>
                </div>
            </div>
            <div className="p-4 p-md-5 mb-4 rounded text-bg-warning">
                <div className="col-12 px-0">
                    <h4 className="display-4 fst-italic">Palvelu on testikäytössä.</h4>
                    <p className="lead my-3">Voit halutessasi ilmoittautua testi käyttäjäksi.<a href="mailto:sami.pyy@gmail.com" className="text-white fw-bold">sami.pyy@gmail.com</a></p>
                </div>
            </div>
        </main>
    );
  }
  
  
  export default Introduction;