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
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
},
{
	timestamps: true,
}
)

module.exports = mongoose.model("Tag", TagSchema)
