const { Invoice, Client, Rent, Equipment } = require('../../db')

const updateInvoice = async function (req, res) {
    const issueDate = new Date()
    const { id, state } = req.body
    try {
        const updatedInvoice = await Invoice.update({ issueDate, state }, { where: { id } })
        if (updatedInvoice) {
            const invoices = await Invoice.findAll({
                include: [
                    {
                        model: Client,
                    },
                    {
                        model: Rent,
                        include: [
                            {
                                model: Equipment,
                                attributes: ['id', 'name', 'price'],
                                through: { attributes: [] }
                            },
                        ],
                    },
                ],

            })
            res.status(200).json(invoices)
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = updateInvoice