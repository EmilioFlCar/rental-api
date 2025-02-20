const {Client} = require('../../db')

const getClients = async function(req, res){
    try {
        const {id} = req.query
        if(id){
            const client = await Client.findByPk(id)
            res.status(200).json(client)
        }else{
            const clients = await Client.findAll()
            res.status(200).json(clients)
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = getClients