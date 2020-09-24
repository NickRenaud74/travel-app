// Global variables holding project data
const projectData = {};

// Initializing express
const express = require('express');
const app = express();

//Initializing cors for cross origin allowance
const cors = require('cors');
app.use(cors());

//Configure body-parser as middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('dist'));

// port and server connection
const port = '8000';

const server = app.listen(port, () => {
    console.log(`Server is listening on localhost: ${port}`);
});

app.get('/', (req, res) => {
    res.sendFile('dist/index.html');
})

// Get Route
app.get('/projectData', (req, res) => {
    res.send(projectData);
});

// Post Route