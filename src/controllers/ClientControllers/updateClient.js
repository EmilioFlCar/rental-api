const { Client } = require('../../db')

const updateClient = async function (req, res) {
    const { id } = req.params
    const { name, phoneNumber, email, address } = req.body
    try {
        const updatedClient = await Client.update({ name, phoneNumber, email, address }, {
            where: { id }
        })
        if(updatedClient[0] === 1){
            const clients = await Client.findAll()
            res.status(200).json({clients})
        }
        // res.status(200).json(userUpdate)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = updateClient