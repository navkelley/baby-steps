const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;
const bcrypt = require("bcrypt");
const hash = require("bcrypt").hash;
const compare = require("bcrypt").compare;

const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true, trim: true, index: true},
    password: {type: String, required: true, trim: true},
    email: {type: String, unique: true},
    name: {type: String}
});

UserSchema.pre('save', function (next) {
    const SaltRounds = 10;
    hash(this.password, SaltRounds, (err, hashPassword) => {
        if (err) { return console.error(err); }
        this.password = hashPassword;
        next();
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
    compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err); }
        callback(null, isMatch);
    });
};

module.exports = mongoose.model("User", UserSchema);



