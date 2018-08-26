let express = require('express')
let app = express()


const course = require('./course')
const courseCatalog = require('./courseCatalog')
const videoDetail = require('./videoDetail')

app.use(course)
app.use(courseCatalog)
app.use(videoDetail)
module.exports = app
