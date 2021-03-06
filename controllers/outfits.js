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
		// console.log("outfit reqbody",req.body)
		const user = req.body.user
		// create a new outfit using req.body
		const newOutfit = await db.Outfit.create(req.body)
		// console.log("NEWOUTFIT",newOutfit)
		// await newOutfit.save()

		// find top clothes and push outfit in
		const foundTop = await db.Clothes.findById(req.body.top._id)
		// console.log("foundTop",foundTop)
		foundTop.outfits.push(newOutfit)

		// find bottom clothes and push outfit in
		const foundBottom = await db.Clothes.findById(req.body.bottom._id)
		// console.log("foundBottom",foundBottom)
		foundBottom.outfits.push(newOutfit)

		// find shoes clothes and push outfit in
		const foundShoes = await db.Clothes.findById(req.body.shoes._id)
		// console.log("foundShoes",foundShoes)
		foundShoes.outfits.push(newOutfit)

		// find user
		const foundUser = await db.User.findById(user)
		.populate({path: 'outfits'})
		console.log("FOUNDUSER",foundUser)
		// push outfit to user's outfit array
		foundUser.outfits.push(newOutfit)
		await foundUser.save()
		console.log("FOUNDUSER AFTER", foundUser)
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
		res.status(200).json(updatedOutfit)
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
