# wx-todos

一个简单的微信小程序开发构建工具。

## 项目介绍

> 使用gulp构建工具搭建。所有微信原生异步接口Promise化

### 主要功能

1. 支持根据环境切换`project.config.js`的`urlCheck`值
2. 支持`ES6`转`ES5`。
3. 支持`JS压缩`。
4. 支持`SCSS编译`。
5. 支持`IMAGE压缩`。
6. 支持`JSON压缩`。
7. 支持`App.json`自动更新（`config/config.js`是`App.json`的配置项，程序会将`App.json`中包含默认值的属性删除，防止不必要的配置增加小程序体积）。
8. 支持将`node_modules`中的文件拷贝到`dist/npm`目录下，并修改`require/import`的引用为相对路径。
9. 支持将必要的文件引入`dist`，减少无用的文件导致小程序体积过大。
10. 支持`ESLint`代码规范检查。

### 注意事项

1. 小程序中，`wxss`引入文件的关键字`@import`与`sass`的关键字冲突，会导致原本独立的文件被合并成一个文件，造成体积的增大。**解决方案是**：在文件名后缀的`.scss`修改为`.wxss`，构建工具会独立为相应的文件打包，并保留`@import`引入。
2. 虽然构建工具从某种程度上对无用文件做了处理，但是如果你在文件中引入一个不会使用的文件，构建工具仍然会将这个文件打包进`dist`目录，所以需要特别注意。
3. 如果要修改`App.json`，在`config`文件夹中，找到`config.js`，可以在里面修改，只需要将不需要的选项的参数改成默认项，工具会自动在生成`App.json`时忽略它。

## 参考文档

- [微信小程序简易教程](https://mp.weixin.qq.com/debug/wxadoc/dev/)
- [微信小程序框架](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/MINA.html)
- [微信小程序组件](https://mp.weixin.qq.com/debug/wxadoc/dev/component/)
- [微信小程序API](https://mp.weixin.qq.com/debug/wxadoc/dev/api/)
- [微信小程序工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html)
- [微信小程序Q&A](https://mp.weixin.qq.com/debug/wxadoc/dev/qa.html)
- [微信小程序开发者社区](https://developers.weixin.qq.com/)

****

>     作者：Sky
>     邮箱：lihaizhong@jd.com
>     日期：2018年01月26日
