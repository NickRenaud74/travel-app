const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

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

app.use(express.static('dist'));

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

//request to Geonames API with placename
const getCoords = async(req, res) => {
    const input = req.body.destination;
    const response = await fetch(`${geoUrl}q=${input}&maxRows=10&username=${username}`);
    try {
        const geoData = await response.json();
        console.log(geoData);
    } catch (error) {
        console.log(error);
    };
};

app.post('/geonames', getCoords);