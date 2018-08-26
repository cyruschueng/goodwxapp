var htmlWebpackPlugin = require('html-webpack-plugin');

var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
var rootPath='./detection.picooc.com/web/fatburntestReact';
module.exports={
	entry:{
		vendor:['react','react-dom','pubsub-js'],
		messageList:[rootPath+'/jsx/MessageList.jsx'],
		setcard:[rootPath+'/jsx/Setcard.jsx'],
	},
	output:{
		path:rootPath+"/jsv2/",
		filename:'[name].js'
	},
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
	devServer:{
		historyApiFallback: true,
	    hot: true,
	    inline: true,
	    progress: true
	},
	resolve:{
		extensions:['','.js',".css",'.jsx']
	},
	plugins: [
		new CommonsChunkPlugin({
            names: ['vendor']
        })
    ]
};









