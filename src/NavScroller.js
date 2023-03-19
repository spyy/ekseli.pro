
const NavScroller = props => {
    const renderTab = (element, index) => {
        console.log(element.id);
        console.log(props.selected);
        if (element.id == props.selected.id) {
            return (
                <a key={ parseInt(index) } className="p-2 link-secondary">{ element.name }</a>
            );
        } else {
            return (
                <a href="#" key={ parseInt(index) } className="p-2 link-primary" onClick={() => props.onSpreadsheet(element)}>{ element.name }</a>
            );
        }
    }

    return (
        <div className="nav-scroller py-1 mb-2">
            <nav className="nav d-flex justify-content-center">
            {
                props.spreadsheets.map((element, index) => {
                    return renderTab(element, index);
                })
            }
            </nav>
        </div>
    );
}


export default NavScroller;