const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');
const habitRoute = require('./routes/habit');
const quoteRoute = require('./routes/quote');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const axios = require('axios');
const requireAuth = require('./middlewares/requireAuth');

//declare app
const app = express();

//import frontend URL
const FRONTEND_URL = process.env.FRONTEND_URL;

//middlewares
app.use(express.json());
app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));
app.use(cookieParser());

//declaring .env variables
const PORT = process.env.PORT || 5000;
const mongodbString = process.env.MONGODB_STRING;
const frontendURL = process.env.FRONTEND_URL;

//Routes 
app.use('/auth', authRoute);
app.use('/profile', profileRoute);
app.use('/habit', habitRoute);
app.use('/quote', quoteRoute);

//cronjobes
//require('./cronJobes/cronJob');

app.get('/', (req, res) => {
  res.redirect(frontendURL);
})

mongoose.connect(mongodbString).then(() => {
  console.log('Connected to the Database !');
  app.listen(PORT, () => {
  console.log(`server working on port ${PORT}`)
})}).catch((err) => {
  console.log(err);
});