import React from 'react';

import appConfig from './config/app.json';


class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.tokenClient = null;
        this.state = {
            loggedin: false
        };
    }

    componentDidMount() {
        this.tokenClient = window.google.accounts.oauth2.initTokenClient({
            client_id: appConfig.client_id,
            scope: appConfig.scope,
            callback: this.handleTokenResponse
        });        
      }
    
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    handleTokenResponse = tokenResponse => {
        console.log(tokenResponse);
    
        if (tokenResponse && tokenResponse.access_token) {    
            this.setState({
                loggedin: true
            });

            this.props.onLogin();
        }
    }

    onSignIn = () => {
        if (window.gapi.client.getToken() === null) {
            this.tokenClient.requestAccessToken({prompt: 'consent'});
        } else {
            this.tokenClient.requestAccessToken({prompt: ''});
        }

        document.querySelector('.offcanvas-collapse').classList.toggle('open');
    }

    onSignOut = () => {
        this.setState({
            loggedin: false
        });

        this.props.onLogout();

        document.querySelector('.offcanvas-collapse').classList.toggle('open');
    }

    onClick = () => {
        console.log('onClick');

        document.querySelector('.offcanvas-collapse').classList.toggle('open');
    }

    onItem = element => {
        console.log('onClick');        

        this.props.onItem(element);

        document.querySelector('.offcanvas-collapse').classList.toggle('open');
    }

    renderItem = (element, index) => {
        if (this.props.active === element) {
            return (
                <li className="nav-item" key={index}>
                    <a className="nav-link active" aria-current="page" href="#">{element}</a>
                </li>
            );
        } else {
            return (
                <li className="nav-item" key={index}>
                    <a className="nav-link" href="#" onClick={() => this.onItem(element)}>{element}</a>
                </li>
            );
        }
    }

    renderButton = () => {
        if (this.state.loggedin) {
            return (            
                <button className="btn btn-outline-success" type="button" onClick={this.onSignOut}>Kirjaudu ulos</button>
            );
        } else {
            return (
                <button className="btn btn-outline-success" type="button" onClick={this.onSignIn}>Kirjaudu sisään</button>
            );           
        }
    }
  
    render() {
        return (
            <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark" aria-label="Main navigation">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Ekseli Pro</a>
                    <button className="navbar-toggler p-0 border-0" type="button" aria-label="Toggle navigation" onClick={this.onClick}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
    
                    <div className="navbar-collapse offcanvas-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {
                                this.props.items.map((element, index) => this.renderItem(element, index))
                            }
                        </ul>
                        <form className="d-flex">
                            {this.renderButton()}
                        </form>
                    </div>
                </div>
            </nav>
        );
    }
}


export default Navbar;
