const {Equipment} = require('../../db')

const getEquipment = async function(req, res){
    try {
        const {id} = req.query
        if(id){
            const oneEquip = await Equipment.findByPk(id)
            res.status(200).json(oneEquip)
        }else{
            const equipment = await Equipment.findAll()
            res.status(200).json(equipment)
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = getEquipment