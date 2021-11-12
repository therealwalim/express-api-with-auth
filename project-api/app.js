const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();
app.use(cors({ origin: true, credentials: true }));

// Use the dev.env file to declare DB_CONNECT
mongoose.connect(process.env.DB_CONNECT, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// Middleware
app.use(express.json());

app.use('/storage', express.static('storage'));

// Routes
const Router = require('./routes/routes');
app.use(Router);

module.exports = app;