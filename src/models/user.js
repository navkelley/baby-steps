const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const UserSchema = mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, unique: true, required: true}
});

const User = mongoose.model('User', UserSchema);

module.exports = User; 