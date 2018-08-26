<?php
class Domain_Vip extends Domain_Common {
    public function __construct() {
        parent::__construct();
        $today_end_second = strtotime('tomorrow');
        $this->today_remain_second = $today_end_second - time();
    }

    public function gainVipPackage() {
        $user_id = $this->req['user_id'];
        $package_id = $this->req['package_id'];

        //一、当天礼包是否已经领取
        $had_get_reward = DI()->redis->sIsMember('vip_package_user_id_'.$user_id, $package_id);
        if($had_get_reward) throw new PhalApi_Exception('已经领取过了', 460);

        $model_user = new Model_User();
        $user_info = $model_user->getUsersInfoById($user_id);

        //二、根据用户取得相应vip等级的特权数据
        $model_vip_privilege = new Model_VipPrivilege();
        $privilege_info = $model_vip_privilege->getPrivilegeByLevel($user_info['vip_level']);

        if(!isset($privilege_info['privilege'][$package_id])) throw new PhalApi_Exception('没这礼包', 461);

        //三、根据用户特权进行相应处理
        $rs = $model_user->updateUserDiamondCoin($user_id, 0, $privilege_info['privilege'][$package_id]['reward']);
        if(!$rs) throw new PhalApi_Exception('领取失败，联系管理员');

        //四、存储用户领取情况
        $redis_add_rs = DI()->redis->sAdd('vip_package_user_id_'.$user_id, $package_id, $this->today_remain_second);

        if($redis_add_rs) {
            return DI()->r_notorm->user->select('coin_num,diamond_num')->where('id', $user_id)->fetchOne();
        } else {
            return false;
        }

    }

    public function hadGetPackage() {
        $user_id = $this->req['user_id'];
        $package_id = $this->req['package_id'];

        $had_get_reward = DI()->redis->sIsMember('vip_package_user_id_'.$user_id, $package_id);
        $had_get_reward = $had_get_reward ? true : false;
        return $had_get_reward;

    }




}