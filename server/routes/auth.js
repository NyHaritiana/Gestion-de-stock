const express = require('express');
const cors = require('cors');
const dotenv =require('dotenv');
const jwt =require('jsonwebtoken');
const authMiddleware =require("../middleware/authMiddleware.js");

dotenv.config();
const router = express.Router();
const JWT_SECRET = 'e75f2bece0c4a5ef92515ff3e0b30ef45146aa9a98f3e1a22fb487cedab1670736d97c6eb164';

const corsOption = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};

const defaultUser = {
  username: 'dsimfa@gmail.com',
  password: '123'
};

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  
  if (username === defaultUser.username && password === defaultUser.password) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Authentification réussie', token });
  } else {
    res.status(401).json({ message: 'Email ou mot de passe incorrect' });
  }
  
  console.log(username, password);
});

router.get('/', cors(corsOption), authMiddleware, (req, res) =>{
  res.status(200).json({message: `Bienvenue`});
});

module.exports = router;