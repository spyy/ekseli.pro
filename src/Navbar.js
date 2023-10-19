import React from 'react';


const Navbar = props => {

    const onSignIn = () => {
        document.querySelector('.offcanvas-collapse').classList.toggle('open');

        props.onSignIn();
    }

    const onSignOut = () => {
        document.querySelector('.offcanvas-collapse').classList.toggle('open');

        props.onSignOut();
    }

    const onClick = () => {
        console.log('onClick');

        document.querySelector('.offcanvas-collapse').classList.toggle('open');
    }

    const onItem = element => {
        document.querySelector('.offcanvas-collapse').classList.toggle('open');

        props.onItem(element);
    }

    const renderItem = (element, index) => {
        if (props.active === element) {
            return (
                <li className="nav-item" key={index}>
                    <a className="nav-link active" aria-current="page" href="#">{element}</a>
                </li>
            );
        } else {
            return (
                <li className="nav-item" key={index}>
                    <a className="nav-link" href="#" onClick={() => onItem(element)}>{element}</a>
                </li>
            );
        }
    }

    const renderGoogleButton = props => {
        const style = {
            display: 'none'            
        };
        if (props.onSignIn) {
            return (
                <button className="gsi-material-button">
                    <div className="gsi-material-button-state"></div>
                    <div className="gsi-material-button-content-wrapper">
                        <div className="gsi-material-button-icon">
                            <img src="google.svg" alt="" />
                        </div>
                        <span className="gsi-material-button-contents">Kirjaudu sisään</span>
                        <span style={style}>Kirjaudu sisään</span>
                    </div>
                </button>
            );
        } else {
            return null;
        }        
    }

    const renderLoginButton = props => {
        if (props.onSignIn) {
            return (
                <button className="btn btn-outline-success" type="button" onClick={onSignIn}>Kirjaudu sisään</button>
            );
        } else {
            return null;
        }        
    }

    const renderLogoutButton = props => {
        if (props.onSignOut) {
            return (
                <button className="btn btn-outline-success" type="button" onClick={onSignOut}>Kirjaudu ulos</button>
            );
        } else {
            return null;
        }        
    }
  
    
    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark" aria-label="Main navigation">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">ekseli.pro</a>
                <button className="navbar-toggler p-0 border-0" type="button" aria-label="Toggle navigation" onClick={onClick}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="navbar-collapse offcanvas-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {
                            props.items.map((element, index) => renderItem(element, index))
                        }
                    </ul>
                    <form className="d-flex">                        
                    </form>
                </div>
            </div>
        </nav>
    );
}


export default Navbar;
