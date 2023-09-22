

const EmptyContent = props => {

    return (
        <main className="container">
      
            <div className="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
                <div className="lh-1">
                    <p className="lead my-3">Jos listaus tiedostoistasi on tyhjä, voit käydä luomassa tiedoston Google Drive:ssa.</p>
                    <p className="lead my-3">Klikkaa linkkiä joka avaa Google Drive:n uuteen välilehteen. <a href="https://drive.google.com/drive/" target="_blank" className="text-white fw-bold">Google Drive</a></p>
                    <p className="lead my-3">Kun olet käynyt lisäämässä uuden tiedoston, klikkaa alla olevaa päivitä nappia.</p>                    
                    <button className="btn btn-success btn-lg float-end" type="button" onClick={() => props.onRefresh()}>Päivitä</button>
                </div>
            </div>
     
        </main>
    );
}
  
  
  export default EmptyContent;