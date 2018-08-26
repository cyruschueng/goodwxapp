# SharingParkingPlace

米小宝是一款基于树莓派的智能物联网家居产品，具有人脸识别防侵入、智能闹钟、语音控制、电影查询助手等功能。

### Prerequisites

必须在之前配置好LAMP、Spider、mutt环境，并且应当已经获得API的使用权
有一部分的参考资料以及配置shell在我的CSDN博客上有展示[RaspberryPi's GPIO](http://blog.csdn.net/qq_37702781/article/details/76135511)
   以及[RaspberryPi's Preference](http://blog.csdn.net/qq_37702781/article/details/78344842)
```
配置环境可以参考我在GitHub上的另一个项目：AfterInstallLinux
```
项目网址：[AfterInstallLinux](https://github.com/wangxinshuo426/AfterInstallLinux/tree/master/RaspberryPi)
### Installing

配置环境

```
LAMP、Spider、mutt
sudo apt-get install php7.0-curl
```

Clone代码、配置服务器

```
服务器：ffmpeg、接口验证参数
```
服务器相关配置shell：[AfterInstallLinux](https://github.com/wangxinshuo426/AfterInstallLinux/tree/master/CentOS_7.2)

小程序端完成测试配置

## Following may be Useful

CSDN中我的示例程序：[Example in CSDN](http://blog.csdn.net/qq_37702781/article/details/76100461)
树莓派实验室网址：[树莓派实验室](http://shumeipai.nxez.com/)

以下的为API提供商的网址
[Baidu AI](http://ai.baidu.com/),
[AliCloud](https://www.aliyun.com/),
[face++](https://www.faceplusplus.com.cn/).

## Something Can be changed

* 服务器端的小程序后台可以优化
* 树莓派的一些功能可以交由服务器来完成

## Built With

* [KingPHP](https://github.com/wangxinshuo426/King) - The web framework used

## Authors

* **wangxinshuo426** - *Initial work* - [wangxinshuo426](https://github.com/wangxinshuo426)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

