const { DataTypes } = require('sequelize');
const sequelize = require('../connectionDB');

const Stock = sequelize.define('Stock', {
    ref_article: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    quantite: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    unite: {
        type: DataTypes.STRING,
        allowNull: false
    },
    num_comptable: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ref_facture: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    qr_code: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'ARTICLE',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
});

sequelize.sync()
  .then(() => {
    console.log('stock a été créée avec succès.');
  })
  .catch((err) => {
    console.error('Erreur lors de la synchronisation de la base de données :', err);
  });

module.exports = Stock;