const { Client, Invoice, conn } = require("../../db");
const createRent = require("../../helpers/createRent");
const getAllInvoices = require("../../helpers/getInvoicesHelper");

const postInvoice = async function (req, res) {
  const { clientID, equipmentData } = req.body;

  try {
    const client = await Client.findByPk(clientID)

    if (!client) {
      throw new Error('El cliente con la identificación especificada no existe.');
    } else {
      let factura = null

      const facturas = await conn.transaction(async (t) => {
        let totalInvoice = 0;
        const rents = [];

        const newInvoice = await Invoice.create({}, { transaction: t });

        for (const item of equipmentData) {
          const rent = await createRent(item, client, newInvoice, t)
          rents.push(rent);
          totalInvoice += rent.cost
        }

        await newInvoice.addRents(rents, { transaction: t });
        await newInvoice.setClient(client, { transaction: t });
        newInvoice.creationDate = new Date()
        newInvoice.total = totalInvoice;
        await newInvoice.save({ transaction: t });
        factura = newInvoice

        return await getAllInvoices()

      });

      res.status(200).json({ allInvoices: facturas, factura });
    }

  } catch (error) {
    res.status(500).json({ error: "ocurrió un error al generar la factura", detail: error.message });
  }
};

module.exports = postInvoice;