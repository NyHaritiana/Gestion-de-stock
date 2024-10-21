const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv =require('dotenv');
const auth  = require("./routes/auth.js");
const stockRoutes = require("./routes/stockRoutes.js");
const entreeRoutes = require("./routes/entreeRoutes.js");
const sortieRoutes = require("./routes/sortieRoutes.js");
const exterieurRoutes = require("./routes/exterieurRoutes.js");

dotenv.config();
const app = express();
const port = 3000;

const corsOption = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/stocks', stockRoutes);
app.use('/api/entrees', entreeRoutes);
app.use('/api/sorties', sortieRoutes);
app.use('/api/exterieurs', exterieurRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})