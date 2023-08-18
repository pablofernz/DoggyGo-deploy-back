const { DataTypes } = require('sequelize');   

module.exports = (sequelize) => {
    sequelize.define("Walk",{
        id:{
            type: DataTypes.UUID, 
            defaultValue: DataTypes.UUIDV4, 
            allowNull: false, 
            primaryKey: true
        },
        StartDate:{
            type:DataTypes.DATE,  
            allowNull: false, 
        },
        FinishDate:{ 
            type:DataTypes.DATE,  
            allowNull: false, 
        },
        state:{ 
            type:DataTypes.TEXT, 
            allowNull: false,  
        },
        image:{ 
            type:DataTypes.STRING, 
            allowNull: false,
        }
    }, 
    { 
      timestamps: false
    });
};