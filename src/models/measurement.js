const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const MeasurementSchema = mongoose.Schema({
	userId: {type: ObjectId, required: true},
	//to filter weight, length, headCir
	type: String,
    date: {type: Date, required: true},
    content: String
});

const Measurement = mongoose.model('Measurement', MeasurementSchema);

module.exports = Measurement; 