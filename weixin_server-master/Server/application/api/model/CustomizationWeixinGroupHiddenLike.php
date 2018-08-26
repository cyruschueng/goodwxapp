<?php
/**
 * Created by PhpStorm.
 * User: code
 * Date: 1/13/2018
 * Time: 6:06 AM
 */


namespace app\api\model;


class CustomizationWeixinGroupHiddenLike extends  BaseModel
{

    public function users()
    {
        return $this->belongsTo('UserWeixins',"id");
    }

    //统计喜欢我的全部人数.
    public static function countLikeMyAll($uid,$gid){
        $count = self::where([
            "gid" => $gid,
            "toid" => $uid
        ])->count();
        return $count;
    }

    //统计配对
    public static function AllMatched($gid)
    {
        $AllMatch=0;
        $likes = self::where("gid","=",$gid)->select();
        foreach($likes as $k => $v){
            foreach($likes as $k2 => $v2){
                if( $v["uid"] == $v2["toid"] && $v["toid"] == $v2["uid"] ){
                    $AllMatch++;
                }
            }
        }

        return (int)$AllMatch/2;
    }

    public static function isMyAndSheIsLike($uid,$toId,$gid){
        $MyLikeShe = self::getMyLikeWho($uid,$toId,$gid);
        if(empty($MyLikeShe)){
            //如果没有数据,添加本条数据
            self::create([
                "uid" =>  $uid,
                "gid" =>  $gid,
                "toid" =>  $toId,
                "time" =>  date('Y-m-d H:i:s',time()),
                "type" => 0
            ]);
        }
        //首先查询对方是否喜欢我.
        $SheIsLikeMy = self::getLikeMeByShe($uid,$toId,$gid);
        if(empty($SheIsLikeMy)){
            //对方并不喜欢我.
            return 1;
        }
        return 2;

    }


    public static function getMyAndSheIsLike($uid,$toId,$gid){
        $SheIsLikeMy = self::getLikeMeByShe($uid,$toId,$gid);
        $MyLikeShe = self::getMyLikeWho($uid,$toId,$gid);
        //如果双方都喜欢.
        if(!empty($SheIsLikeMy) && !empty($MyLikeShe) ){
            return 2;
        }
        //如果只有我喜欢对方
        if(!empty($MyLikeShe) ){
            return 1;
        }
        //互不喜欢
        return 0;

    }

    public static function getMyLikeWho($uid,$toId,$gid){
        $isLike = self::where([
            "uid" => $uid,
            "gid" => $gid,
            "toid" => $toId
        ])->find();
        if(empty($isLike)){
            return 0;
        }
        return 1;
    }

    public static function getLikeMeByShe($uid,$toId,$gid){
        //对方是否喜欢自己
        $SheLikeMy = self::where([
            "uid" => $toId,
            "gid" => $gid,
            "toid" => $uid
        ])->find();

        if(empty($SheLikeMy)){
            return 0;
        }
        return 1;
    }
}