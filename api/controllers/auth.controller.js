import bcryptjs from "bcryptjs"
import User from "../models/user.model.js"

export const signup = async (req, res) => {
	try {
		const { username, email, password } = req.body

		// Check if password is provided
		if (!password) {
			return res.status(400).json({ error: "Password is required" })
		}

		// Hash the password asynchronously
		const hashedPassword = await bcryptjs.hash(password, 10)

		const newUser = new User({
			username,
			email,
			password: hashedPassword, // Save the hashed password
		})

		await newUser.save()

		res.status(201).json("User created")
	} catch (error) {
		console.error("Error during signup:", error)

		if (error.code === 11000) {
			// Unique constraint violation (duplicate key)
			return res.status(400).json({ error: "Username or email already exists" })
		}

		res.status(500).json({ error: "Internal Server Error" })
	}
}
