
const Introduction = props => {

    return (
        <main className="container">
      
            <div className="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
                <div className="lh-1">
                    <h2 className="display-4 fst-italic">Google Sheets tiedostosi mobiilisti</h2>
                </div>
            </div>
    
            <div className="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
                <div className="lh-1">
                    <p className="lead my-3">Ekseli Pro on vapaasti käytettävä ohjelma, joka hyödyntää Googlen tarjoamaa ilmaista Drive palvelua.</p>
                    <p className="lead my-3">Voit laittaa levyn nurkallasi olevat Excel tiedostosi Googlen pilveen ja käyttää niitä mobiilisti.</p>
                    <p className="lead my-3">Voit myös säätää jokaiselle tiedostolle omanlaisensa käyttöliittymän.</p>
                    <p className="lead my-3">Tällä hetkellä voit säätää kenttien määrän, niiden nimet ja minkälaista syötettä ne ottavat vastaan.</p>
                    <p className="lead my-3">Ohjelma tarvitsee Google Drive käyttöoikeuden. <a href="https://www.google.com/drive/" target="_blank" className="text-white fw-bold">Google Drive</a></p>
                </div>
            </div>
    
            <div className="my-3 p-3 bg-body rounded shadow-sm">
                <h6 className="border-bottom pb-2 mb-0">Viimeisimmät päivitykset</h6>
                <div className="d-flex text-muted pt-3">
                    <svg className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#e83e8c"></rect><text x="50%" y="50%" fill="#e83e8c" dy=".3em">32x32</text></svg>
                    <p className="pb-3 mb-0 small lh-sm border-bottom">
                    <strong className="d-block text-gray-dark">sami.pyy@gmail.com</strong>
                    Halutessasi voin lisätä sinut testaajaksi.
                    </p>
                </div>
                <div className="d-flex text-muted pt-3">
                    <svg className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
                    <p className="pb-3 mb-0 small lh-sm border-bottom">
                    <strong className="d-block text-gray-dark">sami.pyy@gmail.com</strong>
                    Palvelu on testikäytössä.
                    </p>
                </div>
            </div>
    
            <div className="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
                <img className="me-3" src="bootstrap-logo-white.svg" alt="" width="48" height="38" />
                <div className="lh-1">
                    <h1 className="h6 mb-0 text-white lh-1">Ekseli Pro</h1>
                    <small>2023 -</small>
                </div>
            </div>
  
        </main>
    );
  }
  
  
  export default Introduction;