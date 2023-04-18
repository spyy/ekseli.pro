
const Homepage = () => {
    return (
        <>
            <header className="mb-auto">
                <div>
                    <h3 className="float-md-start mb-0">Ekseli Pro</h3>
                    <nav className="nav nav-masthead justify-content-center float-md-end">
                    <a className="nav-link fw-bold py-1 px-0 active" aria-current="page" href="#">Etusivu</a>
                    <a className="nav-link fw-bold py-1 px-0" href="#">Ominaisuudet</a>
                    <a className="nav-link fw-bold py-1 px-0" href="#">Kehittäjät</a>
                    </nav>
                </div>
            </header>
    
            <main className="px-3">
                <h1>Excelisi mobiilisti</h1>
                <p className="lead my-3">
                    Ekseli Pro on vapaasti käytettävä ohjelma, joka hyödyntää ilmaista <a href="https://www.google.com/drive/" target="_blank" className="text-white fw-bold">Google Drive</a> palvelua. 
                    Voit laittaa levyn nurkallasi olevat Excel tiedostosi Googlen pilveen ja säätää niille omanlaisensa käyttöliittymän. 
                </p>
                <p className="lead my-3">
                    <a href="#" className="btn btn-lg btn-dark fw-bold border-dark bg-dark">Kokeile veloituksetta</a>
                </p>
            </main>
    
            <footer className="mt-auto text-white-50">
                <p>Avoin lähdekoodi <a href="https://github.com/spyy/ekseli" className="text-white">GitHub</a>.</p>
            </footer>
        </>
    );
  }
  
  
  export default Homepage;