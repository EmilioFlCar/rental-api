const express = require('express')
const router = express.Router()

const postInvoice = require('../controllers/InvoiceControllers/postInvoice')
const getInvoices = require('../controllers/InvoiceControllers/getInvoices')
const updateInvoice = require('../controllers/InvoiceControllers/updateInvoice')
const addRentToInvoice = require('../controllers/InvoiceControllers/addRentToInvoice')

router.get('/', getInvoices)
router.post('/', postInvoice)
router.put('/update', updateInvoice)
router.put('/addRent/:invoiceID', addRentToInvoice)

module.exports = router