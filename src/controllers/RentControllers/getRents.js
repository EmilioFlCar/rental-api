const {Rent} = require('../../db')

const getRents = async function(req, res){
    try {
        const {id} = req.query
        if(id){
            const rent = await Rent.findByPk(id)
            res.status(200).json(rent)
        }else{
            const rents = await Rent.findAll()
            res.status(200).json(rents)
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = getRents