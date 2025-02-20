const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const {conn, Invoice} = require("./db")
const server = express()

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
    );
    next();
});

const clientRoutes = require('./routes/clientRoutes.js')
const equipmentRoutes = require('./routes/equipmentRoutes.js')
const invoiceRoutes = require('./routes/invoiceRoutes.js')
const rentRoutes = require('./routes/rentRoutes.js')
const paymentRoutes = require('./routes/paymentRoutes.js')

server.use(express.json())
// server.use(bodyParser.urlencoded({ extended: false }));
// server.use(cors)
server.use(morgan("dev"))


server.use('/JyJ/clients', clientRoutes)
server.use('/JyJ/equipment', equipmentRoutes)
server.use('/JYJ/invoice', invoiceRoutes)
server.use('/JYJ/rent', rentRoutes)
server.use('/JYJ/payment', paymentRoutes)

server.listen(process.env.PORT || 3001, ()=>{
    console.log('SERVER ON' )
    conn.sync({force: false}).then( async()=>{})
})