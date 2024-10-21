const { DataTypes } = require('sequelize');
const sequelize = require('../connectionDB');

const Exterieur = sequelize.define('Exterieur', {
    num_affaire: {
        type: DataTypes.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    design: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'EXTERIEUR',
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
});

sequelize.sync()
  .then(() => {
    console.log('Exterieur a été créée avec succès.');
  })
  .catch((err) => {
    console.error('Erreur lors de la synchronisation de la base de données :', err);
  });

  module.exports = Exterieur;