const { Invoice, Rent, Equipment } = require("../db")

const reCalculateCost = async function (id) {
    try {
        let totalInvoice = 0;

        const invoice = await Invoice.findByPk(id, ({
            include: [
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
            ],

        }))

        for (const rent of invoice.Rents) {
            totalInvoice += rent.cost
        }

        invoice.total = totalInvoice
        await invoice.save()
        console.log(totalInvoice)
        return { success: "ok" }
    } catch (error) {
        return new Error(error)
    }
}

module.exports = reCalculateCost