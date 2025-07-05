require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const bookingRoutes = require('./routes/booking');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use('/api', bookingRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;