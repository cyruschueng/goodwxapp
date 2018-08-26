let express = require('express')
let app = express()


const customer = require('./customer')
const customerDetail = require('./customer-detail')
const personalData = require('./personalData')

app.use(customer)
app.use(customerDetail)
app.use(personalData)

module.exports = app
