const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/Listing.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

// Post Reviews Route - To add a review to a listing
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// Delete review route to handle review deletion
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;