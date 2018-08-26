let express = require('express')
let app = express()


const poster = require('./poster.js')

app.use(poster)
module.exports = app
