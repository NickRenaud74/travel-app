import { postWeather } from './weather'
import { postGeo } from './geonames'

//Function to handle form submit
const getData = async(event) => {
    event.preventDefault();
    let place = document.getElementById('destination').value;
    let trip = document.getElementById('date').value;
    console.log(trip);

    //Create a countdown from current date to user inputted date
    const calendarCountdown = () => {
        let tripDate = new Date(document.getElementById('date').value);
        console.log(tripDate.toUTCString());
        const date = new Date();
        const difference = tripDate - date;
        const daysToTrip = (Math.ceil(difference / (1000 * 60 * 60 * 24)));
        console.log(difference, daysToTrip);
        return { daysToTrip, tripDate };
    };
    calendarCountdown();


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