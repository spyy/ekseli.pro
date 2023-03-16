
const Nav = props => {
    const onClick = () => {
        console.log('onClick');

        document.querySelector('.offcanvas-collapse').classList.toggle('open');
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
                    <a className="nav-link" href="#" onClick={() => props.onNavItem(element)}>{element}</a>
                </li>
            );
        }
    }

    const renderButton = props => {
        
    }
    
    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark" aria-label="Main navigation">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Ekseli Pro</a>
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
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                </div>
            </div>
        </nav>
    );
}


export default Nav;

