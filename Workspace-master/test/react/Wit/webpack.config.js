var webpack = require("webpack");
var path = require("path");

module.exports = {
    entry: path.resolve(__dirname, './src/entry.js'),
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "build.js"
    },
    module: {
		loaders: [{
			loader: "babel",
			query: {
                presets: ['react','es2015']
            }
		},{
            test: /\.css$/,
            loader: 'style-loader!css-loader' 
        },{
        	test: /\.scss$/,
        	loader: 'style!css!sass'       
        }, {
            test: /\.less$/,
            loader: 'style!css!less'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192&name=./img/[hash].[ext]'
        }]
	},
	resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    plugins: [
    	//压缩js代码
        new webpack.DefinePlugin({//删除警告
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
        	except: ['$super', '$', 'exports', 'require']	//排除关键字
        }),
    ]
};


