const { Client } = require("../../db")

const postCliente = async function (req, res) {
    try {
        const { id, name, phoneNumber, email, address } = req.body
        if (!id || !name || !phoneNumber || !email || !address) return res.status(400).send("Hacen falta datos del usuario")
        await Client.create({ id, name, phoneNumber, email, address})
        const clients = await Client.findAll()
        res.status(200).json(clients)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = postCliente