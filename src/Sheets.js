
const Sheets = props => {
    const renderItem = (element, index) => {
        if (element.properties.index === props.selected) {
            return (
                <li className="nav-item" key={ parseInt(index) }>
                    <a className="nav-link active" aria-current="true">{ element.properties.title }</a>
                </li>
            );
        } else {
            return (
                <li className="nav-item" key={ parseInt(index) }>
                    <a className="nav-link" href="#" onClick={() => props.onSheet(element)}>{ element.properties.title }</a>
                </li>
            );
        }
    }
    
    return (
        <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
                { 
                    props.spreadsheet.sheets.map((element, index) => { 
                        return renderItem(element, index);
                    }) 
                }
            </ul>
        </div>
    );
  }
  
  
  export default Sheets;