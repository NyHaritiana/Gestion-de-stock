const { DataTypes } = require('sequelize');
const sequelize = require('../connectionDB');

const Sortie = sequelize.define('Sortie', {
    id_sortie: {
        type: DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    ref_article: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nom_recepteur: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantite: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date_sortie: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'SORTIE',
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

  module.exports = Sortie;