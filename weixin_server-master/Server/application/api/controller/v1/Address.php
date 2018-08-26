<?php
/**
 * Created by PhpStorm.
 * User: XYC
 * Date: 1/20/2018
 * Time: 2:38 AM
 */

namespace app\api\controller\v1;

use app\lib\validate\AddressValidate;


class Address extends BaseController
{
    public function addAddress()
    {
        if( (new AddressValidate())->goCheck() )
        {

        }
    }

}