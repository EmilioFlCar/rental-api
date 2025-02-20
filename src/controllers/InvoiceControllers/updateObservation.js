const { Invoice } = require("../../db")

const updateObservation = async function (req, res) {
    const { id } = req.params
    const { observation } = req.body
    try {
        const updatedInvoice = await Invoice.update({ observation }, {
            where: { id }
        })
        if (updatedInvoice[0] === 1) {
            const invoices = await Invoice.findAll()
            res.status(200).json({ invoices })
        }

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = updateObservation