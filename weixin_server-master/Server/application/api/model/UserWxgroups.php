<?php
/**
 * Created by PhpStorm.
 * User: code
 * Date: 1/13/2018
 * Time: 3:27 AM
 */

namespace app\api\model;


class UserWxgroups extends  BaseModel
{
    public function users(){
        return $this->hasMany("CustomizationWeixinGroupHiddenLike","gid","id");
    }
}