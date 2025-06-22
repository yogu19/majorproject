const Listing = require("../models/listing");

const { Client } = require("@googlemaps/google-maps-services-js");
const mapToken = process.env.MAP_TOKEN;
const client = new Client({});

module.exports.index = async (req, res) => {
  const search = req.query.search;
  const { category } = req.query;

  if (category) {
    const allListings = await Listing.find({ category });
    res.render("listing/index", { allListings });
  } 
  else if(typeof req.query.search !== "undefined"){
    const allListings = await Listing.find({ title: { $regex: search, $options: "i" } });
    res.render("listing/index", { allListings });
  }else{
    const allListings = await Listing.find({});
    res.render("listing/index", { allListings });
  }
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
     return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url.replace("/upload","/upload/h_250,w_250")
  res.render("listing/edit.ejs", { listing,originalImageUrl });
};

  module.exports.renderNewForm = (req, res) => {
  res.render("listing/new.ejs");
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  const response = await client.geocode({
    params: {
      address: req.body.listing.location,
      key: mapToken,
    },
  });

  let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

  if (response.data.status === 'OK'&& response.data.results.length > 0) {
    const { lat, lng } = response.data.results[0].geometry.location;
    listing.geometry = {type: 'Point',coordinates: [lng, lat]};
  } else {
    req.flash("error", "Location not found");
    return res.redirect("back");
  }

  if (req.file?.path) {
    listing.image = { url: req.file.path, filename: req.file.filename };
  }
  
  await listing.save();
  req.flash("success", "Listing updated");
  return res.redirect(`/listings/${id}`);
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    res.redirect("/listings");
  }
  
  res.render("listing/show", { listing });
};

module.exports.createListing = async (req, res, next) => {  
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);

  const response = await client.geocode({
    params: {address: req.body.listing.location, key: mapToken,},
  });

  console.log("connect");
  if (response.data.status === 'OK') {
    const { lat, lng } = response.data.results[0].geometry.location;
    newListing.geometry = {type: 'Point', coordinates: [lng, lat]}
    newListing.owner = req.user._id;
    newListing.image = {url,filename};

  } else {
    return req.flash("error", "Location not found");
  }

  await newListing.save();
  console.log(newListing);
  req.flash("success", "New Listing Created");
  res.redirect(`/listings`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletelisting = await Listing.findByIdAndDelete(id);
  console.log(deletelisting);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};
