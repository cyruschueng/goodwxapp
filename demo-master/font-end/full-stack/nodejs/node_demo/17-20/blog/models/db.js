/**
 *创建数据库连接
 * 该模块只会被加载一次，一直使用相同的实例
 */
//引入连接配置的模块
var settings=require("../settings");
//得到db对象
var Db=require("mongodb").Db;
//得到连接对象
var Connection=require("mongodb").Connection;
//得到服务对象
var Server=require("mongodb").Server;
//创建连接对象并暴漏给你接口
module.exports=new Db(settings.db,new Server(settings.host,Connection.DEFAULT_PORT,{}));


