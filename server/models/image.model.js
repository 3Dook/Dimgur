const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imageSchema = new Schema({
    owner: {type: ObjectId},
    title: {type: String, required: true},
    date: {type: Date, default: Date.now},
    description: {type: String},
    path: {type: String}
})


module.exports = mongoose.model('Img', imageSchema);