const { Invoice, Rent, Equipment, Client, Payment } = require("../db")

const getAllInvoices = async function () {
    return await Invoice.findAll({
        include: [
            {
                model: Client,
            },
            {
                model: Rent,
                include: [
                    {
                        model: Equipment,
                        attributes: ['id', 'name', 'price', 'amount'],
                        through: { attributes: [] }
                    },
                ],
            },
            {
                model: Payment,
            },
        ],

    })
}

module.exports = getAllInvoices