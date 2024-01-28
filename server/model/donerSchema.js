const mongoose = require("mongoose");

const donerSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String
},{timestamps:true});


const donerdb = new mongoose.model("doners",donerSchema);

module.exports = donerdb;