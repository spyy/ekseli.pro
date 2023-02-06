
function NavBar(props) {
    const renderTab = (element, index) => {
        if (element.name == props.selected.name) {
            return (
                <a key={ parseInt(index) } className="p-2 link-primary" onClick={() => console.log('click')}>{ element.name }</a>
            );
        } else {
            return (
                <a key={ parseInt(index) } className="p-2 link-secondary" onClick={() => props.onSpreadsheet(element)}>{ element.name }</a>
            );
        }
    }
    
    return (
        <div className="container">
            <div className="nav-scroller py-1 mb-2">
                <nav className="nav d-flex justify-content-center">
                { 
                    props.spreadsheets.map((element, index) => { 
                        return renderTab(element, index);
                    }) 
                }
                </nav>
            </div>            
        </div>
    );
  }
  
  
  export default NavBar;