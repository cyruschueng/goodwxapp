<?php
/**
 * Created by TalentBigData -> ddweb.com.cn @血狼.
 * User: XYC
 * Date: 2017/12/28
 * Time: 18:00
 */

namespace app\api\model;

use app\api\service\UserWeixinTokenServer;
use app\lib\exception\BaseException;
use app\lib\exception\LoginException;

class ClientsUser extends BaseModel
{

    protected $hidden = ["u_api_use_count","u_api_consume"];

    public function login($username,$password){
        /*
         * @password 密码
         * @username 账户
         * @api = client 用于对接WHMCS 区别于网页登陆
         * */
        /*使用WHCMS的登陆验证模块*/

        $_POST["username"] = $username;
        $_POST["password"] = $password;
        $_POST["api"] = "client";

        $WHMCSLogin = __DIR__ . "/../../../cloud/dologin.php";
        if( !file_exists( $WHMCSLogin ) ){
            throw new LoginException([
                "errorCode" => 200005
            ]);
        }

        $isLogin = require $WHMCSLogin;
        if( !$isLogin){
            throw new LoginException();
        }

        $uid = @$_SESSION["uid"];
        $tkval = @$_SESSION["tkval"];
        session("whmcs_uid",$uid);
        session("whmcs_tkval",$tkval);
        return $uid;
    }


    public function getUser($uid){
        if(empty($uid)){
            throw new LoginException([
                "errorCode"=>200002
            ]);
        }
        $user = $this->where("u_id","=",$uid)->find();
        if(empty($user)){
            $user = $this->PrimaryAddUserToDB();
        }
        /*
         *  调用客户用户模块..*/
        UserWeixinTokenServer::saveUserAnTokenInCache($user);
        return $user;
    }

    public function getUserByToken($token){
        if(empty($token)){
            throw new BaseException([
                "errorCode"=>400002
            ]);
        }
        $user = $this->where("token","=",$token)->find();
        if(empty($user)){
            throw new LoginException([
                "errorCode"=>200006
            ]);
        }
        return $user;
    }

    public function PrimaryAddUserToDB(){
        /*用户初始化*/
        $uid = session("uid");
        $time = time();
        $u["whmcs_tkval"] = session("tkval");
        $u["whmcs_uid"] = $uid;
        $u["u_web_user"] = $uid;
        $u["u_api_use_count"] = 0;
        $u["u_api_consume"] = 0;
        $u["u_time"] = $time;
        $u["token"] = md5("{$uid}{$time}".config("secure.token_salt"));
        $u["scope"] = 16;
        $user_id = $this->insert($u);
        if(empty($user_id)){
            throw new LoginException([
                "errorCode" => 100005
            ]);
        }
        return $u;
    }


}