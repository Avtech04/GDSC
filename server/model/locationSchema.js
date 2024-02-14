const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    ngoName:String,
    NgoId:String,
    description:String,
    peoples:Number,
    address:String,
    coordinates:[],
},{timestamps:true});


const locationdb = new mongoose.model("locations",locationSchema);

module.exports = locationdb;