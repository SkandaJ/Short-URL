const shortid = require('shortid');
const URL = require('../models/url');

async function handlegenerateShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "URL is required" });

    const shortID = shortid.generate();
    const newURL = new URL({
        shortId: shortID, 
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });
    
    await newURL.save();
    return res.render("home", {
        id:shortID,
    });
}

module.exports = {
    handlegenerateShortURL,
};
