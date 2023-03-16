import React from 'react';


class Nav extends React.Component {
    constructor(props) {
      super(props);
    }
  
    componentDidMount() {
        console.log('componentDidMount');
        document.querySelector('#navbarSideCollapse').addEventListener('click', () => {
            console.log('click');
            document.querySelector('.offcanvas-collapse').classList.toggle('open');
            this.forceUpdate();
        });
    }

    componentWillUnmount() {        
    }

    onClick() {
        console.log('onClick');
    }
    
    render() {
        return (
            <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark" aria-label="Main navigation">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Offcanvas navbar</a>
                    <button className="navbar-toggler p-0 border-0" type="button" id="navbarSideCollapse" aria-expanded="true" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Dashboard</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link" href="#">Notifications</a>
                            </li>                        
                        </ul>
                        <form className="d-flex" role="search">
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        );    
    }
}

export default Nav;