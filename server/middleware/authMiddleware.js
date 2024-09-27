const jwt =require('jsonwebtoken');

const JWT_SECRET = 'e75f2bece0c4a5ef92515ff3e0b30ef45146aa9a98f3e1a22fb487cedab1670736d97c6eb164';

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user; 
      next(); 
    });
  }

module.exports = authMiddleware;