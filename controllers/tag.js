const router = require("express").Router()
const { model } = require("mongoose")
const db = require("../models")

// GET the tags
router.get("/", async (req, res) => {
	try {
		res.send("get tags")
	} catch (error) {
		if (error.name === "ValidationError") {
			res.status(400).json({ msg: error.message })
		} else {
			res.status(500).json({ msg: "server error" })
		}
	}
})

// POST a tag
router.post("/", async (req, res) => {
	try {
		// Add a tag to the DB
		const newTag = await db.Tag.create(req.body) //maybe move to profile?
		res.status(201).json(newTag)
	} catch (error) {
		if (error.name === "ValidationError") {
			res.status(400).json({ msg: error.message })
		} else {
			res.status(500).json({ msg: "server error" })
		}
	}
})

// DELETE a tag
router.delete("/:id", async (req, res) => {
	try {
		const id = req.params.id
		await db.Tag.findByIdAndDelete(id)
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
