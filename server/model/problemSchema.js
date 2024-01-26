const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
    headline:String,
    description:String,
},{timestamps:true});


const problemdb = new mongoose.model("problems",problemSchema);

module.exports = problemdb;