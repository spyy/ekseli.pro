
function NavBar(props) {
    
    return (
        <div className="container">
            <div className="nav-scroller py-1 mb-2">
                <nav className="nav d-flex justify-content-center">
                { 
                    props.spreadsheets.map(element => { 
                        return (<a className="p-2 link-secondary" href="#">{ element.name }</a>)
                    }) 
                }
                </nav>
            </div>            
        </div>
    );
  }
  
  
  export default NavBar;