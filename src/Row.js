import React, { useEffect, useState } from 'react';

const Row = props => {
  const [fieldA, setFieldA] = useState(props.row[0] ? props.row[0] : '');
  const [fieldB, setFieldB] = useState(props.row[1] ? props.row[1] : '');
  const [fieldC, setFieldC] = useState(props.row[2] ? props.row[2] : '');
  const [fieldD, setFieldD] = useState(props.row[3] ? props.row[3] : '');
  const [fieldE, setFieldE] = useState(props.row[4] ? props.row[4] : '');
  const [fieldF, setFieldF] = useState(props.row[5] ? props.row[5] : '');
  const [fieldG, setFieldG] = useState(props.row[6] ? props.row[6] : '');
  const [fieldH, setFieldH] = useState(props.row[7] ? props.row[7] : '');


  const generateValues = () => {
    const values = [
      fieldA, 
      fieldB, 
      fieldC,
      fieldD,
      fieldE,
      fieldF,
      fieldG,
      fieldH
    ];

    return values;
  }

  const renderEmpty = () => {
    return (
      <div className="col-md-4 col-lg-3">
      </div>
    );
  }

  const renderA = () => {
    return (
      <div className="col-md-4 col-lg-3">
        <label className="form-label">Sarake A</label>
        <input type="text" className="form-control" placeholder="" value={fieldA} onChange={event => setFieldA(event.target.value)}></input>
      </div>
    );
  }

  const renderB = () => {
    if (props.columnCount < 2) {
      return renderEmpty();
    } else {
      return (
        <div className="col-md-4 col-lg-3">
          <label className="form-label">Sarake B</label>
          <input type="text" className="form-control" placeholder="" value={fieldB} onChange={event => setFieldB(event.target.value)}></input>
        </div>
      );
    }
  }
      
  const renderC = () => {
    if (props.columnCount < 3) {
      return renderEmpty();
    } else {
      return (
        <div className="col-md-4 col-lg-3">
          <label className="form-label">Sarake C</label>
          <input type="text" className="form-control" placeholder="" value={fieldC} onChange={event => setFieldC(event.target.value)}></input>
        </div>
      );
    }
  }

  const renderD = () => {
    if (props.columnCount < 4) {
      return renderEmpty();
    } else {
      return (
        <div className="col-md-4 col-lg-3">
          <label className="form-label">Sarake D</label>
          <input type="text" className="form-control" placeholder="" value={fieldD} onChange={event => setFieldD(event.target.value)}></input>
        </div>
      );
    }
  }

  const renderE = () => {
    if (props.columnCount < 5) {
      return renderEmpty();
    } else {
      return (
        <div className="col-md-4 col-lg-3">
          <label className="form-label">Sarake E</label>
          <input type="text" className="form-control" placeholder="" value={fieldE} onChange={event => setFieldE(event.target.value)}></input>
        </div>
      );
    }
  }

  const renderF = () => {
    if (props.columnCount < 6) {
      return renderEmpty();
    } else {
      return (
        <div className="col-md-4 col-lg-3">
          <label className="form-label">Sarake F</label>
          <input type="text" className="form-control" placeholder="" value={fieldF} onChange={event => setFieldF(event.target.value)}></input>
        </div>
      );
    }
  }

  const renderG = () => {
    if (props.columnCount < 7) {
      return renderEmpty();
    } else {
      return (
        <div className="col-md-4 col-lg-3">
          <label className="form-label">Sarake G</label>
          <input type="text" className="form-control" placeholder="" value={fieldG} onChange={event => setFieldG(event.target.value)}></input>
        </div>
      );
    }
  }

  const renderH = () => {
    if (props.columnCount < 8) {
      return renderEmpty();
    } else {
      return (
        <div className="col-md-4 col-lg-3">
          <label className="form-label">Sarake H</label>
          <input type="text" className="form-control" placeholder="" value={fieldH} onChange={event => setFieldH(event.target.value)}></input>
        </div>
      );
    }
  }

  const onSave = () => {
    const values = generateValues();

    props.onSave(values, props.index);
  }
  
  return (
      <main className="container">  
        <div className="py-5 text-center">
          <h5 className="mb-3">{'Rivi ' + parseInt(props.index + 1) }</h5>

          <hr className="my-4" />
        
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="row g-3 mb-3">
              { renderA() }
              { renderB() }
              { renderC() }
              { renderD() }
            </div>
            <div className="row g-3 mb-3">
              { renderE() }
              { renderF() }
              { renderG() }
              { renderH() }
            </div>
          </div>

          <hr className="my-4" />

          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <button class="w-100 btn btn-outline-primary btn-lg" type="button" onClick={() => props.onCancel()}>Peru</button>
              </div>
              <div className="col-md-6">
                <button class="w-100 btn btn-primary btn-lg" type="button" onClick={onSave}>Talleta</button>
              </div>
            </div>
          </div>

          
        </div>
    </main>
  );
}


export default Row;