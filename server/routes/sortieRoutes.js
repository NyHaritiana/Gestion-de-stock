const express = require('express');
const router = express.Router();
const Sortie = require('../models/sortie');
const Stock = require('../models/stock');

router.post('/addSortie', async (req, res) => {
    const { ref_article, nom_recepteur, quantite, date_sortie} = req.body;

    try {
        const article = await Stock.findOne({ where: { ref_article } });

        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        const updatedQuantite = Number(article.quantite) - Number(quantite);

        await Stock.update(
            { quantite: updatedQuantite },
            { where: { ref_article } }
        );

        const newSortie = await Sortie.create({
            ref_article,
            quantite,
            nom_recepteur,
            ...(date_sortie && { date_sortie })
        });

        return res.status(201).json({
            message: 'Exit added and stock updated successfully',
            entree: newSortie
        });

    } catch (error) {
        console.error("Erreur lors de l'ajout :", error);
        return res.status(500).json({ message: "Erreur lors de l'ajout: ", error });
    }
});

router.get('/getSortie', async (req, res) => {
    try {
        const sortie = await Sortie.findAll();
        return res.status(200).json(sortie);
    } catch (error) {
        console.error("Erreur lors de la récupération des articles sorties :", error);
        return res.status(500).json({message: "Erreur lors de la récupération des articles sorties", error});
    }
})

module.exports = router;