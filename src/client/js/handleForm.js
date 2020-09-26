import { postWeather } from './weather'
import { postGeo } from './geonames'

//Function to handle form submit
const getData = async(event) => {
    event.preventDefault();
    let place = document.getElementById('destination').value;

    postGeo('/geonames', { destination: place })
        .then(async(data) => {

            const weather = await postWeather('/weather', {
                lng: data.geonames[0].lng,
                lat: data.geonames[0].lat
            });
        });
};

//Event listener triggered on submitting form
document.getElementById('submit').addEventListener('click', getData);

export {
    getData
}