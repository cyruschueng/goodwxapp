<?php

class Model_RechargeItem extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'recharge_item';
    }

    public function getRechargeItemList() {
        $os = DI()->request->get('os') ? DI()->request->get('os') : 'Android';
        $key = "recharge_item_list";
        $list_string = DI()->redis->get_time($key);
        $list = json_decode($list_string, true);
        if(empty($list[$os])){
            $list[$os] = $this->getORM()
                ->select("id, diamond_num, extra_num, price, is_hot")
                ->where("is_show = 1 and type = 0")
                ->where('os = ?', $os)
                ->order('sort ASC')
                ->fetchAll();
            DI()->redis->set_time($key, json_encode($list), 3600);
        }

        return $list[$os];
    }

    public function getRechargeCoinItemList() {
        $os = DI()->request->get('os') ? DI()->request->get('os') : 'Android';
        $key = "recharge_coin_item_list";
        $list_string = DI()->redis->get_time($key);
        $list = json_decode($list_string, true);
        if(empty($list[$os])){
            $list[$os] = $this->getORM()
                ->select("id, coin_num, extra_num, price, is_hot")
                ->where("is_show = 1 and type = 1")
                ->where('os = ?', $os)
                ->order('sort ASC')
                ->fetchAll();
            foreach($list[$os] as &$item) {
                $item['vip_extra_num'] = $item['extra_num'] * 1.5;
            }
            DI()->redis->set_time($key, json_encode($list), 3600);
        }

        return $list[$os];
    }

    public function getItemById($id) {
        return $this->getORM()->where('id = ?', $id)->fetch();
    }




}
