//Post request to /geonames route on server.js
const postGeo = async(url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await res.json();
        return newData;
    } catch (error) {
        console.log('error: ', error);
    };
};

export {
    postGeo
}