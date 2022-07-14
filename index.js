require("dotenv").config()
require("./models") // connect to the db
const express = require("express")
const cors = require("cors")

// app config/middlewares
const app = express()
const PORT = process.env.PORT || 8000
app.use(cors())
app.use(express.json()) //json req.bodies
// static upload folder for images
app.use(express.static("uploads"))

app.use("/users", require("./controllers/users"))

app.listen(PORT, () => {
	console.log(`is the PORT ${PORT} that I hear? 🌽`)
})
