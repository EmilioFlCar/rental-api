const { Rent, Equipment, conn, Invoice, Client } = require('../../db')
const calculateCost = require('../../helpers/calculateCost')
const reCalculateCost = require('../../helpers/reCalculateCost')

const editRent = async function (req, res) {
    const { id } = req.params
    const { rentedQuantity, itemID, days } = req.body
    try {
        const actualRent = await Rent.findByPk(id)
        if (!id) res.status(404).json("No se proporcionó un ID")

        const update = await conn.transaction(async (t) => {
            const equipmentInstance = await Equipment.findByPk(itemID)

            const updatedRent = await Rent.update({
                rentedQuantity,
                days,
                cost: calculateCost(days, equipmentInstance.price, rentedQuantity),
            }, { where: { id } }, { transaction: t })

            if (updatedRent) {

                if (rentedQuantity !== actualRent.rentedQuantity) {
                    if (rentedQuantity > actualRent.rentedQuantity) {
                        let itemsDifference = rentedQuantity - actualRent.rentedQuantity
                        await equipmentInstance.decrement('amount', { by: itemsDifference, transaction: t })
                        console.log(`cantidad de equipos disponibles reducida por ${itemsDifference}`)
                    }
                    if (rentedQuantity < actualRent.rentedQuantity) {
                        let itemsDifference = actualRent.rentedQuantity - rentedQuantity
                        await equipmentInstance.increment('amount', { by: itemsDifference, transaction: t })
                        console.log(`cantidad de equipos disponibles incrementada por ${itemsDifference}`)
                    }
                }
            }

            const updatedTotal = await reCalculateCost(actualRent.InvoiceId)

            if (!updatedTotal.success) { throw Error("Ocurrió un error al actualizar la factura") }


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
                                attributes: ['id', 'name', 'price', 'amount'],
                                through: { attributes: [] }
                            },
                        ],
                    },
                ],

            })
            return invoices
        })

        res.status(200).json(update)
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
    }
}

module.exports = editRent