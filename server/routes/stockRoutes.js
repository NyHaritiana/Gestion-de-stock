const express = require('express');
const router = express.Router();
const Stock = require('../models/stock');

router.post('/addArticles', async (req, res) => {
    const { ref_article, designation, description, quantite, unite, num_comptable, ref_facture, date} = req.body;

    try{
        const newStock = await Stock.create({
            ref_article,
            designation,
            description,
            quantite,
            unite,
            num_comptable,
            ref_facture,
            date
        });
        return res.status(201).json(newStock);
    } catch (error) {
        console.error("Erreur lors de l'ajout :", error);
        return res.status(500).json({message: "Erreur lors de l'ajout: ", error});
    }
});

router.get('/getArticles', async (req, res) => {
    try {
        const articles = await Stock.findAll();
        return res.status(200).json(articles);
    } catch (error) {
        console.error("Erreur lors de la récupération des articles :", error);
        return res.status(500).json({message: "Erreur lors de la récupération des articles", error});
    }
});


module.exports = router;