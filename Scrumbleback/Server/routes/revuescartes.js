const express = require("express")
const router = express.Router()
const Revuecartes = require("../models/Revuecartes");

router.get("/revuecarte", async (req, res) => {
	const revuecarte = await Revuecartes.find()
	res.send(revuecarte);
})

router.get("/revuecarte/:id", async (req, res) => {
	const revuecarte= await Revuecartes.findOne({ _id: req.params.id })
	res.send(revuecarte)
})

router.post("/revuecarte", async (req, res) => {
	const revuecarte = new Revuecartes({
		titre: req.body.titre,
        contenu: req.body.contenu
	})
	await revuecarte.save()
	res.send(revuecarte)
})

router.patch("/revuecarte/:id", async (req, res) => {
	try {
		const revuecarte = await Revuecartes.findOne({ _id: req.params.id })

		if (req.body.titre) {
			revuecarte.titre = req.body.titre
		}

		if (req.body.contenu) {
			revuecarte.contenu = req.body.contenu
        }
      
		await revuecarte.save()
		res.send(revuecarte)
	} catch {
		res.status(404)
		res.send({ error: "RevueCarte doesn't exist!" })
	}
})

router.delete("/revuecarte/:id", async (req, res) => {
	try {
		await Revuecartes.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Regle doesn't exist!" })
	}
})








module.exports = router