const { Invoice, Payment } = require("../../db")

const postPayment = async function (req, res) {
    try {
        const { invoiceID, payment } = req.body
        const { amount, observation } = payment
        const invoice = await Invoice.findByPk(invoiceID)
        if (!invoice) throw new Error('Problema al encontrar la factura.')

        const newPayment = await Payment.create({
            paymentDate: Date.now(),
            amount,
            observation
        })
        if (!newPayment) throw new Error('Problema al generar el pago.')
        await invoice.addPayment(newPayment)
        await newPayment.setInvoice(invoice)
        res.status(200).json({ message: "Pago realizado correctamente" })
    } catch (error) {
        res.status(500).json({ error: 'Error al generar el pago', detail: error.message });
    }

}

module.exports = postPayment