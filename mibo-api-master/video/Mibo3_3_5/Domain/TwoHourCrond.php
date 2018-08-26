<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/8/16
 * Time: 18:35
 */
class Domain_TwoHourCrond {

    private $req;

    public function __construct() {
        $this->req = DI()->request->getAll();
    }

   public function guideFinishOrder() {
       $two_hour_ago = date('Y-m-d H:i', strtotime('-2 hour'));
       $no_finish_list = DI()->notorm->recharge_log->select('distinct user_id')->where('create_time >= "' . $two_hour_ago . '"')
           ->where('is_notify = 0')->fetchAll();

       $user_ids = array();
       foreach($no_finish_list as $per) {
           array_push($user_ids, $per['user_id']);
       }

       $user_num = count($user_ids);

       $domain_im = new Domain_IM();
       $msg = '您最近两个小时有未完成的充值，点击可以继续完成！';
       for($i = 1; $i <= $user_num; $i += 20) {
           $user_20_ids = array_slice($user_ids, $i, 20);
           $extra = array('type' => 5, 'value' => 'whatever');
           $domain_im->sendUserMsg(1, $user_20_ids, $msg, $extra);
       }




   }

}