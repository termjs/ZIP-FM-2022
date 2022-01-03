const mongoose = require("mongoose");

module.exports = mongoose.model(
    "received-applications",
    new mongoose.Schema({
        Pildo: String,
        Juodasis: String,
        ServerisID: String,
        Reason: String,
        createdAt: {
            type: Date,
            default: Date.now,
        },
    })
);
