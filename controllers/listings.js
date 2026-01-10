const Listing = require("../models/Listing");

module.exports.index = async (req, res) => {
    const { search, category } = req.query;
    let allListings = [];

    try {
        if (search) {
            // SEARCH LOGIC: Check Title, Location, Country, and Category
            allListings = await Listing.find({
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { location: { $regex: search, $options: "i" } },
                    { country: { $regex: search, $options: "i" } },
                    { category: { $regex: search, $options: "i" } }
                ]
            });
        } else if (category) {
            // FILTER LOGIC
            allListings = await Listing.find({ category });
        } else {
            // SHOW ALL LOGIC
            allListings = await Listing.find({});
        }
    } catch(err) {
        console.log("Search Error:", err);
    }

    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
    const {id} = req.params;
    const listing =  await Listing.findById(id).populate({path: "reviews", populate:{path: "author",},}).populate("owner");
    if(!listing){
        req.flash("error", "Cannot find that listing!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
}

module.exports.createListing = async (req, res, next) => {
        let url = req.file.path;
        let filename = req.file.filename;
        req.body.listing.image = {url: url, filename: filename};

        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = req.body.listing.image;
        await newListing.save();
        req.flash("success", "Successfully created a new listing!");
        res.redirect("/listings");
}

module.exports.renderEditForm = async (req, res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Cannot find that listing!");
        return res.redirect("/listings");
    }
    let originalUrl =  listing.image.url;
    originalUrl = originalUrl.replace("/upload", "/upload/h_200,w_250");
    res.render("listings/edit.ejs", {listing, originalUrl});
}

module.exports.updateListing =  async (req, res) => {
    const {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    if(typeof req.file !== 'undefined'){
        let url = req.file.path;
        let filename = req.file.filename;
        req.body.listing.image = {url: url, filename: filename};
        listing.image = req.body.listing.image;
        await listing.save();
    }
    req.flash("success", "Successfully updated the listing!");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted the listing!");
    res.redirect("/listings");
}
