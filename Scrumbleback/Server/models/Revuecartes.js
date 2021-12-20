const mongoose = require("mongoose");

const schema = mongoose.Schema({
	titre: String,
    contenu: String
   
})

module.exports = mongoose.model("Revuecartes", schema)