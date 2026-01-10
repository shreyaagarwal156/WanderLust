const express = require('express');
const router = express.Router();
const Listing = require("../models/Listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingsController = require("../controllers/listings.js");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//Index Route - To show all listings
router.get("/", wrapAsync (listingsController.index));

//Create New Route - To create a new listing
router.get("/new", isLoggedIn, listingsController.renderNewForm);

//show Route - To show details of a particular listing
router.get("/:id", wrapAsync (listingsController.showListing));

//Create Route - To add a new listing to the database
router.post("/", isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync (listingsController.createListing));

//Edit Route - To edit an existing listing
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync (listingsController.renderEditForm));

//Update Route - To update the listing in the database
router.put("/:id", isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingsController.updateListing));

//Delete Route - To delete a listing from the database
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingsController.destroyListing));

module.exports = router;
