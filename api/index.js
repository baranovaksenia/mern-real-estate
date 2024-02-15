import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"

// Load environment variables from the .env file
dotenv.config()

// Connect to MongoDB using Mongoose
mongoose
	.connect(process.env.MONGO, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to MongoDB")
	})
	.catch(error => {
		console.error("Error connecting to MongoDB:", error)
	})

// Initialize Express application
const app = express()

// Middleware to parse JSON requests
app.use(express.json())

// Start the Express server on port 3000
app.listen(3000, () => {
	console.log("Listening on port 3000")
})

// Define routes for user and authentication
app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)

// Error handling middleware to handle any errors in the application
app.use((error, req, res, next) => {
	// Extract status code and error message from the error object
	const statusCode = error.statusCode || 500
	const message = error.message || "Internal Server Error"

	// Send a JSON response with the error details
	return res.status(statusCode).json({
		success: false,
		statusCode,
		message,
	})
})
