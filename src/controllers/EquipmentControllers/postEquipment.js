const { Equipment } = require('../../db')

const postEquipment = async function(req, res){
    try {
        const {name, amount, price} = req.body
        if(!name || !amount || !price) return res.status(400).send('Hacen falta datos')
        await Equipment.create({name, amount, price})
        const allEquipment = await Equipment.findAll()
        res.status(200).json(allEquipment)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = postEquipment