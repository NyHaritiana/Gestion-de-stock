const express = require('express');
const router = express.Router();
const Entree = require('../models/entree');
const Stock = require('../models/stock');

router.post('/addEntree', async (req, res) => {
    const { ref_article, quantite, ref_facture, date_entree } = req.body;

    try {
        const article = await Stock.findOne({ where: { ref_article } });

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        const updatedQuantite = Number(article.quantite) + Number(quantite);

        await Stock.update(
            { quantite: updatedQuantite },
            { where: { ref_article } }
        );

        const newEntree = await Entree.create({
            ref_article,
            quantite,
            ref_facture,
            ...(date_entree && { date_entree })
        });

        return res.status(201).json({
            message: 'Entry added and stock updated successfully',
            entree: newEntree
        });

    } catch (error) {
        console.error("Erreur lors de l'ajout :", error);
        return res.status(500).json({ message: "Erreur lors de l'ajout: ", error });
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
