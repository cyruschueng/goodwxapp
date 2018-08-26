<?php
/**
 * Created by PhpStorm.
 * User: code
 * Date: 1/14/2018
 * Time: 11:15 AM
 */

namespace app\api\service;


class WeixinMessageTemplate
{

    public static function sendMessageLike($user,$session_key,$formId)
    {
        $url = config("wx.message");
        $cacheSessionKey = cache($session_key);
        $sessionKey = $cacheSessionKey["session_key"];
        $weixURL = sprintf($url,$sessionKey);
        $postArr = [
            "touser" => "",
            "template_id" => "QCs7uUK5gmvPUjmfA-laYHp9hWM-lOEzRAFxJl_bPew",
            "page" => "index",
            "form_id" => $formId,
            "data" => [
                "keyword1"=> [ //对方昵称
                    "value"=> $user["nickName"],
                    "color"=> "#FF6A6A"
                ],
                "keyword2"=> [ //匹配时间
                    "value"=> date("y-m-d:h-i",time()),
                    "color"=> "#FFBBFF"
                ],
                "keyword3"=> [ //类型
                    "value"=> "互相暗恋",
                    "color"=> "#FFBBFF"
                ],
                "keyword4"=> [ //所在城市
                    "value"=> $user["city"],
                    "color"=> "#FFBBFF"
                ],
                "keyword5"=> [ //活动名称
                    "value"=> "群暗恋小活动",
                    "color"=> "#A2CD5A"
                ],
            ],
            "emphasis_keyword" => "keyword1.DATA",
        ];
        $re = PostUrl($weixURL,$postArr);
        return $re;
    }
}