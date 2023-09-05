const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    schedule: {
      type: DataTypes.ENUM('6am-11am', '11am-3pm', "3pm-10pm"),
    },
    cpr: {
      type: DataTypes.BOOLEAN,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
    size: {
      type: DataTypes.ENUM('SMALL', 'MEDIUM', "LARGE", "GIANT"),
    },
    rol: {
      type: DataTypes.ENUM('Walker', 'Client', "Admin"),
      allowNull: false,
    },
    // add new googleId field
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    // add isComplete field to check if user has completed registration
    // useful for google signups
    isComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ratingAvg: {
      type: DataTypes.FLOAT,
    }
  },
    {
      timestamps: false
    });
};