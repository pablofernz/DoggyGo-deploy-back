const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Dog', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        size: {
            type: DataTypes.ENUM('SMALL', 'MEDIUM', 'LARGE', 'GIANT'),
            allowNull: false
        },
        age: {
            type: DataTypes.STRING,
            allowNull: false
        },
        recomendations: {
            type: DataTypes.STRING(150),
            allowNull: true
        },
        breed: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sex: {
            type: DataTypes.ENUM("MACHO", "HEMBRA"),
            allowNull: false
        },
        castrated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: false
    });
};
