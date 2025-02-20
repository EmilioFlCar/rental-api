const {Equipment} = require('../../db')

const decrement = async function (req, res){
    try {
        const {id} = req.params
        const {amount} = req.body
        const equipment = await Equipment.findByPk(id)
        const result = await equipment.decrement('amount', {by: amount})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = decrement