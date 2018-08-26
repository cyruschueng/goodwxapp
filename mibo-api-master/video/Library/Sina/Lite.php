<?php

/**
 * Class sina_Lite
 */
require_once dirname(__FILE__) . DIRECTORY_SEPARATOR . "saetv2.ex.class.php";

class Sina_Lite extends SaeTOAuthV2 {


    function __construct() {
        $cfg = DI()->config->get("app.thirdLogin.sina");
        parent::__construct($cfg['WB_AKEY'] , $cfg['WB_SKEY']);
    }

    function getUserinfo($access_token, $uid) {
        $base_url = "https://api.weibo.com/2/users/show.json";
        $prames = array(
            'access_token'=>$access_token,
            'uid'=>$uid,
        );

        $response_json = file_get_contents($base_url."?".http_build_query($prames));
        $wb_user_info = json_decode($response_json, true);
        if (!empty($wb_user_info) && isset($wb_user_info['id']) && $wb_user_info['id'] > 0) {
            return $wb_user_info;
        }
        return false;
    }


}
