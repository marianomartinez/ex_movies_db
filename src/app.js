const express = require('express');
const app = express();

// Path, to avoid / and \ conflicts
const path = require('path');

// Define location for static/public files
app.use(express.static('public'));

// Set EJS as Template Engine
app.set('view engine', 'ejs');

// Search-related
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Require the routes' files to be used
const webRoutes = require(path.resolve(__dirname, '.', 'routes', 'webRoutes.js'));
const moviesRoutes = require(path.resolve(__dirname, '.','routes','moviesRoutes.js'));

// Use these routes
app.use(webRoutes);
app.use(moviesRoutes);


// Local server setup
app.listen(3000, () => console.log('Active server at port 3000'));
