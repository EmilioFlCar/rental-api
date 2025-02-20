const express = require('express')
const router = express.Router()

const postEquipment = require('../controllers/EquipmentControllers/postEquipment')
const getEquipment = require('../controllers/EquipmentControllers/getEquipment')
const deleteEquipment = require('../controllers/EquipmentControllers/deleteEquipment')
const updateEquipment = require('../controllers/EquipmentControllers/updateEquipment')
const increment = require('../controllers/EquipmentControllers/incrementEquipment')
const decrement = require('../controllers/EquipmentControllers/decrementEquipment')

router.post('/', postEquipment)
router.get('/', getEquipment)
router.put('/:id', updateEquipment)
router.delete('/:id', deleteEquipment)
router.post('/increment/:id',increment)
router.post('/decrement/:id',decrement)


module.exports = router