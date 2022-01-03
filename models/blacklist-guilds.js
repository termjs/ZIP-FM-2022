const mongoose = require("mongoose");

module.exports = mongoose.model(
    "blacklisted-guilds",
    new mongoose.Schema({
        Server: String,
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }).index({ Server: 1 })
);
