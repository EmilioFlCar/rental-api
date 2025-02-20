const {DataTypes} = require('sequelize')

module.exports = (sequielize) =>{
    sequielize.define('Client', {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,  
        },
        phoneNumber:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                isEmail: true
            }
        },
        address:{
            type: DataTypes.STRING,
            allowNull: false,
        }

    }, { timestamps: false })
}
