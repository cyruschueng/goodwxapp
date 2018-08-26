let express = require('express')
let app = express()


const course = require('./course')
const videoDetail = require('./videoDetail')

app.use(course)
app.use(videoDetail)
module.exports = app
