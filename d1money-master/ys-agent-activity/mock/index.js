let express = require('express')
let app = express()


const activity = require('./activity.js')
const activityDetail = require('./activityDetail.js')

app.use(activity)
app.use(activityDetail)
module.exports = app
