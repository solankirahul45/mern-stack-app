const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

app.use(express.json()); // ✅ Must be before routes

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
    const error = new HttpError('could not find this route', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }

    res.status(error.code || 500)
    res.json({ message : error.message || 'An unknown error occured!'});
});

mongoose
    .connect('mongodb+srv://solankirahul45_db_user:6ZD617eH7Xa26GTn@cluster0.68bjs90.mongodb.net/places?appName=Cluster0')
    .then(() => {
        app.listen(5000)
    })
    .catch(err => {
        console.log(err);
    });

