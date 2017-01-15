const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const UserSchema = mongoose.Schema({
    username: {type: String, unique: true, required: true, trim: true},
    password: {type: String, required: true, trim: true}

});

const User = mongoose.model('User', UserSchema);

module.exports = User; 