const express = require("express")
const router = express.Router()
const UserStorie = require("../models/UserStorie");
/** Récupérer les userstories */
router.get("/userstories", async (req, res) => {
    const userStorie = await UserStorie.find();
    res.send(userStorie);
})

router.get("/userstories/:id", async (req, res) => {
    const userStorie = await UserStorie.findOne({
        _id: req.params.id
    })
    res.send(userStorie);
})

router.post("/userstories", async (req, res) => {
    console.log(req.body);
    const userStorie = new UserStorie({
        id: req.body.id,
        titre: req.body.titre,
        contenu: req.body.contenu,
        img: req.body.img,
        dposition: req.body.dposition,
        Dependance: req.body.Dependance,
        taille: req.body.taille,
        value: req.body.value
    })
    await userStorie.save()
    res.send(userStorie)
})


router.patch("/userstories/:id", async (req, res) => {
    try {
        const userStorie = await UserStorie.findOne({
            _id: req.params.id
        })
        if (req.body.id) {
            userStorie.id = req.body.id
        }
        if (req.body.titre) {
            userStorie.titre = req.body.titre
        }

        if (req.body.contenu) {
            userStorie.contenu = req.body.contenu
        }
        if (req.body.img) {
            userStorie.img = req.body.img
        }
        if (req.body.dposition) {
            userStorie.dposition = req.body.dposition
        }
        if (req.body.Dependance) {
            userStorie.Dependance = req.body.Dependance
        }
        if (req.body.taille) {
            userStorie.taille = req.body.taille
        }
        if (req.body.value) {
            userStorie.value = req.body.value
        }
        await userStorie.save()
        res.send(userStorie)
    } catch {
        res.status(404)
        res.send({
            error: "Paquet doesn't exist!"
        })
    }
})

router.delete("/userstories/:id", async (req, res) => {
    try {
        await UserStorie.deleteOne({
            _id: req.params.id
        })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({
            error: "Paquet doesn't exist!"
        })
    }
})









module.exports = router