const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    username: {type: String, unique: true, required: true, trim: true},
    password: {type: String, required: true, trim: true}

});

UserSchema.methods.validatePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isValid) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, isValid);
    });
};

const User = mongoose.model('User', UserSchema);

module.exports = User; 