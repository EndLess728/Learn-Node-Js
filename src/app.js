const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const { notFound, globalError } = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', routes);

app.use(notFound);
app.use(globalError);

module.exports = app;
