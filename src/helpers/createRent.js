const { Equipment, Rent } = require("../db");
const calculateCost = require("./calculateCost");
const calculateDays = require("./calculateDays");

async function createRent(item, client, invoice, t) {

    const { startDate, endDate, itemInfo, numberOfItemsToRent } = item;
    const daysToRent = calculateDays(startDate, endDate)
    const equipment = await Equipment.findByPk(itemInfo.id, { transaction: t });

    if (equipment.amount < numberOfItemsToRent) return new Error(`No hay suficientes unidades (${equipment.amount}) de ${equipment.name} para generar el alquiler.`)

    const rent = await Rent.create(
        {
            cost: calculateCost(daysToRent, equipment.price, numberOfItemsToRent),
            rentedQuantity: numberOfItemsToRent,
            startDate,
            endDate
        },
        { transaction: t });

    if (!rent) return new Error(`Ocurrió un problema al generar el alquiler de ${equipment.name}.`);

    await equipment.decrement('amount', { by: numberOfItemsToRent, transaction: t });

    await rent.setEquipment(equipment, { transaction: t });
    await rent.setClient(client, { transaction: t });
    await rent.setInvoice(invoice, { transaction: t });

    return rent
}

module.exports = createRent