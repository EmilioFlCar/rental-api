const { Equipment } = require('../../db')

const updateEquipment = async function (req, res) {
    try {
        const { id } = req.params
        const { name, amount, price } = req.body
        const equipmentUpdate = await Equipment.update({ name, amount, price }, {
            where: { id }
        })
        if(equipmentUpdate[0] === 1 ){
            const equipment = await Equipment.findAll()
            res.status(200).json({equipmentUpdate, equipment})
        }else{
            res.status(400).json({ error: 'No se pudo editar el item'})
        }

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = updateEquipment