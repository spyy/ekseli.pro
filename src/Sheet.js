import React, { useEffect, useState } from 'react';

import Row from './Row';


const Sheet = props => {
    const [state, setState] = useState('getValues');
    const [values, setValues] = useState([]);

  
    useEffect(() => {
        console.log('state: ' + state);
    
        switch (state) {
          case 'getValues':
            getValues();
            break;               
          case 'ready':
            break;
          default:
            break;
        }
    },[state]);

    const parseJson = res => {
        //console.log(res); 
        
        return JSON.parse(res.body);
    }

    const handleGetValuesResponse = body => {
        console.log(body);

        setValues(body.values);
    }

    const getValues = () => {
        const path = 'https://sheets.googleapis.com/v4/spreadsheets/' + props.spreadsheet.id + '/values/1:100'
        const args = {
          'path': path
        };

        console.log(path);
        
        window.gapi.client.request(args)
          .then(parseJson)
          .then(handleGetValuesResponse)
          .then(setState('ready'))
          .catch(err => console.log(err))
    }


    const renderLoading = props => {
        return (
            <table className="table table-striped caption-top">
                <caption>{ '1-' + '10s0' }</caption>
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Etunimi</th>
                    <th scope="col">Lukumäärä</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>                
                </tbody>
            </table>
        );        
    }

    const renderHead = props => {
        return (    
            <thead>        
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">A</th>
                    <th scope="col">B</th>
                    <th scope="col">C</th>
                    <th scope="col">D</th>
                    <th scope="col">E</th>
                    <th scope="col">F</th>
                    <th scope="col">G</th>            
                </tr>
            </thead>
        );
    }

    const renderBody = props => {
        return (            
            <tbody>
            {
              values.map((element, index) => {
                return (
                  <Row key={index} number={index + 1} item={element} />
                );
              })
            }
          </tbody>
        );
    }

    const renderValues = props => {
        return (
            <table className="table table-striped caption-top">
                <caption>{ '1-' + values.length }</caption>
                { renderHead(props) }
                { renderBody(props) }
            </table>
        );
    }

    return (
        <main className="container">            
            { state == 'getValues' ? renderLoading(props) : renderValues(props) }
        </main>
    );
}


export default Sheet;