var path = require('path');
var HtmlWebpackPlugin=require("html-webpack-plugin");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
var rootPath=path.resolve(__dirname);
function resolve (dir) {
  return path.resolve(__dirname,dir);
}

module.exports = {
	entry: {
		index:resolve("./vue/index"),
		load:resolve("./vue/load"),
		outLoad:resolve("./vue/outLoad"),
		loadSuccess:resolve("./vue/loadSuccess"),
		outIndex:resolve("./vue/outIndex"),
	},
	output: {
	 path: rootPath,
	 //publicPath: './build/[name].js',
	//  publicPath:"https://cdn2.picooc.com/web/res/system/",
	 filename: 'build/[name].js'
	},
	resolve:{
		extensions:[".css",'.js','.jsx','.vue'],
		alias: {
		  'vue$': 'vue/dist/vue.esm.js',
		  // '$':path.resolve(__dirname, './static/js/jquery-3.0.0.min.js'),
		  '$':"jquery",
		}
	},
   module: {
		loaders: [
		{
			test:/.css$/,
			loaders:["style-loader","css-loader"],
			exclude:"/node_modules/"
		},{
			test:/.less$/,
			loaders:["style-loader","css-loader","less-loader"],
			exclude:"/node_modules/"
		},{
			test: /\.vue$/,
			exclude: /node_modules/,
			loaders:['vue-loader']
		},{
			test:/.jsx$/,
			loader:'babel-loader',
			options:{//告诉babel需要怎么转
				presets:["es2015","react"]
			},
		}
		]
	},
	watch:true,
	plugins:[
		new HtmlWebpackPlugin({
			template:resolve('./template/index.html'),
			title:'index',
			filename:'index.html',
			chunks:["index"],
			chunksSortMode: function (chunk1, chunk2) {
						var order = ['index'];
						var order1 = order.indexOf(chunk1.names[0]);
						var order2 = order.indexOf(chunk2.names[0]);
						return order1 - order2;
				}
		}),
		new HtmlWebpackPlugin({
			template:resolve('./template/load.html'),
			title:'load',
			filename:'load.html',
			chunks:["load"],
			chunksSortMode: function (chunk1, chunk2) {
						var order = ['load'];
						var order1 = order.indexOf(chunk1.names[0]);
						var order2 = order.indexOf(chunk2.names[0]);
						return order1 - order2;
				}
		}),
		new HtmlWebpackPlugin({
			template:resolve('./template/loadSuccess.html'),
			title:'loadSuccess',
			filename:'loadSuccess.html',
			chunks:["loadSuccess"],
			chunksSortMode: function (chunk1, chunk2) {
						var order = ['loadSuccess'];
						var order1 = order.indexOf(chunk1.names[0]);
						var order2 = order.indexOf(chunk2.names[0]);
						return order1 - order2;
				}
		}),
		new HtmlWebpackPlugin({
			template:resolve('./template/outLoad.html'),
			title:'outLoad',
			filename:'outLoad.html',
			chunks:["outLoad"],
			chunksSortMode: function (chunk1, chunk2) {
						var order = ['outLoad'];
						var order1 = order.indexOf(chunk1.names[0]);
						var order2 = order.indexOf(chunk2.names[0]);
						return order1 - order2;
				}
		}),
		new HtmlWebpackPlugin({
			template:resolve('./template/outIndex.html'),
			title:'outIndex',
			filename:'outIndex.html',
			chunks:["outIndex"],
			chunksSortMode: function (chunk1, chunk2) {
						var order = ['outIndex'];
						var order1 = order.indexOf(chunk1.names[0]);
						var order2 = order.indexOf(chunk2.names[0]);
						return order1 - order2;
				}
		}),
		/*new CommonsChunkPlugin({
			names: ['vendor'],
		}),*/
		new UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]
}
