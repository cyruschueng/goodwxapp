<?php
/**
 * Created by TalentBigData -> ddweb.com.cn @血狼.
 * User: XYC
 * Date: 2017/12/26
 * Time: 16:52
 */

namespace app\api\controller\v1;

use app\api\model\ClientsUser;

class Login
{
    /*
     * 该登陆只以API的方式返回
     * 和CMS不同,会以网页端来登陆
     * */
    public function login(){
        ( new \app\lib\validate\UserPwdBePositive() )->goCheck();
        $username = input('username');
        $password = input('password');

        $ClientsUser = new ClientsUser();
        $uid = $ClientsUser->login($username,$password);
        $userInfo = $ClientsUser->getUser($uid);

        return $userInfo;
    }
}

