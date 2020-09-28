import { postData } from './postData'

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

    postData('/geonames', { destination: place })
        .then(async(data) => {
            await postData('/weather', {
                lng: data.geonames[0].lng,
                lat: data.geonames[0].lat
            }).then(async(data) => {
                await postData('/picture', {
                    location: data.city_name
                });
            });
        });
};

//Event listener triggered on submitting form
document.getElementById('submit').addEventListener('click', getData);

export {
    getData
}