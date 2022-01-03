const mongoose = require("mongoose");

module.exports = mongoose.model(
    "received-ratings",
    new mongoose.Schema({
        Vertino: String,
        Vertinimas: Number,
        Komentaras: String,
    })
);
