const express = require("express")
const router = express.Router()
const Paquet1A2 = require("../../models/Paquet1A2");

router.get("/paquet1.2", async (req, res) => {
    const paquet1A2 = await Paquet1A2.find()
    res.send(paquet1A2);
})

router.get("/paquet1.2/:id", async (req, res) => {
    const paquet1A2 = await Paquet1A2.findOne({
        _id: req.params.id
    })
    res.send(paquet1A2)
})

router.post("/paquet1.2", async (req, res) => {
    console.log(req.body);
    const paquet1A2 = new Paquet1A2({
        id: req.body.id,
        titre: req.body.titre,
        contenu: req.body.contenu,
        img: req.body.img,
        dposition: req.body.dposition,
        Dependance: req.body.Dependance,
        taille: req.body.taille,
        value: req.body.value
    })
    await paquet1A2.save()
    res.send(paquet1A2);
})


router.patch("/paquet1.2/:id", async (req, res) => {
    try {
        const paquet1A2 = await Paquet1A2.findOne({
            _id: req.params.id
        })
        if (req.body.id) {
            paquet1A2.id = req.body.id
        }
        if (req.body.titre) {
            paquet1A2.titre = req.body.titre
        }

        if (req.body.contenu) {
            paquet1A2.contenu = req.body.contenu
        }
        if (req.body.img) {
            paquet1A1.img = req.body.img
        }
        if (req.body.dposition) {
            paquet1A2.dposition = req.body.dposition
        }
        if (req.body.Dependance) {
            paquet1A2.Dependance = req.body.Dependance
        }
        if (req.body.taille) {
            paquet1A2.taille = req.body.taille
        }
        if (req.body.value) {
            paquet1A2.value = req.body.value
        }
        await paquet1A2.save()
        res.send(paquet1A2)
    } catch {
        res.status(404)
        res.send({
            error: "paquet1A2 doesn't exist!"
        })
    }
})

router.delete("/paquet1.2/:id", async (req, res) => {
    try {
        await Paquet1A2.deleteOne({
            _id: req.params.id
        })
        res.status(304).send()
    } catch {
        res.status(404)
        res.send({
            error: "paquet2 doesn't exist!"
        })
    }
})

module.exports = router