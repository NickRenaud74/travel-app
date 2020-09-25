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

const getData = event => {
    event.preventDefault();
    let place = document.getElementById('destination').value;

    postGeo('/geonames', {
        destination: place
    });
};

//Event listener triggered on submitting form
document.getElementById('submit').addEventListener('click', getData);

export {
    getData
}