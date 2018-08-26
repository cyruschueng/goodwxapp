<?php
/**
 * Created by PhpStorm.
 * User: code
 * Date: 1/13/2018
 * Time: 7:53 AM
 */

namespace app\api\model;


class GroupWeixin extends BaseModel
{
    public function wxuid(){
        return $this->belongsTo("UserWeixins","uid","id");
    }
}