const router = require("express").Router()
const { model } = require("mongoose")
const db = require("../models")

// GET ALL the tags
router.get("/", async (req, res) => {
	try {
		const allTags = await db.Tag.find({})
		res.json(allTags)
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

// GET /tags/:id specific tag
router.get("/:id", async (req, res) => {
	try {
		const tagId = req.params.id
		// figure out how to get current user from front end to save relationship
		const foundTag = await db.Tag.findById(tagId)
		res.json(foundTag)
	} catch (error) {
		if (error.name === "ValidationError") {
			res.status(400).json({ msg: error.message })
		} else {
			res.status(500).json({ msg: "server error" })
		}
	}
})

module.exports = router
