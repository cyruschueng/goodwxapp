let express = require('express')
let app = express()


const article = require('./article')

app.use(article)

module.exports = app
