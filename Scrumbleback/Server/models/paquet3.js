const mongoose = require("mongoose");

const schema = mongoose.Schema({
    id:Number,
	titre: String,
    contenu: String,
    img:String,
    dposition:Number,
    Dependance:Number,
    taille:String,
    value:String
   
})

module.exports = mongoose.model("Paquet3", schema)