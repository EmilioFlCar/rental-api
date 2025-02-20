const { Client } = require('../../db')

const deleteClient = async function (req, res) {
    try {
        const { id } = req.params
        const deleted = await Client.destroy({
            where: {id}
        })
        const clients = await Client.findAll()
        res.status(200).json({deleted, clients})
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = deleteClient