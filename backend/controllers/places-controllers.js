const { v7: uuidv7 } = require('uuid');
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error');

let DUMMY_PLACES = [{
    id: "p1",
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    location: {
        lat: 40.7484474,
        lng: -73.9871516
    },
    address: '20 W 34th St, New York, NY 10001',
    creator: 'u1'
}];

const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid; //{ pid: 'p1'};

    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    });

    if (!place) {
        throw new HttpError('could not find a place for the provided id.', 404);
    }

    res.json({place}); //=> { place } => { place: place }
}

const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid; // { uid: 'u1' };

    const places = DUMMY_PLACES.filter(p => {
        return p.creator === userId;
    })

    if (!places || places.length === 0) {
        return next(
            new HttpError('could not find a places for the provided user id.', 404)
        );
    }

    res.json({ places });
}

const createPlace = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new HttpError('Invalid inputs passed, please check your data', 422);
    }

    const { title, description, coordinates, address, creator } = req.body;
    //const title = req.body.title;

    const createdPlace = {
        id: uuidv7(),
        title,
        description, 
        location: coordinates,
        address, 
        creator
    };

    DUMMY_PLACES.push(createdPlace) //unshift(createdPlace)

    res.status(201).json({place: createdPlace});
};

const updatePlace = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new HttpError('Invalid inputs passed, please check your data', 422);
    }

    const { title, description } = req.body;
    const placeId = req.params.pid;

    const updatePlace = { ...DUMMY_PLACES.find(p => p.id === placeId) };
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
    updatePlace.title = title;
    updatePlace.description = description;

    DUMMY_PLACES[placeIndex] = updatePlace;

    res.status(200).json({ place: updatePlace });
};

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;
    if (!DUMMY_PLACES.find(p => p.id === placeId)) {
        throw new HttpError('could not find a place for that id', 404);
    }


    DUMMY_PLACES = DUMMY_PLACES.find(p => p.id !== placeId);
    res.status(200).json({ message: 'Deleted place' });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;