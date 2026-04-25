import * as utils from './utils';

// Helper to handle response and errors consistently
const handleFetch = (response, handleResponse, handleError) => {
    if (!response.ok) {
        // If 401, handle as unauthorized
        if (response.status === 401) {
            return response.json().then(err => utils.handleUnauthorized(err, handleError));
        }
        return response.json().then(err => handleError(err));
    }
    return response.json().then(handleResponse);
};

const postRequest = async (token, path, body) => {
    const url = new URL(path);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ${token}',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
};

const getRequest = async (token, path) => {
    const url = new URL(path);    
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ${token}',
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
};

export const getSpreadsheet = (token, spreadsheet, handleResponse, handleError) => {
    const url = new URL('https://sheets.googleapis.com/v4/spreadsheets/${spreadsheet.id}');
    url.searchParams.append('fields', 'sheets.properties,spreadsheetId,properties.title');

    fetch(url, {
        headers: { 'Authorization': 'Bearer ${token}' }
    })
    .then(res => handleFetch(res, handleResponse, handleError))
    .catch(handleError);
};

export const getDeveloperMetadata = (token, spreadsheet, selectedSheet, handleResponse, handleError) => {
    const metadataId = spreadsheet.sheets[selectedSheet].properties.sheetId + 1;
    const url = 'https://sheets.googleapis.com/v4/spreadsheets/${spreadsheet.spreadsheetId}/developerMetadata/${metadataId}';

    fetch(url, {
        headers: { 'Authorization': 'Bearer ${token}' }
    })
    .then(res => handleFetch(res, (data) => {
        // Mimicking the original utility chain
        const body = utils.parseBody(data);
        const metadata = utils.parsemetadataValue(body);
        handleResponse(metadata);
    }, handleError))
    .catch(handleError);
};

export const createDeveloperMetadata = (token, spreadsheetId, sheetId, metadataValue, handleResponse, handleError) => {
    const url = 'https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate';
    
    const body = {
        requests: [{
            createDeveloperMetadata: {
                developerMetadata: {
                    metadataId: sheetId + 1,
                    metadataKey: 'configuration',
                    metadataValue: JSON.stringify(metadataValue),
                    visibility: 'DOCUMENT',
                    location: { sheetId: sheetId }
                }
            }
        }]
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ${token}',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(res => handleFetch(res, handleResponse, handleError))
    .catch(handleError);
};

export const getFiles = (token, handleResponse, handleError) => {
    const url = new URL('https://www.googleapis.com/drive/v3/files');
    url.searchParams.append('spaces', 'drive');
    url.searchParams.append('fields', '*');
    url.searchParams.append('q', 'mimeType = "application/vnd.google-apps.spreadsheet" and trashed = false');

    fetch(url, {
        headers: { 'Authorization': 'Bearer ${token}' }
    })
    .then(res => handleFetch(res, (data) => {
        const result = utils.parseResult(data);
        handleResponse(result);
    }, handleError))
    .catch(err => console.log(err));
};

export const getValues = (token, title, spreadsheetId, handleResponse, handleError) => {    
    const url = 'https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${title}';

    fetch(url, {
        headers: { 'Authorization': 'Bearer ${token}' }
    })
    .then(res => handleFetch(res, (data) => {
        const result = utils.parseResult(data);
        const values = utils.parseValues(result);
        handleResponse(values);
    }, handleError))
    .catch(handleError);
};

export const updateValues = (token, title, spreadsheetId, values, row, handleResponse, handleError) => {   
    const range = '${title}!${row}:${row}';     
    const url = new URL('https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}');
    url.searchParams.append('valueInputOption', 'RAW');

    fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ${token}',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ values: [values] })
    })
    .then(res => {
        if (!res.ok) return res.json().then(err => utils.handleUnauthorized(err, handleError));
        return res.json().then(body => handleResponse(body, values, row));
    })
    .catch(handleError);
};