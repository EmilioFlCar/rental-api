const express = require('express')
const router = express.Router()

const getClients = require('../controllers/ClientControllers/getClients')
const postClient = require('../controllers/ClientControllers/postClient')
const deleteClient = require('../controllers/ClientControllers/deleteClient')
const updateClient = require('../controllers/ClientControllers/updateClient')

router.get('/', getClients)
router.post('/', postClient)
router.delete('/:id', deleteClient)
router.put('/:id', updateClient)


module.exports = router