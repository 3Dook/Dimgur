const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    museum: [{id: String, date: Date}]
});

UserSchema.plugin(passportLocalMongoose); // username and passport schema are added in

module.exports = mongoose.model('User', UserSchema);