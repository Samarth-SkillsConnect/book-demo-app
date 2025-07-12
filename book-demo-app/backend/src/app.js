require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const bookingRoutes = require('./routes/booking');
const adminRoutes = require('./routes/admin');
const demoSlotsRoutes = require('./routes/demoSlots');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: '50mb' }));
app.use('/api/admin', require('./routes/apiAdminLogin')); 
app.use('/api', bookingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/demo-slots', demoSlotsRoutes);


module.exports = app;

