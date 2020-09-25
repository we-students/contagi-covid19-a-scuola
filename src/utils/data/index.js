let data;

export const updateData = async () => {
    data = await fetch('https://spreadsheets.google.com/feeds/cells/111HISX9asdXADszmq0ppNvznRW_LFJyyCDcyfnPb87k/1/public/full?alt=json')
    return data;
}

export const getData = async () => {
    if(data) {
        return data
    } else {
        return await updateData(); 
    }
}

