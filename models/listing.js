const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Review = require('./review.js');

const listingSchema = new schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: String,
        url: String
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: String,
        enum: ['Adventure', 'Budget', 'Romantic', 'OMG!', 'Room', 'Trending', 'View', 'Beach', 'CityLife']
    }
});

listingSchema.post('findOneAndDelete', async (listing) => {
    if(listing.reviews.length) {
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

const listing = mongoose.model('listing', listingSchema);
module.exports = listing;