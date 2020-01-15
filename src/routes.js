const {  Router } = require('express');

const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);

routes.get('/searches', SearchController.index);

module.exports = routes;