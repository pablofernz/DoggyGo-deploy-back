const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Review', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comment:{
            type: DataTypes.TEXT,
            allowNull: false,
        }
    }, {
        timestamps: false
    });
};
