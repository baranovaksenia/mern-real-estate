import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"

dotenv.config()

mongoose
	.connect(process.env.MONGO)
	.then(() => {
		console.log("Connected to MongoDB")
	})
	.catch(error => {
		console.error("Error connecting to MongoDB:", error)
	})

const app = express()

app.listen(3000, () => {
	console.log("Listening on port 3000")
})