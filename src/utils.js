export const parseResult = res => {
    //console.log(res);
    
    if(res?.result == undefined) {
        throw new Error('result not found');
    }
    
    return res.result;
}

export const parseJson = res => {
    //console.log(res); 
    
    return JSON.parse(res.body);
}