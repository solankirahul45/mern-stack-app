//const HttpError = require("../models/http-error");

const { default: axios } = require("axios");

//const API_KEY = ""; //actual API Key will come here

async function getCoordsForAddress(address) {
    return {
        lat: 40.7484474,
        lng: -73.9871516
    };

    // axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`);

    // if (!data || data.status === 'ZERO_RESULTS') {
    //     const error = new HttpError('Could not find location forn the specified address.', 422);
    //     throw error;
    // }

    // const coordinates = data.results[0].geometry.location;

    // return coordinates;
}

module.exports = getCoordsForAddress;