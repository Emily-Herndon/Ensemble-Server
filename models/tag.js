const mongoose = require("mongoose")

// Tag Schema
const TagSchema = new mongoose.Schema({
	tagName: {
		type: String,
	},
	clothes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Clothes",
		},
	],
	outfits: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Outfit",
		},
	],
})

module.exports = mongoose.model("Tag", TagSchema)
