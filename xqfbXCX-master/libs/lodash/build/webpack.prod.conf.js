var path = require('path')  
module.exports = {  
    entry: path.resolve(__dirname, "..", "entry.js"),
    output: {
        path: path.resolve(__dirname, "..", "dist"),
        filename: "lodash-wx.js",
        libraryTarget: "umd",
        library: "lodash"
    },
    resolve: {
        modules: [
            path.join(__dirname, ".."),
            "node_modules"
        ]
    },
    module: {
       rules:[
        {
          test: require.resolve('../entry.js'),
          use: [
              'babel-loader'
          ]
        }
       ]
    },
    externals: {
    }
};
