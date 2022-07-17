const router = require("express").Router()
const db = require("../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.post("/register", async (req, res) => {
  try {
    // res.send("user registered")
    // check if the user exists already
    const findUserName = await db.User.findOne({
      userName:req.body.userName
    })

    if (findUserName) {
      // stop the route and send a response saying the user exists
      return res.status(400).json({ msg: "User Name already exists" })
    }
    
    const findUserEmail = await db.User.findOne({
      email: req.body.email,
    })

    // disallow users from registering twice
    if (findUserEmail) {
      // stop the route and send a response saying the user exists
      return res.status(400).json({ msg: "email already exists" })
    }

    // hash the user's password
    const password = req.body.password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // create a new user with the hashed password
    const newUser = new db.User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    })
    await newUser.save()
    console.log("new user registered")
    // sign the user in by sending a valid jwt back
    // create the jwt payload
    const payload = {
      userName: newUser.userName,
      email: newUser.email,
      id: newUser.id,
    }
    // sign the token and send it back
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" }) // expires in one day
    res.status(200).json({ token })
  } catch (err) {
    console.warn(err)
    // handle validation errors
    if (err.name === "ValidationError") {
      res.status(400).json({ msg: err.message })
    } else {
      // handle all other errors
      console.log(err)
      res.status(500).json({ msg: "server error 500" })
    }
  }
})

//POST /users/login -- logs a person in 
router.post("/login", async (req, res) => {
  try {
    // all the data will come in on the req.body
    // try to find the user in the database
    const foundUser = await db.User.findOne({
      email: req.body.email,
    })
    const noLoginMessage = "Incorrect email or password."

    // if the user is not found, return send a status of 400 let the user know login failed
    if (!foundUser) {
      console.log("incorrect email", req.body)
      return res.status(400).json({ msg: noLoginMessage })
    }

    // check if the supplied password matches the hash in the db
    const passwordCheck = await bcrypt.compare(
      req.body.password,
      foundUser.password
    )
    // if they do not match, return and let the user know that login has failed
    if (!passwordCheck) {
      console.log("incorrect password", req.body)
      return res.status(400).json({ msg: noLoginMessage })
    }

    // create a jwt payload
    const payload = {
      userName: foundUser.userName,
      email: foundUser.email,
      id: foundUser.id,
    }
    // sign the jwt and send it back
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.json({ token })
  } catch (err) {
    console.warn(err)
    // handle validation errors
    if (err.name === "ValidationError") {
      res.status(400).json({ msg: err.message })
    } else {
      // handle all other errors
      res.status(500).json({ msg: "server error 500" })
    }
  }
})


router.get("/profile/:userName", async (req, res) => {
	try {

		const userName = req.params.userName
		const user = await db.User.findOne({userName: userName}).populate([{
			path:"clothes",
      populate:{
        path:"imageId"
      }
		},{
			path:"outfits"
		}])
    // console.log("user",user)
		res.status(200).json(user)
		// res.send("hi")
	} catch (error) {
		console.warn(error)
	}
})

router.put("/profile/:userName", async (req, res) => {
	try {
		const userName = {
			userName: req.params.userName
		}
    const email = {
      email: req.body.email
    }
    const foundUserName = await db.User.findOne(userName)
    // console.log("foundUserName", foundUserName)
    if (foundUserName) {
      res.status(400).json({msg: "User Name already exists"})
      return
    }
    const foundEmail = await db.User.findOne(email)
    if (foundEmail) {
      res.status(400).json({msg: "Email already exists"})
      return
    }

		// search for the id in the db, and update using the req.body
		const options = { new: true } 
		const updatedProfile = await db.User.findOneAndUpdate(userName, req.body, options)
		// console.log("updatedProfile: ", updatedProfile)
		res.status(200).json(updatedProfile)
	} catch (error) {
		console.warn(error)
		res.status(500).json({ msg: 'server error' })
	}
})

router.get("/:userId", async (req,res) =>{
  try {
    const foundUser = await db.User.findById(req.params.userId)
    res.status(200).json(foundUser)
  } catch (error) {
    console.warn(error)
  }
})

//PUT /users/changePassword -- changes a users password 
router.put("/changePassword", async (req, res) => {
	try {
		
    console.log("reqBody:",req.body)
    // find user by userId via req.body
		const foundUser = await db.User.findById(req.body.userId)

		// check if the supplied password matches the hash in the db
		const passwordCheck = await bcrypt.compare(req.body.currentPassword, foundUser.password)
    console.log("passwordCheck",passwordCheck)
		// if they do not match, return and let the user know that login has failed
		if (!passwordCheck) {
			// console.log('incorrect password', req.body.currentPassword)
			return res.status(400).json({ msg: "Incorrect Current Password" })
		} else {
			const saltRounds = 12
			const hashedPassword = await bcrypt.hash(req.body.newPassword, saltRounds)
			foundUser.password = hashedPassword
			await foundUser.save()
			return res.status(200).json({ msg: "Password was updated" })
		}
	} catch (error) {
		console.warn(error)
		res.status(500).json({ msg: "Oops, something went wrong" })
	}
})

module.exports = router
