const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');

// Configure dotenv to access envrionment variables
const dotenv = require('dotenv');
dotenv.config();

// Global variables holding project data
const projectData = {};

// creating an instance of express
const app = express()
    //to use cross origin allowance
app.use(cors())
    // to use json
app.use(bodyParser.json())
    // to use url encoded values
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(express.static('./dist'));

// port and server connection
const port = '8000';

const server = app.listen(port, () => {
    console.log(`Server is listening on localhost: ${port}`);
});

app.get('/', (req, res) => {
    res.sendFile('dist/index.html');
});

// Get Route
app.get('/projectData', (req, res) => {
    res.send(projectData);
});

//GeoNames API data
const geoUrl = 'http://api.geonames.org/searchJSON?';
const username = process.env.geoUsername;

//Weatherbit API data
const weatherUrl = 'http://api.weatherbit.io/v2.0/forecast/daily?';
const weatherApi = process.env.weatherApi;

//Pixabay API data
const picUrl = 'https://pixabay.com/api/?';
const picApi = process.env.pixApi;


//REST countries API
const countryApi = 'https://restcountries.eu/rest/v2/name/';

const getCountry = async(req, res) => {
    const country = req.body.country;
    const response = await fetch(`${countryApi}${country}`)
    try {
        const countryData = await response.json();
        //console.log(countryData);
        res.send(countryData);
    } catch (error) {
        console.log('error: ', error);
    }
};

app.post('/country', getCountry);

//request to Geonames API with city, country
const getCoords = async(req, res) => {
    const location = req.body.city;
    const country = req.body.country;
    const response = await fetch(`${geoUrl}q=${location}&country=${country}&maxRows=5&username=${username}`);
    try {
        const geoData = await response.json();
        //console.log(geoData);
        res.send(geoData);
    } catch (error) {
        console.log(error);
    };
};

app.post('/geonames', getCoords);

//request to Weatherbit API with coordinates passed from Geonames
const getWeather = async(req, res) => {
    const lng = req.body.lng;
    const lat = req.body.lat;

    const response = await fetch(`${weatherUrl}&lat=${lat}&lon=${lng}&key=${weatherApi}`);
    try {
        const weatherData = await response.json();
        res.send(weatherData);
    } catch (error) {
        console.log(error);
    };
};

app.post('/weather', getWeather);

//request to Pixabay API
const getPic = async(req, res) => {
    const search = req.body.location;
    const response = await fetch(`${picUrl}key=${picApi}&q=${search}&image_type=photo&per_page=5`);
    try {
        const picData = await response.json();
        //console.log(picData);
        res.send(picData);
    } catch (error) {
        console.log('error: ', error);
    };
};

app.post('/picture', getPic);

//entry to projectData
const addProjectData = async(req, res) => {
    let newEntry = req.body;
    let currentId = uuidv4();
    let tripData = {
        city: newEntry.city,
        country: newEntry.country,
        forecast: newEntry.forecast,
        pictures: newEntry.pictures,
        capital: newEntry.capital,
        population: newEntry.population,
        language: newEntry.language,
        currency: newEntry.currency,
        length: newEntry.length,
        countdown: newEntry.countdown,
        tripDate: newEntry.tripDate,
        tripId: currentId
    };
    projectData[currentId] = tripData;

    //console.log(projectData);
    res.send(projectData);
};

app.post('/addProjectData', addProjectData);

const deleteTrip = async(req, res) => {
    delete projectData[req.body.id];
    res.send(projectData);
};
app.post('/deleteTrip', deleteTrip);