import React, { useEffect, useRef } from 'react';

import columnDefault from './config/column.json'


const MetadataModal = props => {
  const modalRef = useRef();
  const nameRef = useRef();
  const inputModeRef = useRef();
  const typeRef = useRef();
  const valueRef = useRef();

  const nameDefault = props.column.name ? props.column.name : columnDefault.name;
  const typeDefault = props.column.type ? props.column.type : columnDefault.type;
  const inputModeDefault = props.column.inputmode ? props.column.inputmode : columnDefault.inputmode;
  const valueDefault = props.column.value ? props.column.value : columnDefault.value;

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
    const column = {
        'name': nameRef.current.value,
        'type': typeRef.current.value,
        'required': props.column.required,
        'disabled': props.column.disabled,
        'readonly': props.column.readonly,
        'inputmode': inputModeRef.current.value,
        'value': valueRef.current.value
    };

    props.onSave(props.columnKey, column);
  }

  const renderBody = props => {
    if (props.state === 'showModal') {
        return (
            <div className="modal-body">
                <div className="form-floating my-3">
                    <input type="text" className="form-control" placeholder="Syötekentän nimi" ref={nameRef} defaultValue={nameDefault} />
                    <label>Nimi</label>
                </div>
                <div className="form-floating my-3">
                    <select className="form-select" ref={typeRef} defaultValue={typeDefault}>
                        <option value="text">text</option>
                        <option value="tel">tel</option>
                        <option value="url">url</option>
                        <option value="email">email</option>
                        <option value="number">number</option>
                        <option value="search">search</option>
                        <option value="date">date</option>
                        <option value="time">time</option>
                        <option value="color">color</option>
                        <option value="month">month</option>
                        <option value="week">week</option>
                    </select>
                    <label>Syötekentän tyyppi</label>
                </div>
                <div className="form-floating my-3">
                    <select className="form-select" ref={inputModeRef} defaultValue={inputModeDefault}>
                        <option value="text">text</option>
                        <option value="tel">tel</option>
                        <option value="url">url</option>
                        <option value="email">email</option>
                        <option value="numeric">numeric</option>
                        <option value="decimal">decimal</option>
                        <option value="search">search</option>
                    </select>
                    <label>Syöte</label>
                </div>
                <div className="form-floating my-3">
                    <select className="form-select" disabled>
                        <option>Ominaisuus kehitteillä</option>
                    </select>
                    <label>Pakollinen</label>
                </div>
                <div className="form-floating my-3">
                    <select className="form-select" disabled>
                        <option>Ominaisuus kehitteillä</option>
                    </select>
                    <label>Käytössä</label>
                </div>
                <div className="form-floating my-3">
                    <select className="form-select" disabled>
                        <option>Ominaisuus kehitteillä</option>
                    </select>
                    <label>Vain luku</label>
                </div>
                <div className="form-floating my-3">
                    <input type="text" className="form-control" placeholder="Oletusarvo" ref={valueRef} defaultValue={valueDefault} />
                    <label>Oletusarvo</label>
                </div>
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
              <h5 className="modal-title" id="staticBackdropLabel">{ 'Sarake: ' + props.columnKey }</h5>
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



export default MetadataModal;