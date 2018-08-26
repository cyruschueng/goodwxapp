工程化
gulp,webpack(压缩，整理，打包，代码评估，自动化测试)

babel和browserify模块编译

browserr-sync代码同步

webpack+各类cliw


-----------------ok--------总结-----------------------------------------------
1.在webpack文件中，img压缩：
src="img.path", 
存储路径：本地，服务器（cdn）
压缩：不能形成base64(利用htmlhtml-withimg-loade也可以打包)

background-images,
存储路径：本地
压缩：能形成base64

2.images:
静态文件：
html和images都是静态的，
在vue中src会自动复制到dist/images
在css中的backgound-images会自动压缩，

动态文件：
要想使用vue,使images渲染在html里面，就得注意在目录中有images,或者直接指向cdn
------------------------------------------------------------------------------