const express = require("express")
const router = express.Router()
const Projet = require("../models/Projet");
/** Récupérer les projets */
router.get("/projets", async (req, res) => {
    const projet = await Projet.find();
    res.send(projet);
})

router.get("/projets/:id", async (req, res) => {
    const projet = await Projet.findOne({
        _id: req.params.id
    })
    res.send(projet);
})

router.post("/projets", async (req, res) => {
    console.log(req.body);
    const projet = new Projet({
        id: req.body.id,
        titre: req.body.titre,
        contenu: req.body.contenu,
        img: req.body.img,
        dposition: req.body.dposition,
        Dependance: req.body.Dependance,
        taille: req.body.taille,
        value: req.body.value
    })
    await projet.save()
    res.send(projet)
})


router.patch("/projets/:id", async (req, res) => {
    try {
        const projet = await Projet.findOne({
            _id: req.params.id
        })
        if (req.body.id) {
            projet.id = req.body.id
        }
        if (req.body.titre) {
            projet.titre = req.body.titre
        }

        if (req.body.contenu) {
            projet.contenu = req.body.contenu
        }
        if (req.body.img) {
            projet.img = req.body.img
        }
        if (req.body.dposition) {
            projet.dposition = req.body.dposition
        }
        if (req.body.Dependance) {
            projet.Dependance = req.body.Dependance
        }
        if (req.body.taille) {
            projet.taille = req.body.taille
        }
        if (req.body.value) {
            projet.value = req.body.value
        }
        await projet.save()
        res.send(projet)
    } catch {
        res.status(404)
        res.send({
            error: "Paquet doesn't exist!"
        })
    }
})

router.delete("/projets/:id", async (req, res) => {
    try {
        await Projet.deleteOne({
            _id: req.params.id
        })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({
            error: "Paquet doesn't exist!"
        })
    }
});

module.exports = router;