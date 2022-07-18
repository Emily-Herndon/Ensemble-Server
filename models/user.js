const mongoose = require("mongoose")

// User Schema
const UserSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		userName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		profileImg: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Image",
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
		tags: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Tag",
			},
		]
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model("User", UserSchema)
