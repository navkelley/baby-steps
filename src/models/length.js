const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const LengthSchema = mongoose.Schema({
	userId: {type: ObjectId, required: true}, 
    date: {type: Date, required: true},
    content: String
});

const Length = mongoose.model("Length", LengthSchema);

module.exports = Length; 