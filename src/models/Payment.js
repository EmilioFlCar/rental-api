const { DataTypes } = require('sequelize')

module.exports = (sequielize) => {
    sequielize.define('Payment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        paymentDate: {
            type: DataTypes.DATE
        },
        amount: {
            type: DataTypes.INTEGER
        },
        observation: {
            type: DataTypes.STRING
        },
        // ** Las siguientes propiedades se utilizan en caso de cancelar o hacer nulo un pago o abono
        state: {
            type: DataTypes.ENUM("OK", "NULO"),
            defaultValue: "OK"
        },
        // observación del por qué fue anulada
        void_observation: {
            type: DataTypes.STRING
        }
    },
        { timestamps: false })
}