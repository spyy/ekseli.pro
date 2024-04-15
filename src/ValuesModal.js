import React, { useEffect, useRef } from 'react';

const ValuesModal = props => {
  const modalRef = useRef();

  const columnARef = useRef();
  const columnBRef = useRef();
  const columnCRef = useRef();
  const columnDRef = useRef();
  const columnERef = useRef();
  const columnFRef = useRef();
  const columnGRef = useRef();
  const columnHRef = useRef();
  const columnIRef = useRef();
  const columnJRef = useRef();
  const columnKRef = useRef();
  const columnLRef = useRef();
  const columnMRef = useRef();
  const columnNRef = useRef();
  const columnORef = useRef();
  const columnPRef = useRef();
  const columnQRef = useRef();
  const columnRRef = useRef();
  const columnSRef = useRef();
  const columnTRef = useRef();
  const columnURef = useRef();
  const columnVRef = useRef();
  const columnWRef = useRef();
  const columnXRef = useRef();
  const columnYRef = useRef();
  const columnZRef = useRef();

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
      const modalEle = modalRef.current;
      const bsModal = new window.bootstrap.Modal(modalEle, {
          backdrop: 'static',
          keyboard: false
      });

      bsModal.show();
  }
  
  const hideModal = () => {
      const modalEle = modalRef.current;
      const bsModal = window.bootstrap.Modal.getInstance(modalEle);
      
      bsModal.hide();
  }

  const onSave = () => {
    const row = [
        columnARef?.current ? columnARef.current.value : '',
        columnBRef?.current ? columnBRef.current.value : '',
        columnCRef?.current ? columnCRef?.current.value : '',
        columnDRef?.current ? columnDRef?.current.value : '',
        columnERef?.current ? columnERef?.current.value : '',
        columnFRef?.current ? columnFRef?.current.value : '',
        columnGRef?.current ? columnGRef?.current.value : '',
        columnHRef?.current ? columnHRef?.current.value : '',
        columnIRef?.current ? columnIRef?.current.value : '',
        columnJRef?.current ? columnJRef?.current.value : '',
        columnKRef?.current ? columnKRef?.current.value : '',
        columnLRef?.current ? columnLRef?.current.value : '',
        columnMRef?.current ? columnMRef?.current.value : '',
        columnNRef?.current ? columnNRef?.current.value : '',
        columnORef?.current ? columnORef?.current.value : '',
        columnPRef?.current ? columnPRef?.current.value : '',
        columnQRef?.current ? columnQRef?.current.value : '',
        columnRRef?.current ? columnRRef?.current.value : '',
        columnSRef?.current ? columnSRef?.current.value : '',
        columnTRef?.current ? columnTRef?.current.value : '',
        columnURef?.current ? columnURef?.current.value : '',
        columnVRef?.current ? columnVRef?.current.value : '',
        columnWRef?.current ? columnWRef?.current.value : '',
        columnXRef?.current ? columnXRef?.current.value : '',
        columnYRef?.current ? columnYRef?.current.value : '',
        columnZRef?.current ? columnZRef?.current.value : ''
    ];  

    props.onSave(row, props.rowNumber); 
  }

  const renderColumn = (props, column, cell, ref) => {
    let defaultValue = '';
    
    if(props.rowData.at(cell)) {
        defaultValue = props.rowData[cell];
    } else if (column.value.length) {
        defaultValue = column.value;
    } else {
        defaultValue = '';
    }

    if (props.metadata.columnCount > cell) {
        return (
            <div className="form-floating my-3">
                <input type="text" className="form-control" inputMode={column.inputmode} placeholder={column.name} ref={ref} defaultValue={defaultValue} />
                <label>{column.name}</label>
            </div>
        );        
    } else {
        return null;
    }
  }

    const renderBody = props => {
        if (props.state === 'showModal') {
            return (
                <div className="modal-body">
                    { renderColumn(props, props.metadata.columns['A'], 0, columnARef) }
                    { renderColumn(props, props.metadata.columns['B'], 1, columnBRef) }
                    { renderColumn(props, props.metadata.columns['C'], 2, columnCRef) }
                    { renderColumn(props, props.metadata.columns['D'], 3, columnDRef) }
                    { renderColumn(props, props.metadata.columns['E'], 4, columnERef) }
                    { renderColumn(props, props.metadata.columns['F'], 5, columnFRef) }
                    { renderColumn(props, props.metadata.columns['G'], 6, columnGRef) }
                    { renderColumn(props, props.metadata.columns['H'], 7, columnHRef) }
                    { renderColumn(props, props.metadata.columns['I'], 8, columnIRef) }
                    { renderColumn(props, props.metadata.columns['J'], 9, columnJRef) }
                    { renderColumn(props, props.metadata.columns['K'], 10, columnKRef) }
                    { renderColumn(props, props.metadata.columns['L'], 11, columnLRef) }
                    { renderColumn(props, props.metadata.columns['M'], 12, columnMRef) }
                    { renderColumn(props, props.metadata.columns['N'], 13, columnNRef) }
                    { renderColumn(props, props.metadata.columns['O'], 14, columnORef) }
                    { renderColumn(props, props.metadata.columns['P'], 15, columnPRef) }
                </div>          
            );
        } else {
            return (
                <div className="modal-body">
                </div>          
            );
        }
    }

    const renderTitle = props => {
        if (props.rowNumber) {
            return (
                <h5 className="modal-title" id="staticBackdropLabel">{ 'Rivi: ' + props.rowNumber }</h5>
            );
        } else {
            return (
                <h5 className="modal-title" id="staticBackdropLabel">Lisää rivi</h5>
            );
        }

    }
  
    return (
        <div className="modal fade" ref={modalRef} tabIndex="-1" >
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    { renderTitle(props) }
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