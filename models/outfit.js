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
},
{
	timestamps: true,
})

module.exports = mongoose.model("Outfit", OutfitSchema)
