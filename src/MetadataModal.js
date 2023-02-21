import React, { useEffect, useRef } from 'react';

const MetadataModal = props => {
  const modalRef = useRef();
  const nameRef = useRef();
  const inputModeRef = useRef();

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
        'type': props.column.type,
        'required': props.column.required,
        'disabled': props.column.disabled,
        'readonly': props.column.readonly,
        'inputmode': inputModeRef.current.value
    };

    props.onSave(props.columnKey, column);
  }

  const renderBody = props => {
    if (props.state == 'showModal') {
        return (
            <div className="modal-body">
                <div className="form-floating my-3">
                    <input type="email" className="form-control" placeholder="Syötekentän nimi" ref={nameRef} defaultValue={props.column.name} />
                    <label>Nimi</label>
                </div>
                <div className="form-floating my-3">
                    <select className="form-select" disabled>
                        <option>Ominaisuus kehitteillä</option>
                    </select>
                    <label>Syötekentän tyyppi</label>
                </div>
                <div className="form-floating my-3">
                    <select className="form-select" ref={inputModeRef} defaultValue={props.column.inputmode}>
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