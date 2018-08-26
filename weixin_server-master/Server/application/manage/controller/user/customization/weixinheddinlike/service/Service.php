<?php

/**
 * Created by PhpStorm.
 * User: code
 * Date: 1/15/2018
 * Time: 4:41 AM
 */
namespace app\manage\controller\user\customization\weixinheddinlike\service;

use think\Db;

class Service
{
    public static function allUser($uid){
        $allUser = Db::name("user_weixins")/*->where("u_id","=",$uid)*/->select();
        return  $allUser;
    }

    public static function allGroup($uid){
        $allGroup = Db::name("user_wxgroups")/*->where("u_id","=",$uid)*/->select();
        return  $allGroup;
    }

    public static function share($uid){
        $share = Db::name("user_wxgroups")/*->where("u_id","=",$uid)*/->select();
        return  $share;
    }

    public static function allMatch($uid){
        $AllMatch=0;
        $likes = Db::name("customization_weixin_group_hidden_like")->select();
        foreach($likes as $k => $v){
            foreach($likes as $k2 => $v2){
                if( $v["uid"] == $v2["toid"] && $v["toid"] == $v2["uid"] ){
                    $AllMatch++;
                }
            }
        }
        return (int)$AllMatch/2;
    }

    public static function getCoinfig($uid){
        $Coinfig = Db::name("customization_weixin_group_hidden_like_config")->where("u_id","=",$uid)->find();
        return  $Coinfig;
    }

    public static function setCoinfig($uid,$config){
        $update = Db::name("customization_weixin_group_hidden_like_config")->where("u_id","=",$uid)->update($config);
        return  $update;
    }


    public static function getWxCoinfig($uid){
        $Coinfig = Db::name("clients_weixin")->where("u_id","=",$uid)->find();
        return  $Coinfig;
    }
    public static function setWxCoinfig($uid,$config){
        $c = self::getWxCoinfig($uid);
        $db = Db::name("clients_weixin");
        if( empty($c) )
        {
            $update = $db->save($config);
        }else{
            $update = $db->where("u_id","=",$uid)->update($config);
        }
        return  $update;
    }


}