# Travel Planning App

## Description
The Travel Planner app is a single page application that prompts users to enter their next trip destination and travel dates.  Once users submit the form the Ui will be updated with information from the destination including length of trip, countdown to trip, information about the country, weather info and pictures of destination.  The user can add as many trips as they wish and the UI will sort each trip based on the departure date.  The user can also opt to delete trips.

Technologies used include:
* Webpack for module bundling
* Javascript, HTML, CSS/Sass
* Node/Express for server side functionality
* NPM
* Jest for unit testing

### Setup
1. To install project dependencies run `npm install` in the CLI.
2. Create a developer account on http://api.geonames.org, http://api.weatherbit.io, https://pixabay.com/api/ to access API keys.
3. Create a .env file to store API keys:
    * `geoUsername = <Your API key>`
    * `weatherApi = <Your API key>`
    * `pixApi = <Your API key>`
4. In the CLI use:
    * `npm run build-dev` to run app in development mode.
    * `npm run build-prod` to run app in production mode.
    * `npm run start` to start the server.
    * `npm run test` to run unit tests.
5. In your browser navigate to http://localhost:8000/ to view app.
