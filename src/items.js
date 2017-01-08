let mongoose = require('mongoose');

let narrativeSchema = mongoose.Schema({
    title: {type: String, unique: true, required: true},
    date: Date,
	content: String
});

let measurementSchema = mongoose.Schema({
    date: {type: Date, required: true},
    content: String
});

let userSchema = mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, unique: true, required: true}
});

let Narrative = mongoose.model('Narrative', narrativeSchema);
let Measurement = mongoose.model('Measurement', measurementSchema);
let User = mongoose.model('User', userSchema);

module.exports = Narrative;
module.exports = Measurement;
module.exports = User; 