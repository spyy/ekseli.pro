import React, { useRef } from 'react';

import columnDefault from './config/column.json';


const AddRow = props => {
    const columnARef = useRef(null);
    const columnBRef = useRef(null);
    const columnCRef = useRef(null);
    const columnDRef = useRef(null);
    const columnERef = useRef(null);
    const columnFRef = useRef(null);
    const columnGRef = useRef(null);
    const columnHRef = useRef(null);
    const columnIRef = useRef(null);
    const columnJRef = useRef(null);
    const columnKRef = useRef(null);
    const columnLRef = useRef(null);
    const columnMRef = useRef(null);
    const columnNRef = useRef(null);
    const columnORef = useRef(null);
    const columnPRef = useRef(null);
    
    const onAdd = () => {
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
            columnPRef?.current ? columnPRef?.current.value : ''
        ];  
    
        props.onAdd(row);
    }


    const renderColumn = (props, column, cell, ref) => {
        const name = column.name ? column.name : columnDefault.name;
        const type = column.type ? column.type : columnDefault.type;
        const inputmode = column.inputmode ? column.inputmode : columnDefault.inputmode;
        const value = column.value ? column.value : columnDefault.value;

        if (props.metadata.columnCount > cell) {
            return (
                <div className="form-floating my-3">
                    <input type={type} className="form-control" inputMode={inputmode} placeholder={name} ref={ref} defaultValue={value} />
                    <label>{name}</label>
                </div>
            );        
        } else {
            return null;
        }
    }
    
    return (
        <div className="card-body">
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

            <div className="d-grid d-md-flex justify-content-md-end">                    
                <button className="btn btn-outline-primary btn-lg" type="button" onClick={onAdd}>Lisää rivi</button>
            </div>

        </div>
    );      
}


export default AddRow;