const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan')('dev');
const config = require('./assets/config');

const app = express();

app.use(morgan);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require('./assets/routes/appRoutes');
//add routes to express app
app.use('/', routes, function(req, res) {
  res.send('This is the back-end part --- API landing');
});
app.listen(config.port, () => console.log('Started on port ' + config.port));
