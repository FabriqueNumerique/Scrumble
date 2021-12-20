const express = require("express");
const router = express.Router();
// const multer= require('multer');

// const storage =multer.diskStorage({
// 	destination:function(req,file,cb) {
// 		cb(null,'./uploads/');
// 	},
// 	filename:function(req,file,cb){
// 		cb(null, Date.now()+'-'+file.originalname);
// 	}
// });
// const FileFilter= (req, file,cb)=>{
// 	// reject a file
// 	if(file.mimetype==='image.jpeg'||file.mimetype==='image/png'){
// 		cb(null,true);
// 	} else{
// 		cb(null,false);
// 	}

// }
// const upload = multer({
// 	storage:storage
// }, 
// //  FileFilter
// )


const Regle = require("../models/regles");

router.get("/regles", async (req, res) => {
	const regles = await Regle.find();
	res.send(regles);
})

router.get("/regles/:id", async (req, res) => {
	const regle = await Regle.findOne({ _id: req.params.id })
	res.send(regle)
})
// upload.single('img'),
router.post("/regles",  async (req, res) => {
	console.log(req.file);
	const regle = new Regle({
		titre: req.body.titre,
		contenu: req.body.contenu,
		// numero: req.body.numero,
		img:req.body.img,
        texte:req.body.texte,
        video:req.body.video
	})
	await regle.save()
	res.send(regle)
})

router.patch("/regles/:id", async (req, res) => {
	try {
		const regle = await Regle.findOne({ _id: req.params.id })

		if (req.body.titre) {
			regle.titre = req.body.titre
		}
		// if (req.body.numero) {
		// 	regle.numero = req.body.numero
		// }

		if (req.body.contenu) {
			regle.contenu = req.body.contenu
        }
        if (req.body.img) {
			regle.img = req.body.img
        }
        if (req.body.texte) {
			regle.texte = req.body.texte
		}
        if (req.body.video) {
			regle.video = req.body.video
		}
		await regle.save()
		res.send(regle)
	} catch {
		res.status(404)
		res.send({ error: "Regle doesn't exist!" })
	}
})

router.delete("/regles/:id", async (req, res) => {
	try {
		await Regle.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Regle doesn't exist!" })
	}
})








module.exports = router