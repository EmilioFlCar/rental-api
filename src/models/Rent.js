const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('Rent', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        cost: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        rentedQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
        { timestamps: false })
}