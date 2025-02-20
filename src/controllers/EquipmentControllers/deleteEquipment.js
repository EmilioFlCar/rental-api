const { Equipment } = require('../../db')

const deleteEquipment = async function (req, res) {
    try {
        const { id } = req.params
        const deleted = await Equipment.destroy({
            where: {id}
        })
        const equipment = await Equipment.findAll()
        res.status(200).json({deleted, equipment})
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = deleteEquipment