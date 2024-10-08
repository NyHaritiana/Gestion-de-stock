const express = require('express');
const router = express.Router();
const Sortie = require('../models/sortie');

router.post('/addSortie', async (req, res) => {
    const { ref_article, nom_recepteur, quantite, date_sortie} = req.body;

    try{
        const newSortie = await Sortie.create({
            ref_article,
            nom_recepteur,
            quantite,
            date_sortie
        });
        return res.status(201).json(newSortie);
    } catch (error) {
        console.error("Erreur lors de l'ajout :", error);
        return res.status(500).json({message: "Erreur lors de l'ajout: ", error});
    }
});

module.exports = router;