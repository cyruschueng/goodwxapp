const path = require('path')
const fs = require('fs')

const projectConfig = path.resolve(__dirname, '../dist/project.config.json')

module.exports = urlCheck => {
  fs.stat(projectConfig, (err, stats) => {
    if (err) throw err

    if (stats.isFile()) {
      fs.readFile(projectConfig, (err, data) => {
        if (err) throw err

        let json = JSON.parse(data)
        json.setting.urlCheck = urlCheck

        fs.writeFile(projectConfig, JSON.stringify(json, null, 2), err => {
          if (err) {
            throw err
          } else {
            console.log(('project.config.json has been saved!').blue)
          }
        })
      })
    }
  })
}
