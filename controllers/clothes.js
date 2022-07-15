const router = require("express").Router()
const { model } = require("mongoose")
const db = require("../models")

//Post /clothes -- create a new clothing item
router.post("/", async (req, res) => {
	try {
		//create the clothes in the db
		const newClothes = await db.Clothes.create(req.body)
		// find current user
		const findUser = db.User.findOne({})
		// push new clothes into found user's clothes relationship
		// add user to clothes relationship
		// save both
		res.status(201).json(newClothes)
	} catch (error) {
		if (error.name === "ValidationError") {
			res.status(400).json({ msg: error.message })
		} else {
			res.status(500).json({ msg: "server error" })
		}
	}
})

//PUT /clothes/:id -- edit a specific clothing item
router.put("/:id", async (req, res) => {
	try {
		//get id from url params
		const id = req.params.id
		//search for the id in the db, and update the req.body
		const options = { new: true } //return the updated bounty to us
		const updatedClothes = await db.Clothes.findByIdAndUpdate(
			id,
			req.body,
			options
		)
		//the update bounty back to client
		res.json(updatedClothes)
	} catch (error) {
		if (error.name === "ValidationError") {
			res.status(400).json({ msg: error.message })
		} else {
			res.status(500).json({ msg: "server error" })
		}
	}
})

//DELETE /clothes/:id --delete a clothing item
router.delete("/:id", async (req, res) => {
	try {
		// res.send("clothing deleted")
		//get id of specific clothes from the params
		const id = req.params.id
		//find and delete the clothes from bd
		await db.Clothes.findByIdAndDelete(id)
		//send no content status
		res.sendStatus(204)
	} catch (error) {
		//use status
		if (error.name === "ValidationError") {
			res.status(400).json({ msg: error.message })
		} else {
			res.status(500).json({ msg: "server error" })
		}
	}
})
module.exports = router
