/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 12-9-25
 * Time: 上午11:28
 * To change this template use File | Settings | File Templates.
 */
//引入数据库操作模块
var mongodb=require("./db");
//声明User类
function User(user){
    this.name=user.name;
    this.password=user.password;
};
/**
 * 增加查询用户静态方法
 * @param username 用户名
 * @param callback
 */
User.find= function(username,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection("users",function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //查找name属性为usename的文档
            collection.findOne({name:username},function(err,doc){
                mongodb.close();
                if(doc){
                    //封装文档为User对象
                    var user=new User(doc);
                    callback(err,user);
                }else{
                    callback(err,null);
                }
            })
        })
    })
}
//将User类给予接口
module.exports=User;
/**
 *使用原型增加保存方法
 * @param callback
 */
User.prototype.save=function save(callback){
    //存入monggodb的文档
    var user={
        name:this.name,
        password:this.password
    };
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        //读取users集合
        db.collection("users",function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
           //为name属性增加索引
            collection.ensureIndex("name",{unique:true});
            //写入User文档
            collection.insert(user,{safe:true},function(err){
                mongodb.close();
                callback(err);
            })
        })
    })
}