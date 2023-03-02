import React from 'react';

import appConfig from './config/app.json';



class Header extends React.Component {
    constructor(props) {
        super(props);
        this.tokenClient = null;
        this.state = {
            loggedIn: false
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
            window.gapi.client.setApiKey(appConfig.apiKey);
    
            this.setState({
                loggedIn: true
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
    }

    onSignOut = () => {
        this.setState({
            loggedIn: false
        });

        this.props.onLogout();
    }

    renderLoggedin = () => {
        return (
            <header className="blog-header lh-1 py-3">
                <div className="row flex-nowrap justify-content-between align-items-center">
                    <div className="col-4 pt-1">
                        <a className="link-primary" href="#" onClick={() => this.props.onBack()}>Alkuun</a>
                    </div>
                    <div className="col-4 text-center">
                        <a className="blog-header-logo text-dark" href="#">Ekseli Pro</a>
                    </div>
                    <div className="col-4 d-flex justify-content-end align-items-center">
                        <a className="btn btn-sm btn-outline-secondary" href="#" onClick={this.onSignOut}>Ulos</a>   
                    </div>        
                </div>
            </header>
        );
    }

    renderLoggedout = () => {
        return (
            <header className="blog-header lh-1 py-3">
                <div className="row flex-nowrap justify-content-between align-items-center">
                    <div className="col-4 pt-1">
                    </div>
                    <div className="col-4 text-center">
                        <a className="blog-header-logo text-dark" href="#">Ekseli Pro</a>
                    </div>
                    <div className="col-4 d-flex justify-content-end align-items-center">
                        <a className="btn btn-sm btn-outline-secondary" href="#" onClick={this.onSignIn}>Kirjaudu</a>
                    </div>        
                </div>
            </header>
        );
    }
  
    render() {
        return this.state.loggedIn ? this.renderLoggedin() : this.renderLoggedout();
    }
}


export default Header;
