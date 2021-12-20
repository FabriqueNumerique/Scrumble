const express = require("express")
const router = express.Router()
const Daylicarte = require("../models/Daylicartes");

router.get("/dayli", async (req, res) => {
	const daylicarte = await Daylicarte.find()
	res.send(daylicarte);
})

router.get("/dayli/:id", async (req, res) => {
	const regle = await Daylicarte.findOne({ _id: req.params.id })
	res.send(regle)
})

router.post("/dayli", async (req, res) => {
	const daylicarte = new Daylicarte({
		titre: req.body.titre,
        contenu: req.body.contenu
	})
	await daylicarte.save()
	res.send(daylicarte)
})

router.patch("/dayli/:id", async (req, res) => {
	try {
		const daylicarte = await Daylicarte.findOne({ _id: req.params.id })

		if (req.body.titre) {
			daylicarte.titre = req.body.titre
		}

		if (req.body.contenu) {
			daylicarte.contenu = req.body.contenu
        }
      
		await daylicarte.save()
		res.send(daylicarte)
	} catch {
		res.status(404)
		res.send({ error: "Daylicarte doesn't exist!" })
	}
})

router.delete("/dayli/:id", async (req, res) => {
	try {
		await Daylicarte.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Regle doesn't exist!" })
	}
})








module.exports = router