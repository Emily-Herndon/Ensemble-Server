const router = require("express").Router()
const { model } = require("mongoose")
const db = require("../models")

//Post /clothes -- create a new clothing item
router.post("/", async (req, res) => {
	try {
		// set req.body.user to user
		const user = req.body.user

		// configure clothes data before creating
		const clothesData = {
			clothesName: req.body.clothesName,
			category: req.body.category,
			status: req.body.status,
			user: user,
			imageId: req.body.imageId
		}

		//create the clothes in the db
		const newClothes = await db.Clothes.create(clothesData)
		// console.log("newClothes",newClothes)
		// console.log("newClothes",newClothes)
		// find current user
		const foundUser = await db.User.findById(user).populate({path: 'clothes'})
		console.log(foundUser)
		// push new clothes into found user's clothes relationship
		foundUser.clothes.push(newClothes)
		// save user
		foundUser.save()
		
		// find current Image
		const foundImg = await db.Image.findById(req.body.imageId)
		// console.log("foundImg",foundImg)
		// set user to Image
		foundImg.user = foundUser
		// save img
		foundImg.save()
		await newClothes.populate({
			path:"imageId"
		})
		// console.log(newClothes)
		// send back newClothes json
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
		const foundClothes = await db.Clothes.findById(id).populate({path: "user"})
		// console.log(foundClothes)
		const foundUser = await db.User.findById(foundClothes.user._id)
		console.log("FOUND USER",foundUser)
		const deletedClothing = foundUser.clothes.indexOf(foundClothes._id)
		// console.log(deletedClothing)
		// remove specific clothing item from current users clothes array
		const spliced = foundUser.clothes.splice(deletedClothing, 1)
		console.log("SPLICED", spliced)
		//find and delete the clothes from bd
		await db.Clothes.findByIdAndDelete(id)
		await foundUser.save()
		console.log("FOUND USER AFTER", foundUser)
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
