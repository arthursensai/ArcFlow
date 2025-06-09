const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const axios = require('axios');

//declare app
const app = express();

//middlewares
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
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

//reset todos
require('./cronJobes/resetTodos');

app.get('/', (req, res) => {
    res.redirect(frontendURL);
})

//simple quotes route
app.get("/api/quote", async (req, res) => {
  axios.get('https://zenquotes.io/api/random').then((response) => {
    return res.status(200).json({ quote: response.data[0].q, author: response.data[0].a });
  }).catch((err) => {
    return res.status(400).json({ error: err });
  })
});

mongoose.connect(mongodbString).then(() => {
  console.log('Connected to the Database !');
  app.listen(PORT, () => {
  console.log(`server working on port ${PORT}`)
})}).catch((err) => {
  console.log(err);
});