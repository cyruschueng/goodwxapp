let express = require('express')
let app = express()


const productList = require('./productList.js')
const productDetail = require('./productDetail.js')

app.use(productList)
app.use(productDetail)
module.exports = app
