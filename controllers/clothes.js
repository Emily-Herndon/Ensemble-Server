const router = require("express").Router()
const { model } = require("mongoose")
const db = require("../models")

//Post /clothes -- create a new clothing item
router.post("/", async (req, res) => {
	try {
		
		// console.log(req.body)
		// console.log(req)
		// res.sendStatus(200)
		// return
		const user = req.body.user
		console.log("user",user)

		//create the clothes in the db
		const newClothes = await db.Clothes.create(req.body)
		console.log("newClothes",newClothes)
		// find current user
		const foundUser = await db.User.findById(user)
		console.log("foundUser",foundUser)
		// push new clothes into found user's clothes relationship
		foundUser.clothes.push(newClothes)
		// save user
		foundUser.save()
		res.status(201).json(newClothes)
	} catch (error) {
		if (error.name === "ValidationError") {
			res.status(400).json({ msg: error.message })
		} else {
			// res.status(500).json({ msg: "server error" })
			console.warn(error)
			res.status(500).json({error})
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
