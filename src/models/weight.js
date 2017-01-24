const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const WeightSchema = mongoose.Schema({
	userId: {type: ObjectId, required: true}, 
    date: {type: Date, required: true},
    content: String
});

const Weight = mongoose.model('Weight', WeightSchema);

module.exports = Weight; 