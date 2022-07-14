const mongoose = require("mongoose")

// Outfit Schema
const OutfitSchema = new mongoose.Schema({
	outfitName: {
		type: String,
		required: true,
	},
	top: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Clothes",
	},
	bottom: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Clothes",
	},
	shoes: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Clothes",
	},
	accessories: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Clothes",
		},
	],
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Owner",
	},
	tags: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Tag",
		},
	],
})

module.exports = mongoose.model("Outfit", OutfitSchema)
