
const NavScroller = props => {
    const onClick = () => {
        console.log('onClick');

    }

    const renderItem = (element, index) => {
        if (props.spreadsheet.name === element.name) {
            return (
                <a key={index} className="nav-link active" aria-current="page" href="#">{element.name}</a>
            );
        } else {
            return (
                <a key={index} className="nav-link" href="#" onClick={() => props.onItem(element)}>{element.name}</a>
            );
        }
    }

    const renderNotSelected = props => {
        console.log(props.spreadsheet);

        if (props.spreadsheet) {
            return null;
        } else {
            return (
                <a className="nav-link active" href="#">{props.activeNavbarItem}</a>
            );
        }
    }
    
    return (
        <div className="nav-scroller bg-body shadow-sm">
            <nav className="nav" aria-label="Secondary navigation">    
                { renderNotSelected(props) }                            
                {
                    props.spreadsheets.map((element, index) => renderItem(element, index))
                }
            </nav>
        </div>
    );
}


export default NavScroller;
