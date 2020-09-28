import { postData } from './postData'

//Function to handle form submit
const getData = async(event) => {
    event.preventDefault();
    let city = document.getElementById('city').value;
    let country = document.getElementById('country').value;
    let trip = document.getElementById('date').value;
    console.log(trip);

    //Create a countdown from current date to user input date
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

    //request to get destination coordinates
    const coords = await postData('/geonames', {
        city: city,
        country: country
    });

    //request to get weather forecast
    const weather = await postData('/weather', {
        lng: coords.geonames[0].lng,
        lat: coords.geonames[0].lat
    });

    //to get destination pictures
    const picture = await postData('/picture', {
        location: weather.city_name
    });

    //add picture URL to a list for all returned pictures
    const allPics = picList => {
        let pics = [];
        for (let pic of picList) {
            pics.push(pic.webformatURL);
        };
        return pics;
    };

    //extract data from returned weather API to save only necessary data to projectData variable
    const weatherData = forecast => {
        let weather = [];
        for (let day of forecast) {
            weather.push({
                max: Math.round(day.max_temp),
                min: Math.round(day.min_temp),
                weather: day.weather
            });
        };
        return weather;
    };

    //saving project data
    const project = await postData('/addProjectData', {
        forecast: weatherData(weather.data),
        city: weather.city_name,
        country: weather.country_code,
        pictures: allPics(picture.hits)
    });
};


//Event listener triggered on submitting form
document.getElementById('submit').addEventListener('click', getData);

export {
    getData
}