px2rem------------------------------------taobao
postcss-px2rem------------------------postcss系列
// elm
vue: {
	loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
	postcss: [
	  require('autoprefixer')({
	    browsers: ['last 2 versions']
	  })
	]
}

// vue-cli-detail
// 编译css之后自动添加前缀
postcss: [
	require('autoprefixer')({
	  browsers: ['last 2 versions']
	})
]

postcss:[require('postcss-px2rem')({'remUnit':75,'baseDpr':2})]


(env === 'development' && config.dev.cssSourceMap) || 
(env === 'production' && config.build.productionSourceMap)

//webpack#1文档,webpack#2不行，vue is ok
// ,postcss:[require('postcss-px2rem')({'remUnit':75,'baseDpr':2})] 


      {
        test: /\.css/,
        include:[resolve('src/common/css/test.css')]
        loader: 'postcss-loader',
        options: {
          postcss:[require('postcss-px2rem')({'remUnit':75,'baseDpr':2})]
          // plugins: function () {
          //   return [
          //     require('postcss-px2rem')({'remUnit':75,'baseDpr':2})
          //   ];
          // }
        }
       },