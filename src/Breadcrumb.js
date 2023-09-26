
const Breadcrumb = props => {    
    return (
        <nav className="mt-2" aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center">
                <li className="breadcrumb-item"><a href="#" onClick={ () => props.onBack() }>{ props.activeNavbarItem }</a></li>
                <li className="breadcrumb-item active" aria-current="page">{ props.spreadsheet.name }</li>
            </ol>
        </nav>
    );
}

export default Breadcrumb;
