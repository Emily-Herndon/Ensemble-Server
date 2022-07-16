const mongoose = require("mongoose")

// Clothes Schema
const ClothesSchema = new mongoose.Schema({
	clothesName: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
    imageId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Image",
	},
	outfits: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Outfit",
		},
	],
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	tags: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Tag",
		},
	],
})

module.exports = mongoose.model("Clothes", ClothesSchema)
