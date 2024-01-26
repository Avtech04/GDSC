const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    locality:String,
    description:String,
    peoples:Number,
    city:String,
    longitude:Number,
    latitude:Number,
},{timestamps:true});


const locationdb = new mongoose.model("locations",locationSchema);

module.exports = locationdb;