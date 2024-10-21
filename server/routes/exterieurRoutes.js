const express = require('express');
const router = express.Router();
const Exterieur = require('../models/exterieur');

router.post('/addExterieur', async (req, res) => {
    const { design, date } = req.body;

    try{
        const newExterieur = await Exterieur.create({
            design,
            date
        });
        return res.status(201).json(newExterieur);
    } catch (error) {
        console.error("Erreur lors de l'ajout :", error);
        return res.status(500).json({message: "Erreur lors de l'ajout: ", error});
    }
});

router.get('/getExterieur', async (req, res) => {
    try {
        const exterieurs = await Exterieur.findAll();
        return res.status(200).json(exterieurs);
    } catch (error) {
        console.error("Erreur lors de la récupération des articles :", error);
        return res.status(500).json({message: "Erreur lors de la récupération des articles", error});
    }
});

router.delete('/deleteExterieur/:num_affaire', async (req, res) => {
    const num_affaire = req.params.num_affaire;

    try {
        const ext = await Exterieur.findOne({ where: { num_affaire } });

        if (!ext) {
            return res.status(404).json({ message: 'Exterieur non trouvé' });
        }

        await ext.destroy();
        return res.status(200).json({ message: 'Exterieur supprimé avec succès' });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'exterieur :", error);
        return res.status(500).json({ message: 'Erreur serveur', error });
    }
});


module.exports = router;