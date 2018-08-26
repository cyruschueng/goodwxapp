<?php
/**
 * Created by TalentBigData -> ddweb.com.cn @血狼.
 * User: XYC
 * Date: 2017/12/28
 * Time: 18:00
 */

namespace app\api\model;

class ClientsWeixin extends BaseModel
{
    public function getWX($u_id){
        $WeChat = $this->where(["u_id"=>$u_id])->find();
        return $WeChat;
    }
}