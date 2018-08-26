let express = require('express')
let app = express()

const videoDetail = require('./videoDetail')

app.use(videoDetail)
module.exports = app
