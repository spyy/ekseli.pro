

const Instructions = props => {

    return (
        <main className="container">

            <div className="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
                <div className="lh-1">
                    <p className="lead my-3">1. Kirjaudu sisään Google tunnuksilla.</p>
                    <p className="lead my-3">2. Käyttöliittymä listaa omistamasi tai sinulle jaetut Google Sheets tiedostot.</p>
                    <p className="lead my-3">3. Jos tiedosto on omistuksessasi, voit konfiguroida sen käyttöliittymää.</p>
                </div>
            </div>
      
            <div className="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
                <div className="lh-1">
                    <p className="lead my-3">Jos listaus tiedostoistasi on tyhjä, voit käydä luomassa tiedoston Google Drive:ssa.</p>
                    <p className="lead my-3">Klikkaa linkkiä joka avaa Google Drive:n uuteen välilehteen. <a href="https://drive.google.com/drive/" target="_blank" className="text-white fw-bold">Google Drive</a></p>
                </div>
            </div>
     
        </main>
    );
}
  
  
  export default Instructions;