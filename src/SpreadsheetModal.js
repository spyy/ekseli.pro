import React, { useEffect, useRef } from 'react';

const SpreadsheetModal = props => {
    const modalRef = useRef();

    const titleRef = useRef();
  
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
        const title = titleRef?.current ? titleRef.current.value : '';

        props.onSave(title);
    }

    return (
        <div className="modal fade" ref={modalRef} tabIndex="-1" >
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Luo Spreadsheet tiedosto</h5>
                    <button type="button" className="btn-close" onClick={() => props.onCancel()} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="form-floating my-3">
                        <input type="text" className="form-control" inputMode="text" ref={titleRef} />
                        <label>Tiedoston nimi</label>
                    </div>
                </div>          
                <div className="modal-footer">
                    <button type="button" className="btn btn-outline-secondary" onClick={() => props.onCancel()}>Peru</button>
                    <button type="button" className="btn btn-outline-primary" onClick={() => onSave()}>OK</button>
                </div>
                </div>
                
            </div>
        </div>
    );
}



export default SpreadsheetModal;