const express = require('express');
const router = express.Router();
const Stock = require('../models/stock');

router.post('/addArticles', async (req, res) => {
    const { ref_article, designation, description, quantite, unite, num_comptable, ref_facture, date, qr_code} = req.body;

    try{
        const newStock = await Stock.create({
            ref_article,
            designation,
            description,
            quantite,
            unite,
            num_comptable,
            ref_facture,
            date,
            qr_code
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

router.put('/updateArticles/:ref_article', async (req, res) => {
    const ref_article = req.params.ref_article;
    const updatedData = req.body;
  
    try {
      const article = await Stock.findOne({ where: { ref_article } });
  
      if (!article) {
        return res.status(404).json({ message: 'Article non trouvé' });
      }
  
      await article.update(updatedData);
  
      res.status(200).json({ message: "Article mis à jour avec succès", article });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'article :", error);
      res.status(500).json({ message: 'Erreur serveur', error });
    }
  });

  router.delete('/deleteArticles/:ref_article', async (req, res) => {
    const ref_article = req.params.ref_article;

    try {
        const article = await Stock.findOne({ where: { ref_article } });

        if (!article) {
            return res.status(404).json({ message: 'Article non trouvé' });
        }

        await article.destroy();
        return res.status(200).json({ message: 'Article supprimé avec succès' });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'article :", error);
        return res.status(500).json({ message: 'Erreur serveur', error });
    }
});


module.exports = router;