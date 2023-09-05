const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Review', { 
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        clientName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        clientImage: {
            type: DataTypes.STRING,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comment:{
            type: DataTypes.TEXT,
        },
    });
};
