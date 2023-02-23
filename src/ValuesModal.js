import React, { useEffect, useRef } from 'react';

const ValuesModal = props => {
  const modalRef = useRef();

  const nameRef = useRef();
  const inputModeRef = useRef();

  const columnARef = useRef();
  const columnBRef = useRef();
  const columnCRef = useRef();
  const columnDRef = useRef();
  const columnERef = useRef();
  const columnFRef = useRef();
  const columnGRef = useRef();

  useEffect(() => {
      console.log('props.show: ' + props.state);

      switch (props.state) {               
          case 'showModal':
              showModal();
              break;               
          case 'hideModal':
              hideModal()
              break;
          default:
              break;
      }
  },[props.state]);
    
  const showModal = () => {
      const modalEle = modalRef.current
      const bsModal = new window.bootstrap.Modal(modalEle, {
          backdrop: 'static',
          keyboard: false
      })
      bsModal.show()
  }
  
  const hideModal = () => {
      const modalEle = modalRef.current
      const bsModal= window.bootstrap.Modal.getInstance(modalEle)
      bsModal.hide()
  }

  const onSave = () => {
    const row = [
        columnARef?.current ? columnARef.current.value : '',
        columnBRef?.current ? columnBRef.current.value : '',
        columnCRef?.current ? columnCRef?.current.value : '',
        columnDRef?.current ? columnDRef?.current.value : '',
        columnERef?.current ? columnERef?.current.value : '',
        columnFRef?.current ? columnFRef?.current.value : ''
    ];  

    console.log(row);    
  }

  const renderColumnA = props => {
    const defaultValue = props.row.at(0) ? props.row[0] : '';

    return (
        <div className="form-floating my-3">
            <input type="text" className="form-control" placeholder={props.columns['A'].name} ref={columnARef} defaultValue={defaultValue} />
            <label>{props.columns['A'].name}</label>
        </div>
    );
  }

  const renderColumn = (props, column, cell, ref) => {
    const defaultValue = props.row.at(cell) ? props.row[cell] : '';

    if (props.columnCount > cell) {
        return (
            <div className="form-floating my-3">
                <input type="text" className="form-control" placeholder={column.name} ref={ref} defaultValue={defaultValue} />
                <label>{column.name}</label>
            </div>
        );        
    } else {
        return null;
    }
  }

  const renderBody = props => {
    if (props.state == 'showModal') {
        return (
            <div className="modal-body">
                { renderColumn(props, props.columns['A'], 0, columnARef) }
                { renderColumn(props, props.columns['B'], 1, columnBRef) }
                { renderColumn(props, props.columns['C'], 2, columnCRef) }
                { renderColumn(props, props.columns['D'], 3, columnDRef) }
            </div>          
        );
    } else {
        return (
            <div className="modal-body">
            </div>          
        );
    }
}
  
  return (
    <div className="modal fade" ref={modalRef} tabIndex="-1" >
      <div className="modal-dialog">
          <div className="modal-content">
          <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">{ 'Rivi: ' + (props.rowIndex + 1) }</h5>
              <button type="button" className="btn-close" onClick={() => props.onCancel()} aria-label="Close"></button>
          </div>
          { renderBody(props) }
          <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" onClick={() => props.onCancel()}>Peru</button>
              <button type="button" className="btn btn-outline-primary" onClick={() => onSave()}>OK</button>
          </div>
        </div>
          
      </div>
  </div>
  );
}



export default ValuesModal;