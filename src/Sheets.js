
const Sheets = props => {
    const renderTab = (element, index) => {
        if (element.properties.index == props.selected) {
            return (
                <a href="#" key={ parseInt(index) } className="p-2 link-primary" onClick={() => console.log('click')}>{ element.properties.title }</a>
            );
        } else {
            return (
                <a href="#" key={ parseInt(index) } className="p-2 link-secondary" onClick={() => props.onSheet(element)}>{ element.properties.title }</a>
            );
        }
    }
    
    return (
        <div className="nav-scroller py-1 mb-2">
            <nav className="nav d-flex justify-content-center">
            { 
                props.spreadsheet.sheets.map((element, index) => { 
                    return renderTab(element, index);
                }) 
            }
            </nav>
        </div>            
    );
  }
  
  
  export default Sheets;