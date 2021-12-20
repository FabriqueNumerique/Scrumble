const express = require("express")
const router = express.Router()
const Paquet1 = require("../../models/paquet1");

router.get("/paquet1", async (req, res) => {
    const paquet1 = await Paquet1.find()
    res.send(paquet1);
})

router.get("/paquet1/:id", async (req, res) => {
    const paquet1 = await Paquet1.findOne({
        _id: req.params.id
    })
    res.send(paquet1)
})

router.post("/paquet1", async (req, res) => {
    console.log(req.body);
    const paquet1 = new Paquet1({
        id: req.body.id,
        titre: req.body.titre,
        contenu: req.body.contenu,
        img: req.body.img,
        dposition: req.body.dposition,
        Dependance: req.body.Dependance,
        taille: req.body.taille,
        value: req.body.value
    })
    await paquet1.save()
    res.send(paquet1)
})


router.patch("/paquet1/:id", async (req, res) => {
    try {
        const paquet1 = await Paquet1.findOne({
            _id: req.params.id
        })
        if (req.body.id) {
            paquet1.id = req.body.id
        }
        if (req.body.titre) {
            paquet1.titre = req.body.titre
        }

        if (req.body.contenu) {
            paquet1.contenu = req.body.contenu
        }
        if (req.body.img) {
            paquet1.img = req.body.img
        }
        if (req.body.dposition) {
            paquet1.dposition = req.body.dposition
        }
        if (req.body.Dependance) {
            paquet1.Dependance = req.body.Dependance
        }
        if (req.body.taille) {
            paquet1.taille = req.body.taille
        }
        if (req.body.value) {
            paquet1.value = req.body.value
        }
        await paquet1.save()
        res.send(paquet1)
    } catch {
        res.status(404)
        res.send({
            error: "Paquet1 doesn't exist!"
        })
    }
})

router.delete("/paquet1/:id", async (req, res) => {
    try {
        await Paquet1.deleteOne({
            _id: req.params.id
        })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({
            error: "Paquet1 doesn't exist!"
        })
    }
})









module.exports = router