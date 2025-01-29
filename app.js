const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const gadgetsRoutes = require('./routes/gadgetsRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// IMPORTANT MIDDLEWARE
app.use(cors({
  origin: '*', // allowed every origin for testing the APIs for assignment
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  // credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use('/gadgets', gadgetsRoutes);
app.use('/auth', authRoutes);

module.exports = app;
