/**
 * Internal Utility Functions
 */
const parseValues = (result) => {
    if (result?.values === undefined) {
        throw new Error('values not found');
    }
    return result.values;
};

const parseUpdates = (result) => result?.updates;

const parseUpdatedRange = (updates) => updates?.updatedRange;

const parseMetadataValue = (res) => {
    try {
        return JSON.parse(res?.metadataValue);
    } catch (e) {
        return res?.metadataValue;
    }
};

const parseA1Notation = (updatedRange) => {
    if (!updatedRange) return '';
    const splitted = updatedRange.split(':');
    return splitted[0];
};

const convertA1Notation = (range) => {
    const re1 = /[A-Z]/i;
    const re2 = /[A-Z][A-Z]/i;
    const re3 = /^A[1-9]/i;

    const [sheetTitle, rowRange] = range.split('!');
    
    if (rowRange.search(re3) === -1) {
        const replaced = rowRange.replace(re1, 'A');
        const convertedRange = sheetTitle + '!' + replaced.replace(re2, 'A');

        return {
            original: range,
            converted: convertedRange
        };
    } else {
        return {
            original: range,
            converted: range
        };
    }
};

/**
 * Private API Helper
 */
const apiRequest = async (token, path, options = {}) => {
    const url = new URL(path);
    if (options.params) {
        Object.entries(options.params).forEach(([k, v]) => url.searchParams.append(k, v));
    }

    const res = await fetch(url, {
        method: options.method || 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: options.body ? JSON.stringify(options.body) : null
    });

    if (!res.ok) {
        throw new Error(res.status);
    }

    return res.json();
};

/**
 * Exported API Functions
 */

export const createSpreadsheet = (token, title, cb, err) => {
    const options = {
        method: 'POST',
        body: { properties: { title } }
    };

    apiRequest(token, 'https://sheets.googleapis.com/v4/spreadsheets/', options)
        .then(cb)
        .catch(err);
};

export const getSpreadsheet = (token, spreadsheet, cb, err) => {
    const options = {
        params: { fields: 'sheets.properties,spreadsheetId,properties.title' }
    };

    apiRequest(token, `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheet.id}`, options)
        .then(cb)
        .catch(err);
};

export const getDeveloperMetadata = (token, spreadsheet, sheetIdx, cb, err) => {
    const metaId = spreadsheet.sheets[sheetIdx].properties.sheetId + 1;
    const path = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheet.spreadsheetId}/developerMetadata/${metaId}`;

    apiRequest(token, path)
        .then(parseMetadataValue)
        .then(cb)
        .catch(err);
};

export const createDeveloperMetadata = (token, spreadsheetId, sheetId, val, cb, err) => {
    const options = {
        method: 'POST',
        body: {
            requests: [{
                createDeveloperMetadata: {
                    developerMetadata: {
                        metadataId: sheetId + 1,
                        metadataKey: 'configuration',
                        metadataValue: JSON.stringify(val),
                        visibility: 'DOCUMENT',
                        location: { sheetId }
                    }
                }
            }]
        }
    };

    apiRequest(token, `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, options)
        .then(cb)
        .catch(err);
};

export const updateDeveloperMetadata = (token, spreadsheetId, sheetId, val, cb, err) => {
    const options = {
        method: 'POST',
        body: {
            requests: [{
                updateDeveloperMetadata: {
                    fields: '*',
                    dataFilters: [{
                        developerMetadataLookup: { metadataId: sheetId + 1 }
                    }],
                    developerMetadata: {
                        metadataKey: 'configuration',
                        metadataValue: JSON.stringify(val),
                        location: { sheetId },
                        visibility: 'DOCUMENT'
                    }
                }
            }]
        }
    };

    apiRequest(token, `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, options)
        .then(cb)
        .catch(err);
};

export const getFiles = (token, cb) => {
    const options = {
        params: { 
            spaces: 'drive', 
            fields: 'files(id, name, lastModifyingUser, ownedByMe, modifiedTime,  mimeType, trashed)', 
            q: 'mimeType = "application/vnd.google-apps.spreadsheet" and trashed = false' 
        }
    };

    apiRequest(token, 'https://www.googleapis.com/drive/v3/files', options)
        .then(cb)
        .catch(err => console.error(err));
};

export const getValues = (token, range, spreadsheetId, cb, err) => {
    apiRequest(token, `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`)
        .then(parseValues)
        .then(cb)
        .catch(err);
};

export const updateValues = (token, title, spreadsheetId, values, row, cb, err) => {
    const options = {
        method: 'PUT',
        params: { valueInputOption: 'RAW' },
        body: { values: [values] }
    };

    apiRequest(token, `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${title}!${row}:${row}`, options)
        .then(data => cb(data, values, row))
        .catch(err);
};

export const append = (token, spreadsheetId, range, values, cb, err) => {       
    const options = {
        method: 'POST',
        params: { valueInputOption: 'RAW' },
        body: { values: [values] }
    };
    
    apiRequest(token, `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append`, options)
        .then(parseUpdates)
        .then(parseUpdatedRange)
        .then(parseA1Notation)
        .then(convertA1Notation)
        .then(cb)
        .catch(err);
};
