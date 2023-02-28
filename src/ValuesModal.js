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

  const renderColumnA = props => {
    const defaultValue = props.rowData.at(0) ? props.rowData[0] : '';

    return (
        <div className="form-floating my-3">
            <input type="text" className="form-control" placeholder={props.columns['A'].name} ref={columnARef} defaultValue={defaultValue} />
            <label>{props.columns['A'].name}</label>
        </div>
    );
  }

  const renderColumn = (props, column, cell, ref) => {
    const defaultValue = props.rowData.at(cell) ? props.rowData[cell] : '';

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
                    { renderColumn(props, props.columns['E'], 4, columnERef) }
                    { renderColumn(props, props.columns['F'], 5, columnFRef) }
                    { renderColumn(props, props.columns['G'], 6, columnGRef) }
                    { renderColumn(props, props.columns['H'], 7, columnHRef) }
                    { renderColumn(props, props.columns['I'], 8, columnIRef) }
                    { renderColumn(props, props.columns['J'], 9, columnJRef) }
                    { renderColumn(props, props.columns['K'], 10, columnKRef) }
                    { renderColumn(props, props.columns['L'], 11, columnLRef) }
                    { renderColumn(props, props.columns['M'], 12, columnMRef) }
                    { renderColumn(props, props.columns['N'], 13, columnNRef) }
                    { renderColumn(props, props.columns['O'], 14, columnORef) }
                    { renderColumn(props, props.columns['P'], 15, columnPRef) }
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