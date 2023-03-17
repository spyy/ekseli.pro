export const parseResult = res => {
    //console.log(res);
    
    if(res?.result === undefined) {
        throw new Error('result not found');
    }
    
    return res.result;
}

export const parseJson = res => {
    //console.log(res); 
    
    return JSON.parse(res.body);
}

export const parseBody = res => {
    console.log(res); 
    
    return JSON.parse(res.body);
}

export const parseValues = result => {
    console.log(result); 

    if(result?.values === undefined) {
        throw new Error('values not found');
    }
    
    return result.values;
}

export const parseUpdates = result => {
    //console.log(result); 
    
    return result.updates;
}

export const parseUpdatedRange = updates => {
    //console.log(result); 
    
    return updates.updatedRange;
}

export const parsemetadataValue = res => {
    //console.log(res); 
    
    return JSON.parse(res?.metadataValue);
}

export const parseA1Notation = updatedRange => {
    //console.log(updatedRange);

    const splitted = updatedRange.split(':');
    
    return splitted[0];
}

export const convertA1Notation = range => {
    //console.log(range);

    const re1 = /[A-Z]/i;
    const re2 = /[A-Z][A-Z]/i;
    const re3 = /^A[1-9]/i;

    const splitted = range.split('!');
    const sheetTitle = splitted[0];
    const rowRange = splitted[1];   
    
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
}
