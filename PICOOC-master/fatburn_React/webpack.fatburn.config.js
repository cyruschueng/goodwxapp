var htmlWebpackPlugin = require('html-webpack-plugin');

var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
var rootPath='./detection.picooc.com/web/fatburntestReact';
module.exports={
	entry:{
		//vendor:['jquery','react','react-dom','pubsub-js'],
		vendor:['react','react-dom','pubsub-js'],
		student:[rootPath+'/jsx/student.jsx'],
		rankList:[rootPath+'/jsx/rankList.jsx'],
		bodyChange:[rootPath+'/jsx/BodyChange.jsx'],
		messageList:[rootPath+'/jsx/MessageList.jsx'],
		setcard:[rootPath+'/jsx/Setcard.jsx'],
		figureContrast:[rootPath+'/jsx/FigureContrast.jsx'],
		figureContrast2:[rootPath+'/jsx/FigureContrast2.jsx'],
		photoAlbum:[rootPath+'/jsx/PhotoAlbum.jsx'],
		reportList:[rootPath+'/jsx/ReportList.jsx'],
		reportDetial:[rootPath+'/jsx/ReportDetial.jsx'],
		studentStudentInfo:[rootPath+'/jsx/StudentStudentInfo.jsx'],
		studentOtherInfo:[rootPath+'/jsx/StudentOtherInfo.jsx'],
		editPhoto:[rootPath+'/jsx/EditPhoto.jsx'],
		info:[rootPath+'/jsx/info.jsx'],
		figureContrastShare:[rootPath+'/jsx/FigureContrastShare.jsx'],
		historyFatburn:[rootPath+'/jsx/HistoryFatburn.jsx'],
		orderSuccess:[rootPath+'/jsx/OrderSuccess.jsx'],
		confirmOrder:[rootPath+'/jsx/ConfirmOrder.jsx'],
		myOrder:[rootPath+'/jsx/myOrder.jsx'],
		orderDetails:[rootPath+'/jsx/orderDetails.jsx'],
		discount:[rootPath+'/jsx/discount.jsx']

		//d:'./test/d.js',
		//cc:['./test/a.js','./test/b.js'],
	},
	output:{
		path:rootPath+"/jsv2/",
		filename:'[name].js'
	},
/*	module:{
		loaders:[
			{
				test:/\.css$/,
				loader:'style-loader!css-loader',
				exclude:"/node_modules/"
			}
		]
	},*/
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
		//noParse:[/react/,/jquery/]
		
	},
	/*externals:{
        "react": 'React',
        "react-dom": 'ReactDOM',
        "jquery":"jQuery"
    },*/
	devServer:{
		historyApiFallback: true,
	    hot: true,
	    inline: true,
	    progress: true
	},
	resolve:{
		extensions:['','.js',".css",'.jsx']
		/*alias:{
			react:'./test3/src/react.min',
			jquery: './test3/src/jquery-3.0.0.min.js' 
		}*/
	},
	watch: true,
	plugins: [
       // new webpack.optimize.CommonsChunkPlugin({
       //     names: ['vendor'],
       // })
        
	new CommonsChunkPlugin({
            names: ['vendor'],
        })/*,
	new UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })*/
    ]
}









