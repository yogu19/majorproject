const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middlerware");
const listingConroller = require("../controllers/listings");
const multer  = require('multer');
const {storage} = require("../cloudConfig");
const upload = multer({ storage});

router.route('/')
.get( wrapAsync(listingConroller.index))
.post(isLoggedIn,validateListing,upload.single('listing[image]'),wrapAsync(listingConroller.createListing));

router.get("/new", isLoggedIn,listingConroller.renderNewForm);

router.route('/:id')
.put(isLoggedIn,isOwner,validateListing,upload.single('listing[image]'),wrapAsync(listingConroller.updateListing))
.get(wrapAsync(listingConroller.showListing))
.delete(isOwner,isLoggedIn, wrapAsync(listingConroller.destroyListing));

router.get("/:id/edit", isLoggedIn, wrapAsync(listingConroller.editListing));

module.exports = router;
