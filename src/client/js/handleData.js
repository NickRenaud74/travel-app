import { postData } from './postData'
import { updateUi } from './updateUi'


//Function to handle form submit
const getData = async(event) => {
    event.preventDefault();

    //User Input variables
    let city = document.getElementById('city').value;
    let country = document.getElementById('country').value;
    let departure = new Date(document.getElementById('depart-date').value);
    console.log(departure);
    let returning = new Date(document.getElementById('return-date').value);
    console.log(returning);
    //console.log(departure.toUTCString().substring(0, 16));

    //get the difference in days between two date objects
    const dayDifference = (startDate, endDate) => {
        const diff = endDate - startDate;
        //converting milliseconds to days & round to next full day
        const diffInDays = (Math.ceil(diff / (1000 * 60 * 60 * 24)));
        return diffInDays
    };

    //calculate length of trip
    const tripLength = dayDifference(departure, returning);
    console.log(tripLength);

    //calculate amount of days until trip
    const today = new Date();
    console.log(today);
    const daystoTrip = dayDifference(today, departure);
    console.log(daystoTrip);

    //request to get country information
    const countryInfo = await postData('/country', {
        country: country
    });

    //to get destination coordinates
    const coords = await postData('/geonames', {
        city: city,
        country: countryInfo[0].alpha2Code
    });

    //to get weather forecast
    const weather = await postData('/weather', {
        lng: coords.geonames[0].lng,
        lat: coords.geonames[0].lat
    });

    //to get destination pictures
    const picture = await postData('/picture', {
        location: city
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
                weather: day.weather,
                date: day.valid_date
            });
        };
        return weather;
    };

    //saving project data
    const project = await postData('/addProjectData', {
        forecast: weatherData(weather.data),
        city: weather.city_name,
        country: countryInfo[0].name,
        capital: countryInfo[0].capital,
        population: countryInfo[0].population,
        language: countryInfo[0].languages[0].name,
        currency: countryInfo[0].currencies[0].name,
        pictures: allPics(picture.hits),
        length: tripLength,
        countdown: daystoTrip,
        tripDate: departure.toUTCString().substring(0, 16),
        today: today.toUTCString().substring(0, 16)
    });
    updateUi();
};

//Event listener triggered on submitting form
document.getElementById('submit').addEventListener('click', getData);

export {
    getData
}