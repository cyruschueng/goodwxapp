
var HtmlWebpackPlugin=require("html-webpack-plugin");
// var path = require('path')
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
// var rootPath='./detection.picooc.com/web/fatburntestReact';
var path=require("path");//npm的路径工具
module.exports={
	//输入
	entry:{
		//vendor:['jquery','react','react-dom','pubsub-js'],
		//path.resolve路径的合并方法，__dirname是config文件所在的绝对路径
		vendor:['react','react-dom','pubsub-js'],
		student:path.resolve(__dirname,'jsx/student.jsx'),
		rankList:path.resolve(__dirname,'jsx/RankList.jsx'),
		bodyChange:path.resolve(__dirname,'jsx/BodyChange.jsx'),
		messageList:path.resolve(__dirname,'jsx/MessageList.jsx'),
		setcard:path.resolve(__dirname,'jsx/Setcard.jsx'),
		figureContrast:path.resolve(__dirname,'jsx/FigureContrast.jsx'),
		figureContrast2:path.resolve(__dirname,'jsx/FigureContrast2.jsx'),
		photoAlbum:path.resolve(__dirname,'jsx/PhotoAlbum.jsx'),
		reportList:path.resolve(__dirname,'jsx/ReportList.jsx'),
		reportDetial:path.resolve(__dirname,'jsx/ReportDetial.jsx'),
		studentStudentInfo:path.resolve(__dirname,'jsx/StudentStudentInfo.jsx'),
		studentOtherInfo:path.resolve(__dirname,'jsx/StudentOtherInfo.jsx'),
		editPhoto:path.resolve(__dirname,'jsx/EditPhoto.jsx'),
		info:path.resolve(__dirname,'jsx/Info.jsx'),
		figureContrastShare:path.resolve(__dirname,'jsx/FigureContrastShare.jsx'),
		historyFatburn:path.resolve(__dirname,'jsx/HistoryFatburn.jsx'),
		orderSuccess:path.resolve(__dirname,'jsx/OrderSuccess.jsx'),
		confirmOrder:path.resolve(__dirname,'jsx/ConfirmOrder.jsx'),
		myOrder:path.resolve(__dirname,'jsx/MyOrder.jsx'),
		orderDetails:path.resolve(__dirname,'jsx/OrderDetails.jsx'),
		discount:path.resolve(__dirname,'jsx/Discount.jsx'),
		chooseCoupon:path.resolve(__dirname,'jsx/ChooseCoupon.jsx'),
		receiveCoupon:path.resolve(__dirname,'jsx/ReceiveCoupon.jsx'),
		productDetails:path.resolve(__dirname,'jsx/ProductDetails.jsx'),
		trainPlan:path.resolve(__dirname,'jsx/TrainPlan.jsx'),
		personInfo:path.resolve(__dirname,'jsx/PersonInfo.jsx'),
		infoTest:path.resolve(__dirname,'jsx/InfoTest.jsx'),
		editInfo:path.resolve(__dirname,'jsx/EditInfo'),

		myFatBurn:path.resolve(__dirname,'jsx/MyFatBurn.jsx'),
		historyCamp:path.resolve(__dirname,'jsx/HistoryCamp.jsx'),
		myInfo:path.resolve(__dirname,'jsx/MyInfo.jsx'),
		payment:path.resolve(__dirname,'jsx/Payment.jsx'),
		ordered:path.resolve(__dirname,'jsx/Ordered.jsx'),
		confirmOrderOut:path.resolve(__dirname,'jsx/ConfirmOrderOut.jsx'),//app外确认订单
		orderDetailsOut:path.resolve(__dirname,'jsx/OrderDetailsOut.jsx'),//app外订单详情


		//燃脂营1.7页面
		cardShare:path.resolve(__dirname,'jsx/cardShare.jsx'),//打卡分享
		rankListStu:path.resolve(__dirname,'jsx/rankListStu.jsx'),//每周减脂排行中增加打卡率展现
		rankListToday:path.resolve(__dirname,'jsx/rankListToday.jsx')//今日打卡排行

		//d:'./test/d.js',
		//cc:['./test/a.js','./test/b.js'],
	},
	//输出
	output:{
		path:path.resolve(__dirname),
		//publicPath:"https://cdn2.picooc.com/web/res/fatburn",
		// path:rootPath+"/jsv2/",
		filename:'jsv2/[name].js',

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
		//对文件进行转换
		loaders:[
			{
				test:/.css$/,
				loaders:["style-loader","css-loader"],
				exclude:"/node_modules/",
				include:path.resolve(__dirname,'css')
			},{
				test:/.jsx$/,
				loader:'babel-loader',
				options:{//告诉babel需要怎么转
					presets:["es2015","react"]
				},
				exclude:"/node_modules/",
				include:path.resolve(__dirname,'jsx')
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
	    // progress: true
	},
	resolve:{
		extensions:['.js',".css",'.jsx']//自动补全文件后缀
		/*alias:{
			react:'./test3/src/react.min',
			jquery: './test3/src/jquery-3.0.0.min.js' 
		}*/
	},
	watch: true,
	plugins: [

	new CommonsChunkPlugin({
            names: ['vendor'],
        }),/*,
	new UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })*/
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/cardShare.html'),
			title:'cardShare',
			filename:'cardShare.html',
			chunks:["vendor","cardShare"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","cardShare"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/rankListStu.html'),
			title:'rankListStu',
			filename:'rankListStu.html',
			chunks:["vendor","rankListStu"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","rankListStu"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/rankListToday.html'),
			title:'rankListToday',
			filename:'rankListToday.html',
			chunks:["vendor","rankListToday"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","rankListToday"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/info.html'),
			title:'info',
			filename:'info.html',
			chunks:["vendor","info"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","info"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/student.html'),
			title:'student',
			filename:'student.html',
			chunks:["vendor","student"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","student"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),

		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/trainPlan.html'),
			title:'trainPlan',
			filename:'trainPlan.html',
			chunks:["vendor","trainPlan"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","trainPlan"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/reportList.html'),
			title:'reportList',
			filename:'reportList.html',
			chunks:["vendor","reportList"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","reportList"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),


		/*//编译所有的文件
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/cardShare.html'),
			title:'cardShare',
			filename:'cardShare.html',
			chunks:["vendor","cardShare"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","cardShare"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/rankListStu.html'),
			title:'rankListStu',
			filename:'rankListStu.html',
			chunks:["vendor","rankListStu"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","rankListStu"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/rankListToday.html'),
			title:'rankListToday',
			filename:'rankListToday.html',
			chunks:["vendor","rankListToday"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","rankListToday"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/bodyChange.html'),
			title:'bodyChange',
			filename:'bodyChange.html',
			chunks:["vendor","bodyChange"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","bodyChange"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/chooseCoupon.html'),
			title:'chooseCoupon',
			filename:'chooseCoupon.html',
			chunks:["vendor","chooseCoupon"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","chooseCoupon"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/confirmOrder.html'),
			title:'confirmOrder',
			filename:'confirmOrder.html',
			chunks:["vendor","confirmOrder"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","confirmOrder"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/confirmOrderOut.html'),
			title:'confirmOrderOut',
			filename:'confirmOrderOut.html',
			chunks:["vendor","confirmOrderOut"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","confirmOrderOut"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/discount.html'),
			title:'discount',
			filename:'discount.html',
			chunks:["vendor","discount"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","discount"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/editInfo.html'),
			title:'editInfo',
			filename:'editInfo.html',
			chunks:["vendor","editInfo"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","editInfo"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/editInfo2.html'),
			title:'editInfo2',
			filename:'editInfo2.html',
			chunks:["vendor","editInfo"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","editInfo"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/editPhoto.html'),
			title:'editPhoto',
			filename:'editPhoto.html',
			chunks:["vendor","editPhoto"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","editPhoto"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/editReport.html'),
			title:'editReport',
			filename:'editReport.html',
			chunks:[],
			chunksSortMode: function (chunk1, chunk2) {
				var order = [];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/figureContrast.html'),
			title:'figureContrast',
			filename:'figureContrast.html',
			chunks:["vendor","figureContrast"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","figureContrast"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/figureContrast2.html'),
			title:'figureContrast2',
			filename:'figureContrast2.html',
			chunks:["vendor","figureContrast2"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","figureContrast2"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/figureContrastShare.html'),
			title:'figureContrastShare',
			filename:'figureContrastShare.html',
			chunks:["vendor","figureContrastShare"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","figureContrastShare"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/figureContrastTrainer.html'),
			title:'figureContrastTrainer',
			filename:'figureContrastTrainer.html',
			chunks:[],
			chunksSortMode: function (chunk1, chunk2) {
				var order = [];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/hdConfirmOrder.html'),
			title:'hdConfirmOrder',
			filename:'hdConfirmOrder.html',
			chunks:[],
			chunksSortMode: function (chunk1, chunk2) {
				var order = [];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/hdOrderDetails.html'),
			title:'hdOrderDetails',
			filename:'hdOrderDetails.html',
			chunks:[],
			chunksSortMode: function (chunk1, chunk2) {
				var order = [];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/hdPaySuccess.html'),
			title:'hdPaySuccess',
			filename:'hdPaySuccess.html',
			chunks:[],
			chunksSortMode: function (chunk1, chunk2) {
				var order = [];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/historyCamp.html'),
			title:'historyCamp',
			filename:'historyCamp.html',
			chunks:["vendor","historyCamp"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","historyCamp"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/historyFatburn.html'),
			title:'historyFatburn',
			filename:'historyFatburn.html',
			chunks:["vendor","historyFatburn"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","historyFatburn"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/info.html'),
			title:'info',
			filename:'info.html',
			chunks:["vendor","info"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","info"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/infoTest.html'),
			title:'infoTest',
			filename:'infoTest.html',
			chunks:["vendor","infoTest"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","infoTest"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/infoShare.html'),
			title:'infoShare',
			filename:'infoShare.html',
			chunks:["vendor","infoShare"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","infoShare"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/infotest2.html'),
			title:'infotest2',
			filename:'infotest2.html',
			chunks:[],
			chunksSortMode: function (chunk1, chunk2) {
				var order = [];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/messageList.html'),
			title:'messageList',
			filename:'messageList.html',
			chunks:["vendor","messageList"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","messageList"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/myFatBurn.html'),
			title:'myFatBurn',
			filename:'myFatBurn.html',
			chunks:["vendor","myFatBurn"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","myFatBurn"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/myInfo.html'),
			title:'myInfo',
			filename:'myInfo.html',
			chunks:["vendor","myInfo"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","myInfo"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/myOrder.html'),
			title:'myOrder',
			filename:'myOrder.html',
			chunks:["vendor","myOrder"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","myOrder"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/openTrain.html'),
			title:'openTrain',
			filename:'openTrain.html',
			chunks:[],
			chunksSortMode: function (chunk1, chunk2) {
				var order = [];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/orderDetails.html'),
			title:'orderDetails',
			filename:'orderDetails.html',
			chunks:["vendor","orderDetails"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","orderDetails"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/orderDetailsOut.html'),
			title:'orderDetailsOut',
			filename:'orderDetailsOut.html',
			chunks:["vendor","orderDetailsOut"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","orderDetailsOut"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/ordered.html'),
			title:'ordered',
			filename:'ordered.html',
			chunks:["vendor","ordered"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","ordered"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/orderSuccess.html'),
			title:'orderSuccess',
			filename:'orderSuccess.html',
			chunks:["vendor","orderSuccess"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","orderSuccess"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/pay.html'),
			title:'pay',
			filename:'pay.html',
			chunks:[],
			chunksSortMode: function (chunk1, chunk2) {
				var order = [];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/payment.html'),
			title:'payment',
			filename:'payment.html',
			chunks:["vendor","payment"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","payment"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/personInfo.html'),
			title:'personInfo',
			filename:'personInfo.html',
			chunks:["vendor","personInfo"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","personInfo"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/photoAlbum.html'),
			title:'photoAlbum',
			filename:'photoAlbum.html',
			chunks:["vendor","photoAlbum"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","photoAlbum"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/productDetails.html'),
			title:'productDetails',
			filename:'productDetails.html',
			chunks:["vendor","productDetails"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","productDetails"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/publishReport.html'),
			title:'publishReport',
			filename:'publishReport.html',
			chunks:[],
			chunksSortMode: function (chunk1, chunk2) {
				var order = [];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/question1.html'),
			title:'question1',
			filename:'question1.html',
			chunks:[],
			chunksSortMode: function (chunk1, chunk2) {
				var order = [];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/question2.html'),
			title:'question2',
			filename:'question2.html',
			chunks:[],
			chunksSortMode: function (chunk1, chunk2) {
				var order = [];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/question3.html'),
			title:'question3',
			filename:'question3.html',
			chunks:[],
			chunksSortMode: function (chunk1, chunk2) {
				var order = [];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/question4.html'),
			title:'question4',
			filename:'question4.html',
			chunks:[],
			chunksSortMode: function (chunk1, chunk2) {
				var order = [];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/question5.html'),
			title:'question5',
			filename:'question5.html',
			chunks:[],
			chunksSortMode: function (chunk1, chunk2) {
				var order = [];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/question6.html'),
			title:'question6',
			filename:'question6.html',
			chunks:[],
			chunksSortMode: function (chunk1, chunk2) {
				var order = [];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/questionnaire.html'),
			title:'questionnaire',
			filename:'questionnaire.html',
			chunks:[],
			chunksSortMode: function (chunk1, chunk2) {
				var order = [];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/questionnaire1.html'),
			title:'questionnaire1',
			filename:'questionnaire1.html',
			chunks:[],
			chunksSortMode: function (chunk1, chunk2) {
				var order = [];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/questionnaire2.html'),
			title:'questionnaire2',
			filename:'questionnaire2.html',
			chunks:[],
			chunksSortMode: function (chunk1, chunk2) {
				var order = [];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/questionnaireShow.html'),
			title:'questionnaireShow',
			filename:'questionnaireShow.html',
			chunks:[],
			chunksSortMode: function (chunk1, chunk2) {
				var order = [];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/questionnaireShow1.html'),
			title:'questionnaireShow1',
			filename:'questionnaireShow1.html',
			chunks:[],
			chunksSortMode: function (chunk1, chunk2) {
				var order = [];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/questionSubmit.html'),
			title:'questionSubmit',
			filename:'questionSubmit.html',
			chunks:[],
			chunksSortMode: function (chunk1, chunk2) {
				var order = [];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/rankList.html'),
			title:'rankList',
			filename:'rankList.html',
			chunks:["vendor","rankList"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","rankList"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/receiveCoupon.html'),
			title:'receiveCoupon',
			filename:'receiveCoupon.html',
			chunks:["vendor","receiveCoupon"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","receiveCoupon"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/reportDetial.html'),
			title:'reportDetial',
			filename:'reportDetial.html',
			chunks:["vendor","reportDetial"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","reportDetial"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/reportDetialTrainer.html'),
			title:'reportDetialTrainer',
			filename:'reportDetialTrainer.html',
			chunks:[],
			chunksSortMode: function (chunk1, chunk2) {
				var order = [];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/reportList.html'),
			title:'reportList',
			filename:'reportList.html',
			chunks:["vendor","reportList"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","reportList"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/searchsendmsg.html'),
			title:'searchsendmsg',
			filename:'searchsendmsg.html',
			chunks:[],
			chunksSortMode: function (chunk1, chunk2) {
				var order = [];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/setcard.html'),
			title:'setcard',
			filename:'setcard1.html',
			chunks:["vendor","setcard"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","setcard"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/student.html'),
			title:'student',
			filename:'student.html',
			chunks:["vendor","student"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","student"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/studentList.html'),
			title:'studentList',
			filename:'studentList.html',
			chunks:[],
			chunksSortMode: function (chunk1, chunk2) {
				var order = [];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/studentOtherInfo.html'),
			title:'studentOtherInfo',
			filename:'studentOtherInfo.html',
			chunks:["vendor","studentOtherInfo"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","studentOtherInfo"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/studentStudentInfo.html'),
			title:'studentStudentInfo',
			filename:'studentStudentInfo.html',
			chunks:["vendor","studentStudentInfo"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","studentStudentInfo"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/trainerStudentInfo.html'),
			title:'trainerStudentInfo',
			filename:'trainerStudentInfo.html',
			chunks:[],
			chunksSortMode: function (chunk1, chunk2) {
				var order = [];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/trainExplain.html'),
			title:'trainExplain',
			filename:'trainExplain.html',
			chunks:[],
			chunksSortMode: function (chunk1, chunk2) {
				var order = [];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/trainPlan.html'),
			title:'trainPlan',
			filename:'trainPlan.html',
			chunks:["vendor","trainPlan"],
			chunksSortMode: function (chunk1, chunk2) {
				var order = ["vendor","trainPlan"];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),
		new HtmlWebpackPlugin({
			template:path.resolve(__dirname,'template/withoutCamp.html'),
			title:'withoutCamp',
			filename:'withoutCamp.html',
			chunks:[],
			chunksSortMode: function (chunk1, chunk2) {
				var order = [];
				var order1 = order.indexOf(chunk1.names[0]);
				var order2 = order.indexOf(chunk2.names[0]);
				return order1 - order2;
			}
		}),*/
    ]
}









