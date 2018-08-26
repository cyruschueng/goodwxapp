<?php

/**
 * 用户定制的微信群暗恋小程序
 * 本控制器包含该游戏的全部方法
 * 制作时间  2018-1-13
 * 贵州动点世纪科技有限公司
 * @血狼
 */
namespace app\api\controller\v1\customization\wxhiddenlove\controller;

use app\api\model\UserWxgroups;
use app\api\model\WeixinGroup;
use app\api\model\GroupWeixin;
use app\api\model\UserWeixins;
use app\api\model\CustomizationWeixinGroupHiddenLike;
use app\api\model\CustomizationWeixinGroupHiddenLikeConfig;
use app\api\service\WeixinMessageTemplate;


class WxGroupHiddenLove
{
    /*
     * 喜欢返回格式数据
     * 0 双方互不喜欢
     * 1 只有我喜欢对方
     * 2 双方互相喜欢.
     * */
    public function likeByShe(){
        $gid = input("gid");
        $uid = input("uid");
        $toid = input("toid");
        $formId = input("formId");
        $session_key = input("session_key");

        $Like = CustomizationWeixinGroupHiddenLike::isMyAndSheIsLike($uid,$toid,$gid);
        //返回2 则双方互相喜欢,
        //返回1 则只有我喜欢对方
        $result = ["like" => $Like];
        if($Like == 2){
            $UserWeixinsModel = new UserWeixins();
            // 一旦结果是双方互相暗恋的. 这里小程序要发通知告知双方 .
            $toUser = $UserWeixinsModel->where("id","=",$toid)->find();
            $MyUser = $UserWeixinsModel->where("id","=",$uid)->find();
            $messageTo = WeixinMessageTemplate::sendMessageLike($toUser,$session_key,$formId);
            $result["messageTo"] = $messageTo;
            $messageMy = WeixinMessageTemplate::sendMessageLike($MyUser,$session_key,$formId);
            $result["messageMy"] = $messageMy;
        }
        return $result;
    }

    public function getGroupDetail(){
        $gid = input("gid");
        $uid = input("uid");

        $GDetail = WeixinGroup::getGroupsDetail($gid,$uid );

        foreach($GDetail as $k => $v){
            $toId = $v["weixinuser"]["id"];
            $v["islike"] = CustomizationWeixinGroupHiddenLike::getMyAndSheIsLike($uid,$toId,$gid);
            $v["count"] = CustomizationWeixinGroupHiddenLike::countLikeMyAll($toId,$gid);
        }

        return $GDetail;
    }

    public function getLikes($uid = ""){
        $uid =  $uid ? $uid : input("uid");
        $groups = WeixinGroup::getGroups($uid );
        foreach($groups as $k => $v){
            $c = count($v["selfuid"]);
            $groups[$k]["text"] = "已经有".$c."人参与";
            $groups[$k]["c"] = $c;
            $allLikeMe = CustomizationWeixinGroupHiddenLike::countLikeMyAll($uid,$v["gid"]);
            if($allLikeMe > 0){
                $groups[$k]["text"].=", " .$allLikeMe. "人暗恋你";
            }

            $match= CustomizationWeixinGroupHiddenLike::AllMatched($v["gid"]);
            $groups[$k]["match"] = $match;
            if($match > 0){
                $groups[$k]["text"].=", " .$match. "对配对成功";
            }
            $groups[$k]["text"].="。";
        }
        return $groups;
    }

    public function getGroup(){
        $uid = input("uid");
        $u_id = input("u_id");
        $up = input("up");
        $openGId = input("openGId");

        $Gorup =( new UserWxgroups() )->where("openGId" ,"=", $openGId )->find();


        if(empty($Gorup)){
            $Gorup = ( new UserWxgroups() )->create([
                "openGId" => $openGId
            ]);
        }
        $gid = $Gorup["id"];
        $uid_gid = (new WeixinGroup() )->where(["uid"=>$uid,"gid"=>$gid])->find();

        if(empty($uid_gid)){
            if( $uid != 0 ){
                $WeixinGroup = [
                    "uid" => $uid,
                    "gid"=> $gid,
                    "u_id"=> $u_id,
                    "time" => date('Y-m-d H:i:s',time())
                ];
                (new WeixinGroup() )->create($WeixinGroup);
                $GroupWeixin = [
                    "gid"=> $gid,
                    "uid" => $uid,
                    "u_id"=> $u_id,
                    "time" => date('Y-m-d H:i:s',time())
                ];
                (new GroupWeixin() )->create($GroupWeixin);
            }
        }

        $result["data"] = $gid;
        if($up == "yes"){
            $result["data"] = $this->getLikes($uid);
        }
        return $result;
    }



    public function getInit(){

        $openId = input("openId");
        $u_id = input("u_id");

        $wxUser =( new UserWeixins() )->where("openId" ,"=", $openId )->find();
        if(empty($wxUser)){
            $wxUser = ( new UserWeixins() )->create([
                "openId" => $openId,
                "nickName" => input("nickName"),
                "gender" => input("gender"),
                "language" => input("language"),
                "city" => input("city"),
                "province" => input("province"),
                "country" => input("country"),
                "avatarUrl" => input("avatarUrl"),
                "u_id" => input("u_id"),
                "time" => $date=date('Y-m-d H:i:s', time()),
            ] );

        }
        $id = $wxUser["id"];

        $config = CustomizationWeixinGroupHiddenLikeConfig::getInit($u_id);
        return [
            "uid" => $id,
            "config" => $config
        ];

    }

    public function socket(){

        return "socket";
        set_time_limit(0);
        $address = '0.0.0.0';
        $port = 10006;
        if( ($sock = socket_create(AF_INET, SOCK_STREAM, SOL_TCP)) === false) {
            echo "socket_create() failed, reason: " . socket_strerror(socket_last_error()) . "\n";
        }
        if (socket_bind($sock, $address, $port) === false) {
            echo "socket_bind() failed, reason: " . socket_strerror(socket_last_error($sock)) . "\n";
        }
        if (socket_listen($sock, 5) === false) {
            echo "socket_listen() failed, reason: " . socket_strerror(socket_last_error($sock)) . "\n";
        }


        do {
// 确认客户端的连接请求，成功后，返回一个新的子socket句柄（子线程），用于通信
            if (($msgsock = socket_accept($sock)) === false) {
                echo "socket_accept() failed, reason: ".socket_strerror(socket_last_error($sock)) . "\n";
                break;
            }

            $msg = "Welcome to connect '$address'"."\n";
// 发送消息（数据）到客户端
            if (false === socket_write($msgsock, $msg, strlen($msg))){
                echo "socket_write() failed, reason: " . socket_strerror(socket_last_error($sock)) ."\n";
            }

            echo "Read client message \n";
// 读取客户端的数据
            $receivedData = socket_read($msgsock, 8192);
            echo "Received message: ".$receivedData."\n";;

// 将客户端发来的数据，进行处理，然后再发送数据给客户端
            $responseData = '[time:'.date('Y-m-d H:i:s').']'.PHP_EOL.'[data:'.trim($receivedData).']';
            if (false === socket_write($msgsock, $responseData, strlen($responseData))) {
                echo "socket_write() failed, reason: " . socket_strerror(socket_last_error($sock)) ."\n";
            }
// 关闭连接成功的子socket
            socket_close($msgsock);
        } while(true);

    }
}