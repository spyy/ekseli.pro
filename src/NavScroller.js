
const NavScroller = props => {
    const onClick = () => {
        console.log('onClick');

    }

    const renderItem = (element, index) => {
        if (props.active === element) {
            return (
                <a key={index} className="nav-link active" aria-current="page" href="#">{element.name}</a>
            );
        } else {
            return (
                <a key={index} className="nav-link" href="#">{element.name}</a>
            );
        }
    }

    const renderNotSelected = props => {
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
