const express = require("express")
const router = express.Router()
const Paquet2 = require("../../models/paquet2");

router.get("/paquet2", async (req, res) => {
    const paquet2 = await Paquet2.find()
    res.send(paquet2);
})

router.get("/paquet2/:id", async (req, res) => {
    const paquet2 = await Paquet2.findOne({
        _id: req.params.id
    })
    res.send(paquet2)
})

router.post("/paquet2", async (req, res) => {
    console.log(req.body);
    const paquet2 = new Paquet2({
        id: req.body.id,
        titre: req.body.titre,
        contenu: req.body.contenu,
        img: req.body.img,
        dposition: req.body.dposition,
        Dependance: req.body.Dependance,
        taille: req.body.taille,
        value: req.body.value
    })
    await paquet2.save()
    res.send(paquet2)
})


router.patch("/paquet2/:id", async (req, res) => {
    try {
        const paquet2 = await Paquet2.findOne({
            _id: req.params.id
        })
        if (req.body.id) {
            paquet2.id = req.body.id
        }
        if (req.body.titre) {
            paquet2.titre = req.body.titre
        }

        if (req.body.contenu) {
            paquet2.contenu = req.body.contenu
        }
        if (req.body.img) {
            paquet2.img = req.body.img
        }
        if (req.body.dposition) {
            paquet2.dposition = req.body.dposition
        }
        if (req.body.Dependance) {
            paquet2.Dependance = req.body.Dependance
        }
        if (req.body.taille) {
            paquet2.taille = req.body.taille
        }
        if (req.body.value) {
            paquet2.value = req.body.value
        }
        await paquet2.save()
        res.send(paquet2)
    } catch {
        res.status(404)
        res.send({
            error: "paquet2 doesn't exist!"
        })
    }
})

router.delete("/paquet2/:id", async (req, res) => {
    try {
        await Paquet2.deleteOne({
            _id: req.params.id
        })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({
            error: "paquet2 doesn't exist!"
        })
    }
})

module.exports = router