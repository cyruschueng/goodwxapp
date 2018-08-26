let express = require('express')
let app = express()


const productDetail = require('./productDetail.js')

app.use(productDetail)
module.exports = app
