const express = require("express")
const router = express.Router()
const Paquet1A1 = require("../../models/paquet1A1");

router.get("/paquet1.1", async (req, res) => {
    const paquet1A1 = await Paquet1A1.find()
    res.send(paquet1A1);
})

router.get("/paquet1.1/:id", async (req, res) => {
    const paquet1A1 = await Paquet1A1.findOne({
        _id: req.params.id
    })
    res.send(paquet1A1)
})

router.post("/paquet1.1", async (req, res) => {
    console.log(req.body);
    const paquet1A1 = new Paquet1A1({
        id: req.body.id,
        titre: req.body.titre,
        contenu: req.body.contenu,
        img: req.body.img,
        dposition: req.body.dposition,
        Dependance: req.body.Dependance,
        taille: req.body.taille,
        value: req.body.value
    })
    await paquet1A1.save()
    res.send(paquet1A1)
})


router.patch("/paquet1.1/:id", async (req, res) => {
    try {
        const paquet1A1 = await Paquet1A1.findOne({
            _id: req.params.id
        })
        if (req.body.id) {
            paquet1A1.id = req.body.id
        }
        if (req.body.titre) {
            paquet1A1.titre = req.body.titre
        }

        if (req.body.contenu) {
            paquet1A1.contenu = req.body.contenu
        }
        if (req.body.img) {
            paquet1A1.img = req.body.img
        }
        if (req.body.dposition) {
            paquet1A1.dposition = req.body.dposition
        }
        if (req.body.Dependance) {
            paquet1A1.Dependance = req.body.Dependance
        }
        if (req.body.taille) {
            paquet1A1.taille = req.body.taille
        }
        if (req.body.value) {
            paquet1A1.value = req.body.value
        }
        await paquet1A1.save()
        res.send(paquet1A1)
    } catch {
        res.status(404)
        res.send({
            error: "paquet1A1 doesn't exist!"
        })
    }
})

router.delete("/paquet1.1/:id", async (req, res) => {
    try {
        await Paquet1A1.deleteOne({
            _id: req.params.id
        })
        res.status(304).send()
    } catch {
        res.status(404)
        res.send({
            error: "paquet3 doesn't exist!"
        })
    }
})

module.exports = router