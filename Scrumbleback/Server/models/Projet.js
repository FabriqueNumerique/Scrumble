const mongoose = require("mongoose");

const schema = mongoose.Schema({
    titre:String,
    description:String,
    stories:Array
})

module.exports = mongoose.model("Projet", schema)