let express = require('express');
let Router = express.Router();
let connectController = require('../controllers/connectController');

Router.get('/', connectController.connectToDB);


module.exports = Router;