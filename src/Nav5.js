import React, { useState } from 'react';


const Nav = props => {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => {
        console.log('handleNavCollapse');
        setIsNavCollapsed(!isNavCollapsed);
    } 

    const onClick = () => {
        console.log('onClick');
    }
    
    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark" aria-label="Main navigation">
            <div className="container-fluid">
            <a className="navbar-brand" href="#">Ekseli Pro</a>
            
            <button className="navbar-toggler p-0 border-0" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                <span className="navbar-toggler-icon"></span>
            </button>
    
            <div className={isNavCollapsed ? 'navbar-collapse offcanvas-collapse collapse' : 'navbar-collapse offcanvas-collapse open'} id="navbarsExample09">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Esittely</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Google Sheets</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Käyttöliittymä</a>
                    </li>                    
                </ul>
                <form className="d-flex">            
                    <button className="btn btn-outline-success" type="button" onClick={onClick}>Kirjaudu sisään</button>
                </form>
            </div>
            </div>
        </nav>
    );
}


export default Nav;

