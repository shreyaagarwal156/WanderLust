const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        country: Joi.string().required(),
        image: Joi.object({
            url: Joi.string().allow("", null)
        }),
        category: Joi.string().valid('Adventure', 'Budget', 'Romantic', 'OMG!', 'Room', 'Trending', 'View', 'Beach', 'CityLife', 'Mountain', 'Castles', 'Amazing Pools', 'Camping', 'Farms', 'Arctic', 'Boat', 'Dome', 'Golfing').required()
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    }).required()
});