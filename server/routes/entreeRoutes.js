const express = require('express');
const router = express.Router();
const Entree = require('../models/entree');

router.post('/addEntree', async (req, res) => {
    const { ref_article, quantite, ref_facture, date_entree } = req.body;

    try {
        const newEntree = await Entree.create({
            ref_article,
            quantite,
            ref_facture,
            ...(date_entree && { date_entree })
        });
        return res.status(201).json(newEntree);
    } catch (error) {
        console.error("Erreur lors de l'ajout :", error);
        return res.status(500).json({message: "Erreur lors de l'ajout: ", error});
    }
});

router.get('/getEntree', async (req, res) => {
    try {
        const entree = await Entree.findAll();
        return res.status(200).json(entree); 
    } catch (error) {
        console.error("Erreur lors de la récupération des articles entrees :", error);
        return res.status(500).json({message: "Erreur lors de la récupération des articles entrees", error});
    }
});

module.exports = router;