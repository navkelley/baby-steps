const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId; 

const NarrativeSchema = mongoose.Schema({
	userId: {type: ObjectId, required: false},
    title: {type: String, unique: true, required: true},
    date: Date,
	content: String
});

const Narrative = mongoose.model('Narrative', NarrativeSchema);

module.exports = Narrative; 
