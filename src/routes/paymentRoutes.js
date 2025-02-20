const express = require('express')
const router = express.Router()

const postPayment = require('../controllers/PaymentControllers/postPayment')

router.post('/', postPayment)

module.exports = router