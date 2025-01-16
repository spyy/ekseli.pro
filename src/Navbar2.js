import React from 'react';


const Navbar = props => {

    const renderRoot = props => {
        if (props.root && props.file) {
            return (
                <li className="breadcrumb-item">
                    <a className="link-body-emphasis fw-semibold text-decoration-none" href="#" onClick={ () => props.onBack() }>{ props.root }</a>
                </li>
            );
        } else if (props.root) {
            return (
                <li className="breadcrumb-item active" aria-current="page">
                    { props.root }
                </li>
            );
        } else {
            return null;
        }
    }

    const renderFile = props => {
        if (props.file) {
            return (
                <li className="breadcrumb-item active" aria-current="page">
                    { props.file }
                </li>
            );
        } else {
            return null;
        }
    }

    return (
        <nav className="navbar-dark bg-dark" aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-chevron p-2">            
                { renderRoot(props) }
                { renderFile(props) }
            </ol>
        </nav>
    );
}


export default Navbar;
