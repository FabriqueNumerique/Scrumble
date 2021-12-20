const express = require("express")
const router = express.Router()
const Paquet2A1 = require("../../models/paquet2A1");

router.get("/paquet2.1", async (req, res) => {
    const paquet2A1 = await Paquet2A1.find()
    res.send(paquet2A1);
})

router.get("/paquet2.1/:id", async (req, res) => {
    const paquet2A1 = await Paquet2A1.findOne({
        _id: req.params.id
    })
    res.send(paquet2A1)
})

router.post("/paquet2.1", async (req, res) => {
    console.log(req.body);
    const paquet2A1 = new Paquet2A1({
        id: req.body.id,
        titre: req.body.titre,
        contenu: req.body.contenu,
        img: req.body.img,
        dposition: req.body.dposition,
        Dependance: req.body.Dependance,
        taille: req.body.taille,
        value: req.body.value
    })
    await paquet2A2.save()
    res.send(paquet2A2);
})


router.patch("/paquet2.2/:id", async (req, res) => {
    try {
        const paquet2A2 = await Paquet2A2.findOne({
            _id: req.params.id
        })
        if (req.body.id) {
            paquet2A1.id = req.body.id
        }
        if (req.body.titre) {
            paquet2A1.titre = req.body.titre
        }

        if (req.body.contenu) {
            paquet2A1.contenu = req.body.contenu
        }
        if (req.body.img) {
            paquet2A1.img = req.body.img
        }
        if (req.body.dposition) {
            paquet2A1.dposition = req.body.dposition
        }
        if (req.body.Dependance) {
            paquet2A1.Dependance = req.body.Dependance
        }
        if (req.body.taille) {
            paquet2A1.taille = req.body.taille
        }
        if (req.body.value) {
            paquet2A1.value = req.body.value
        }
        await paquet2A1.save()
        res.send(paquet2A1)
    } catch {
        res.status(404)
        res.send({
            error: "paquet2A1 doesn't exist!"
        })
    }
})

router.delete("/paquet2.1/:id", async (req, res) => {
    try {
        await Paquet2A1.deleteOne({
            _id: req.params.id
        })
        res.status(304).send()
    } catch {
        res.status(404)
        res.send({
            error: "paquet2.1 doesn't exist!"
        })
    }
})

module.exports = router