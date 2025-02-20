const { Client, Invoice, conn } = require("../../db")
const createRent = require("../../helpers/createRent")
const getAllInvoices = require("../../helpers/getInvoicesHelper")
const reCalculateCost = require("../../helpers/reCalculateCost")

const addRentToInvoice = async function (req, res) {
    const { invoiceID } = req.params
    const { item } = req.body
    try {
        const invoice = await Invoice.findByPk(invoiceID)
        const client = await Client.findByPk(invoice.ClientId)

        const update = await conn.transaction(async (t) => {
            const newRent = await createRent(item, client, invoice, t)
            await invoice.addRent(newRent, { transaction: t })
        })

        const updatedTotal = await reCalculateCost(invoiceID)

        if (!updatedTotal.success) { throw Error("Ocurrió un error al actualizar la factura") }

        const invoices = await getAllInvoices()
        res.status(200).json({ message: "Alquiler añadido correctamente", invoices })

    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el alquiler', detail: error.message });
    }
}

module.exports = addRentToInvoice