require('dotenv-safe').config();
const express = require('express');
const routes  = require('./routes');
const {errors} = require('celebrate');
const cors = require ('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());

app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(routes);
app.use(errors());

module.exports= app;