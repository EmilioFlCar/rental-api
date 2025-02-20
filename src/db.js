require('dotenv').config();
const { Sequelize } = require('sequelize');

const { DATABASE_URL } = process.env;

const ClientModel = require('./models/Client')
const EquipmentModel = require('./models/Equipment');
const InvoiceModel = require('./models/Invoice');
const RentModel = require('./models/Rent');
const PaymentModel = require('./models/Payment');

const sequelize = new Sequelize(
   DATABASE_URL,
   { logging: false, native: false }
);

ClientModel(sequelize)
EquipmentModel(sequelize)
InvoiceModel(sequelize)
RentModel(sequelize)
PaymentModel(sequelize)


const { Client, Equipment, Invoice, Rent, Payment } = sequelize.models;

Client.hasMany(Rent);
Rent.belongsTo(Client);

Client.hasMany(Invoice);
Invoice.belongsTo(Client);

Invoice.hasMany(Rent);
Rent.belongsTo(Invoice);

Invoice.hasMany(Payment)
Payment.belongsTo(Invoice)

Rent.belongsToMany(Equipment, { through: 'RentEquipment' });
Equipment.belongsToMany(Rent, { through: 'RentEquipment' });

module.exports = {
   Client,
   Equipment,
   Invoice,
   Rent,
   Payment,
   conn: sequelize,
};
