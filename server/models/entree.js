const { DataTypes } = require('sequelize');
const sequelize = require('../connectionDB');

const Entree = sequelize.define('Entree', {
    num_entree: {
        type: DataTypes.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    ref_article: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantite: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ref_facture: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_entree: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'ENTREE',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
});

sequelize.sync()
  .then(() => {
    console.log('entree a été créée avec succès.');
  })
  .catch((err) => {
    console.error('Erreur lors de la synchronisation de la base de données :', err);
  });

  module.exports = Entree;