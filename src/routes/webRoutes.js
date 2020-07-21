const express = require('express');

// Express routing
const router = express.Router();

// Path, to avoid / and \ conflicts
const path = require('path');

// Require the controller for these routes
const webController = require(path.resolve(__dirname, '..','controllers','webController.js'));

// Web routes and their methods below
router.get('/', webController.index);

// Exports this module
module.exports = router;
