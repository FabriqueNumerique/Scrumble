const express = require("express")
const router = express.Router()
const Paquet3 = require("../../models/paquet3");

router.get("/paquet3", async (req, res) => {
    const paquet3 = await Paquet3.find()
    res.send(paquet3);
})

router.get("/paquet3/:id", async (req, res) => {
    const paquet3 = await Paquet3.findOne({
        _id: req.params.id
    })
    res.send(paquet3)
})

router.post("/paquet3", async (req, res) => {
    console.log(req.body);
    const paquet3 = new Paquet3({
        id: req.body.id,
        titre: req.body.titre,
        contenu: req.body.contenu,
        img: req.body.img,
        dposition: req.body.dposition,
        Dependance: req.body.Dependance,
        taille: req.body.taille,
        value: req.body.value
    })
    await paquet3.save()
    res.send(paquet3)
})


router.patch("/paquet3/:id", async (req, res) => {
    try {
        const paquet3 = await Paquet3.findOne({
            _id: req.params.id
        })
        if (req.body.id) {
            paquet3.id = req.body.id
        }
        if (req.body.titre) {
            paquet3.titre = req.body.titre
        }

        if (req.body.contenu) {
            paquet3.contenu = req.body.contenu
        }
        if (req.body.img) {
            paquet3.img = req.body.img
        }
        if (req.body.dposition) {
            paquet3.dposition = req.body.dposition
        }
        if (req.body.Dependance) {
            paquet3.Dependance = req.body.Dependance
        }
        if (req.body.taille) {
            paquet3.taille = req.body.taille
        }
        if (req.body.value) {
            paquet3.value = req.body.value
        }
        await paquet3.save()
        res.send(paquet3)
    } catch {
        res.status(404)
        res.send({
            error: "paquet3 doesn't exist!"
        })
    }
})

router.delete("/paquet3/:id", async (req, res) => {
    try {
        await Paquet3.deleteOne({
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