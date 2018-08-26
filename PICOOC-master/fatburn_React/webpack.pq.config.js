var htmlWebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
// var path = require('path')

var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
var rootPath='./detection.picooc.com/web/fatburntestReact';
module.exports={
	entry:{
		vendor:['react','react-dom','pubsub-js'],
		bodyChange:[rootPath+'/jsx/BodyChange.jsx'],
		figureContrast:[rootPath+'/jsx/FigureContrast.jsx']
	},
	output:{
		path:rootPath+"/jsv2/",
		filename:'[name].js'
	},
	watch: true,
	module:{
		loaders:[
			{
				test:/.css$/,
				loaders:["style","css"],
				exclude:"/node_modules/"
			},{
				test:/.jsx$/,
				loaders:['babel?presets[]=es2015&presets[]=react'],
				exclude:"/node_modules/"
			}
		]
		
	},
	resolve:{
		extensions:['','.js',".css",'.jsx']
	},
	plugins: [
		new CommonsChunkPlugin({
            names: ['vendor'],
        })
    ]
}








