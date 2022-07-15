const router = require("express").Router()
const { model } = require("mongoose")
const db = require("../models")

//GET /outfits -- gets all the outfits
router.get("/", async (req, res) => {
	try {
		//finds al of the outfits in the database
		const allOutfits = await db.Outfit.find({})

		res.status(200).json(allOutfits)
	} catch (error) {
		if (error.name === "ValidationError") {
			res.status(400).json({ msg: error.message })
		} else {
			res.status(500).json({ msg: "server error" })
		}
	}
})

//POST /outfits -- create a new outfit
router.post("/", async (req, res) => {
	try {
		//create a new outfit using req.body
		const newOutfit = await db.Outfit.create(req.body)
		res.status(201).json(newOutfit)
	} catch (error) {
		if (error.name === "ValidationError") {
			res.status(400).json({ msg: error.message })
		} else {
			res.status(500).json({ msg: "server error" })
		}
	}
})

//PUT /outfits/:id -- edit an outfit
router.put("/:id", async (req, res) => {
	try {
		//find the outfit by id in params
		const id = req.params.id
		const options = { new: true } //return the updated bounty to us
		//find outfit in the database with the help of an id
		const updatedOutfit = await db.Outfit.findByIdAndUpdate(
			id,
			req.body,
			options
		)
		//the update bounty back to client
		res.json(updatedOutfit)
	} catch (error) {
		if (error.name === "ValidationError") {
			res.status(400).json({ msg: error.message })
		} else {
			res.status(500).json({ msg: "server error" })
		}
	}
})

//DELETE /outfits/:id -- delete a specific outfit
router.delete("/:id", async (req, res) => {
	try {
		//define a id that needs to be deleted with params
		const id = req.params.id
		//find and delete a specific outfit
		await db.Outfit.findByIdAndDelete(id)
		res.sendStatus(204)
	} catch (error) {
		if (error.name === "ValidationError") {
			res.status(400).json({ msg: error.message })
		} else {
			res.status(500).json({ msg: "server error" })
		}
	}
})
module.exports = router
