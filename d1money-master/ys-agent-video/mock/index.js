let express = require('express')
let app = express()


const video = require('./video')
const videoDetail = require('./videoDetail')

app.use(video)
app.use(videoDetail)
module.exports = app
