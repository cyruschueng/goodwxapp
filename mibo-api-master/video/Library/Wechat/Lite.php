<?php

/**
 *  Lite.php
 *  weixin 登录
 *
 *  Created by SteveAK on 06/21/16
 *  Copyright (c) 2016 SteveAK. All rights reserved.
 *  Contact email(aer_c@qq.com) or qq(7579476)
 */
class Wechat_Lite {

    private $cfg;

    public function __call($method, $arguments) {
        if (method_exists($this, $method)) {
            return call_user_func_array(array(
                &$this,
                $method
            ), $arguments);
        }
    }

    public function __construct() {
        $this->cfg = DI()->config->get('app.thirdLogin.weixin');
    }

    public function get_code() {
        // https://open.weixin.qq.com/connect/qrconnect?appid=wx5251f26ac8f346ab&redirect_uri=http://d.mibolive.com/mibo/callback/wechat.php&response_type=code&scope=snsapi_login&state=1468315383#wechat_redirect
        // https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
        $base_url = "https://open.weixin.qq.com/connect/oauth2/authorize?";
        $req_url = $base_url . "appid=" . $this->cfg['APP_ID'] . "&redirect_uri=" . urlencode($this->cfg['callback']) . "&response_type=code&scope=snsapi_userinfo&state=" . time() . "#wechat_redirect";
        DI()->logger->info("url", $req_url);
        return file_get_contents($req_url);
    }

    public function getAuthorize() {
        $base_url = "https://open.weixin.qq.com/connect/oauth2/authorize?";
        $req_url = $base_url . "appid=" . $this->cfg['APP_ID'] . "&redirect_uri=" . urlencode($this->cfg['callback']) . "&response_type=code&scope=snsapi_userinfo&state=" . time() . "#wechat_redirect";
        DI()->logger->info("url", $req_url);
        header("location:" . $req_url);
    }

    public function get_access_token($code) {
        $base_url = "https://api.weixin.qq.com/sns/oauth2/access_token?";
        $req_url = $base_url . "appid=" . $this->cfg['APP_ID'] . "&secret=" . $this->cfg['APP_SECRET'] . "&code=" . $code . "&grant_type=authorization_code";
        return json_decode(file_get_contents($req_url), true);
    }

    /**
        {
        "openid":"OPENID",
        "nickname":"NICKNAME",
        "sex":1,
        "province":"PROVINCE",
        "city":"CITY",
        "country":"COUNTRY",
        "headimgurl": "http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0",
        "privilege":[
                "PRIVILEGE1",
                "PRIVILEGE2"
            ],
        "unionid": " o6_bmasdasdsad6_2sgVt7hMZOPfL"
        }
     */
    public function get_user_info($access_token, $open_id) {
        $req_url = "https://api.weixin.qq.com/sns/userinfo?access_token=" . $access_token . "&openid=" . $open_id;
        return file_get_contents($req_url);
    }


}