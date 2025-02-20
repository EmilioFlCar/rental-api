const express = require('express')
const router = express.Router()

const getRents = require('../controllers/RentControllers/getRents.js')
const editRent = require('../controllers/RentControllers/editRent.js')

router.get('/', getRents)
router.put('/:id', editRent)

module.exports = router