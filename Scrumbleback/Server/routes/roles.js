const express = require("express")
const router = express.Router()
const User= require("../models/user");
console.log(User);

router.get("/rolelist", async (req, res) => {
	const user = await User.find();
	res.send(user);
})


router.get("/rolelist/:id", async (req, res) => {
	const user= await User.findOne({ _id: req.params.id })
	res.send(user)
})

router.patch("/rolelist/:id", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id })

		// if (req.body.email) {
		// 	user.email = req.body.email
		// }

		if (req.body.role) {
			user.role = req.body.role
        }
       
		await user.save()
		res.send(user)
	} catch {
		res.status(404)
		res.send({ error: "Role doesn't exist!" })
	}
})

router.delete("/rolelist/:id", async (req, res) => {
	try {
		await User.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Role doesn't exist!" })
	}
})








module.exports = router