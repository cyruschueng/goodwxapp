<?php
/**
 * Created by TalentBigData -> ddweb.com.cn @血狼.
 * User: XYC
 * Date: 2017/12/26
 * Time: 16:52
 */

namespace app\manage\controller\user\customization\weixinheddinlike;

use app\manage\controller\BaseController;
use app\manage\controller\user\customization\weixinheddinlike\model\CustomizationWeixinGroupHiddenLikeConfig as thisModel;
use app\manage\controller\user\customization\weixinheddinlike\service\Service;

class Admin extends BaseController
{

    public $data;
    public $u_id;
    /*
     * 该登陆只以API的方式返回
     * 和CMS不同,会以网页端来登陆
     * */

    public function __construct()
    {
        $u_id = session("u_id");
        if(!empty($u_id)){
            $this->u_id = $u_id;
            $username = session("user");
            $data["global"]["name"] = "暗恋小程序";
            $data["global"]["title"] = "微信小程序管理首页,动点世纪开发.";
            $data["user"]["user"] = $username;
            $allUser = Service::allUser($u_id);
            $data["count"]["alluser"] = count($allUser);
            $allGroup = Service::allGroup($u_id);
            $data["count"]["allgroup"] =count($allGroup);
            $allMatch = Service::allMatch($u_id);
            $data["count"]["allmatch"] = count($allMatch);
            $data["alluser"] = $allUser ;
            $this->data = $data;
        }
        parent::__construct();
    }

    public function config(){
        $username = session("user");
        if(empty($username)){
            $this->redirect("/manage/u/c/weixinheddinlike/admin/login");
        }else{
            if(request()->isPost()){
                $arr["to_url"] = input("to_url");
                $arr["name"] = input("name");
                $arr["welecom"] = input("welecom");
                $arr["indexbgurl"] = input("indexbgurl");
                $arr["likebgurl"] = input("likebgurl");
                Service::setCoinfig($this->u_id,$arr);
                $this->redirect("/manage/u/c/weixinheddinlike/admin/config");
            }
            $this->data["config"] = Service::getCoinfig($this->u_id);
            $this->assign("web",$this->data);
            return $this->fetch();
        }
    }

    public function wxconfig(){
        $username = session("user");
        if(empty($username)){
            $this->redirect("/manage/u/c/weixinheddinlike/admin/login");
        }else{
            if(request()->isPost()){
                $arr["u_id"] = $this->u_id;
                $arr["app_id"] = input("app_id");
                $arr["app_secret"] = input("app_secret");
                $arr["token"] = input("token");
                $arr["encoding_aes_key"] = input("encoding_aes_key");
                Service::setWxCoinfig($this->u_id,$arr);
                $this->redirect("/manage/u/c/weixinheddinlike/admin/wxconfig");
            }

            $this->data["config"] = Service::getWxCoinfig($this->u_id);
            $this->assign("web",$this->data);
            return $this->fetch();
        }
    }

    public function account(){
        $username = session("user");
        if(empty($username)){
            $this->redirect("/manage/u/c/weixinheddinlike/admin/login");
        }else{
            if(request()->isPost()){
                $arr["pwd"] = input("pwd");
                Service::setCoinfig($this->u_id,$arr);
            }
            $this->data["config"] = Service::getCoinfig($this->u_id);
            $this->assign("web",$this->data);
            return $this->fetch();
        }
    }


    public function clear(){
        $username = session("user");
        if(empty($username)){
            $this->redirect("/manage/u/c/weixinheddinlike/admin/login");
        }else{
            if(request()->isPost()){
                $arr["pwd"] = [];
                //Service::setCoinfig($this->u_id,$arr);
            }
            $this->assign("web",$this->data);
            return $this->fetch();
        }
    }

    public function index(){

        $username = session("user");
        if(empty($username)){
            $this->redirect("/manage/u/c/weixinheddinlike/admin/login");
        }else{

            $this->assign("web",$this->data);
            return $this->fetch();
        }
    }


    public function outlogin(){
        session("user",NULL);
        $this->redirect("/manage/u/c/weixinheddinlike/admin/login");
    }


    public function login(){
        $data["global"]["title"] = "微信小程序管理后台,动点世纪开发.";
        $this->assign("web",$data);
        if(request()->isPost()){
            $user = input("user");
            $pwd = input("pwd");
            $user = thisModel::getUser($user ,$pwd);
            if(empty($user)){
                $this->assign("login_info","账号密码错误 ");
                return $this->fetch();
            }
            unset($user["pwd"]);
            session("user",$user["user"]);
            session("u_id",$user["u_id"]);
            $this->redirect("/manage/u/c/weixinheddinlike/admin/index");
        }else{
            return $this->fetch();
        }

    }
}

