import * as utils from './utils';


export const getSpreadsheet = (spreadsheet, handleResponse, handleError) => {
    const path = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheet.id;
    const args = {
        'path': path,
        'params': {
        'fields': 'sheets.properties,spreadsheetId,properties.title'
        }
    };

    console.log(path);
    
    window.gapi.client.request(args)
        .then(utils.parseJson)
        .then(handleResponse)
        .catch(err => utils.handleUnauthorized(err, handleError))
}

export const getDeveloperMetadata = (spreadsheet, handleResponse, handleError) => {
    const metadataId = spreadsheet.sheets[selectedSheet].properties.sheetId + 1;
    const path = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheet.spreadsheetId + '/developerMetadata/' + metadataId;
    const args = {
        'path': path
    };

    console.log(path);
    
    window.gapi.client.request(args)
        .then(utils.parseBody)
        .then(utils.parsemetadataValue)
        .then(handleResponse)
        .catch(handleError)
}

export const createDeveloperMetadata = (spreadsheetId, sheetId, metadataValue, handleResponse, handleError) => {
    const path = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheetId + ':batchUpdate';
    const args = {
        path: path,
        method: 'POST',
        body: {
            requests: [{
                createDeveloperMetadata: {
                    developerMetadata: {
                        metadataId: sheetId + 1,
                        metadataKey: 'configuration',
                        metadataValue: JSON.stringify(metadataValue),
                        visibility: 'DOCUMENT',
                        location: {
                            sheetId: sheetId
                        }
                    }
                }
            }]
        }
    };

    console.log(args);
    
    window.gapi.client.request(args)
        .then(utils.parseBody)
        .then(handleResponse)
        .catch(err => utils.handleUnauthorized(err, handleError))
}

const updateDeveloperMetadata = (spreadsheetId, sheetId, metadataValue, handleResponse, handleError) => {
    const path = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheetId + ':batchUpdate';
    const args = {
        path: path,
        method: 'POST',
        body: {
            requests: [{
                updateDeveloperMetadata: {
                    fields: '*',
                    dataFilters: [{
                        developerMetadataLookup: {
                            metadataId: sheetId + 1
                        }
                    }],
                    developerMetadata: {
                        metadataKey: 'configuration',
                        metadataValue: JSON.stringify(metadataValue),
                        location: {
                            sheetId: sheetId
                        },
                        visibility: 'DOCUMENT'
                    }
                }
            }]
        }
    };

    console.log(args);
    
    window.gapi.client.request(args)
        .then(utils.parseBody)
        .then(handleResponse)
        .catch(err => utils.handleUnauthorized(err, handleError))
}

export const getFiles = (handleResponse) => {
    const args = {
        'path': 'https://www.googleapis.com/drive/v3/files',
        'params': {
        'spaces': 'drive',
        'fields': '*',
        'q': 'mimeType = "application/vnd.google-apps.spreadsheet" and trashed = false'
        }
    };

    window.gapi.client.request(args)
        .then(utils.parseResult)
        .then(handleResponse)
        .catch(err => console.log(err))
}

export const getValues = (title, spreadsheetId, handleResponse, handleError) => {    
    const path = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheetId + '/values/' + title;
    const args = {
        'path': path
    };

    console.log(path);
    
    window.gapi.client.request(args)
        .then(utils.parseResult)
        .then(utils.parseValues)
        .then(handleResponse)
        .catch(handleError)
}

export const updateValues = (title, spreadsheetId, values, row, handleResponse, handleError) => {   
    const range = title + '!' + row + ':' + row;     
    const path = 'https://sheets.googleapis.com/v4/spreadsheets/' + spreadsheetId + '/values/' + range;
    const args = {
        'path': path,
        'method': 'PUT',
        'params': {
        'valueInputOption': 'RAW'
        },
        'body': {
        'values': [values]
        }
    };

    console.log(path);
    
    window.gapi.client.request(args)
        .then(utils.parseResult)
        .then(body => handleResponse(body, values, row))
        .catch(err => utils.handleUnauthorized(err, handleError))
}
