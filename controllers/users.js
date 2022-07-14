const router = require("express").Router()
const db = require("../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.post("/register", async (req, res) => {
	try {
		res.send(" POST register")
	} catch (error) {
		console.warn(error)
	}
})

router.post("/login", async (req, res) => {
	try {
		res.send("POST login")
	} catch (error) {
		console.warn(error)
	}
})

router.get("/profile/:userName", async (req, res) => {
	try {
		res.send("GET profile/:userName")
	} catch (error) {
		console.warn(error)
	}
})

router.put("/profile/:id", async (req, res) => {
	try {
		res.send(" PUT profile/:id")
	} catch (error) {
		console.warn(error)
	}
})

router.put("/changepassword", async (req, res) => {
	try {
		res.send(" PUT changepassword")
	} catch (error) {
		console.warn(error)
	}
})

module.exports = router
