import express from "express"
import { signup } from "../controllers/auth.controller.js"

// Create a new router instance
const router = express.Router()

// Handle GET request to /signup route by calling the signup function from auth.controller.js
router.post("/signup", signup)

// Export the router
export default router
