const mongoose = require("mongoose")

const ImagesSchema = new mongoose.Schema({
    imgUrl: {
        type: String
    },
    publicId: {
        type: String
    },
    user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
    clothing: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Clothes",
	},
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Image", ImagesSchema)