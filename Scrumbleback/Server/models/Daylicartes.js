const mongoose = require("mongoose");

const schema = mongoose.Schema({
    // _id:String,
	titre: String,
    contenu: String
   
})

module.exports = mongoose.model("Daylicarte", schema)