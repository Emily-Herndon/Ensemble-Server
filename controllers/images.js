const router = require("express").Router()
const { model } = require("mongoose")
const {uploadToCloudinary, removeFromCloudinary} = require("../services/cloudinary")
const db = require("../models")
const multer = require("multer")
const { unlinkSync } = require('fs')

// setting up the multer engine
const uploads = multer({dest: "uploads/"})

router.post("/upload", uploads.single('image'), async (req,res) => {
    try {
        const data = await uploadToCloudinary(req.file.path,"clothes-images")
        const image = await db.Image.create({
            imageUrl: data.url,
            publicId: data.public_id
        })
        unlinkSync(req.file.path)
        res.status(200).json({publicId:image.publicId})
    } catch (error) {
        res.status(400).send(error)
        console.warn(error)
    }
})

module.exports = router