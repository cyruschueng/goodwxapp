var webpack = require('webpack');
var Path = require("path");
var fs = require("fs");

// TODO 需要根据项目目录和文件不同，自行调整~
var assetsFolder = './assets7Intro/';
var buildFolder = '/build7Intro/';
var htmlFileName = "index7Intro.html";
var path = __dirname + "/build7Intro";

module.exports = {
  entry:[
     assetsFolder + 'Entry.js'
  ],
  output: {
    path: __dirname + buildFolder,
    publicPath: buildFolder,
    filename: 'bundle.[hash:8].js'
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        loaders: ["babel-loader","jsx?harmony"]
      },
      {
        test: /\.(scss)$/,
        loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'url-loader?limit=4096'
      }
    ]
  },

  plugins : [
    new webpack.DefinePlugin({
      "process.env" : {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    function() {
      this.plugin("done", function(statsData) {

          // TODO
          // console.log("__dirname = " + __dirname);
          console.log("===========================================");

          var stats = statsData.toJson();

          if (!stats.errors.length) {
            var html = fs.readFileSync(Path.join(__dirname, htmlFileName), "utf8");

            // need to read the final js bundle file to replace in the distributed index.html file
            const assets = stats.assets;
            var newName = "bundle.js";
            for (var i in assets) {
              var asset = assets[i];
              if (asset.name.startsWith("bundle") > 0) {
                console.log("1.新打包的JS为", asset.name);
                newName = asset.name;
                break;
              }
            }

            // 修改index.html中的bundle引用
            var htmlOutput = html.replace(/bundle.*js/g, newName);
            fs.writeFileSync(Path.join(__dirname, htmlFileName), htmlOutput);
            console.log("2.修改index.html中的bundle引用");

            // 删除旧的bundle.js
            var files = [];
            if (fs.existsSync(path)) {
              files = fs.readdirSync(path);
              files.forEach(function (file, index) {
                var filePath = path + "/" + file;
                if (file.startsWith("bundle") && file != newName) {
                  console.log("3.删除旧的JS", file);
                  fs.unlinkSync(filePath);
                }
              });
            }

            console.log("主人！快快上传你的JS和index.html吧~");
            console.log("===========================================");

          }
      });
    }

  ]


};
