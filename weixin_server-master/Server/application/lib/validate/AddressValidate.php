<?php
/**
 * Created by PhpStorm.
 * User: XYC
 * Date: 1/20/2018
 * Time: 2:32 AM
 */

namespace app\lib\validate;


class AddressValidate extends BaseValidate
{
    protected $rule = [
        "name" => "require|isNotNmpty",
        "mobile" => "require|isMobile",
        "province" => "require|isNotNmpty",
        "city" => "require|isNotNmpty",
        "country" => "require|isNotNmpty",
        "detail" => "require|isNotNmpty",
        "uid" => "require|isNotNmpty"
    ];
    /*
     * id
     * name
     * mobile
     * province
     * city
     * country
     * detail
     * delete_time
     * uid
     * update_time
     * */
}