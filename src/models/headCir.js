const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const HeadCirSchema = mongoose.Schema({
	userId: {type: ObjectId, required: true}, 
    date: {type: Date, required: true},
    content: String
});

const HeadCir = mongoose.model('HeadCir', HeadCirSchema);

module.exports = HeadCir; 