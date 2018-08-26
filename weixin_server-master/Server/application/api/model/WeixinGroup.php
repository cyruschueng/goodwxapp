<?php
/**
 * Created by PhpStorm.
 * User: code
 * Date: 1/13/2018
 * Time: 4:04 AM
 */

namespace app\api\model;


class WeixinGroup extends BaseModel
{


    public function usergroups()
    {
        return $this->belongsTo("UserWxgroups","gid","id");
    }


    public function selfuid()
    {
        return $this->hasMany("GroupWeixin","gid","gid");
    }




    public static function getGroups($uid)
    {

        //$groups = self::with(["usergroups.users"])
        $groups = self::with(["usergroups.users"])
            //->with(["selfuid.wxuid"])
            ->with(["selfuid"=>function($Q){
                $Q->with([
                    "wxuid" => function($Q2){
                        $Q2->limit(0,9);
                    }
                ]);
            }])
            ->where("uid","=",$uid)
            ->select();
        $groups = array_reverse($groups);
        return $groups;
    }


    public function weixinuser(){
        return $this->belongsTo("UserWeixins","uid","id");
    }
    //根据用户来查询参与喜欢的人数

    public static function getGroupsDetail($gid,$uid ){
        $detail = self::with(["weixinuser"])
            ->where("gid","=",$gid)
            ->select();
        return $detail;
    }


}