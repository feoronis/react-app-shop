const mongoose = require("mongoose");

const publicationSchema = new mongoose.Schema({
    name: String,
    date: Date,
    pathP: String,
    description: String,
    price: String,

});

exports.PublicationModel = mongoose.model("Publication", publicationSchema);
