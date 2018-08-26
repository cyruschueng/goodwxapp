<?php
class Domain_Expense extends Domain_Common {
    public function __construct() {
        parent::__construct();
    }

    //充值记录
    public function rechargeLog() {
        $data = array();
        if($this->req['mold'] == 1) {
            $data = $this->getRechargeLog();
        }

        if($this->req['mold'] == 2) {
            $data = $this->getExpenseLog();
        }
        return $data;

    }

    public function getRechargeLog() {
        //一、页码等
        $page_no = isset($this->req['page_no']) ? $this->req['page_no'] : 1;
        $page_size = isset($this->req['page_size']) ? $this->req['page_size'] : 20;
        $offset = ($page_no - 1) * $page_size;
        $limit = $page_size;

        $vip_level = DI()->notorm->user->where('id', $this->req['user_id'])->fetchOne('vip_level');

        //二、取得所有已经收到通知的充值记录、还有2天内拉起订单未支付的记录
        $two_days_ago = date('Y-m-d', strtotime('-2 day'));
        $logs = DI()->notorm->recharge_log->where('user_id = ?', $this->req['user_id'])
            ->and('(is_notify = 0 and operation_id = 1 and create_time >= "'.$two_days_ago.'") or is_notify = 1')
            ->order('id DESC')->limit($offset, $limit)->fetchAll();
        $model_recharge_item = new Model_RechargeItem();
        $model_gift_package = new Model_GiftPackage();
        $return_data = array();

        //三、处理返回的数据，主要是订单信息、订单关联的礼包或充值具体到账的钻石、米币、赠送数量
        if(!empty($logs)) {
            foreach($logs as $log_id => $log) {
                $return_data[$log_id]['user_id'] = $log['user_id'];
                $return_data[$log_id]['money'] = $log['money'];
                $return_data[$log_id]['operation_id'] = $log['operation_id'];
                $return_data[$log_id]['operation_value'] = $log['operation_value'];
                $return_data[$log_id]['order_no'] = $log['order_no'];
                $return_data[$log_id]['money'] = $log['money'];
                $return_data[$log_id]['is_notify'] = $log['is_notify'];
                if($log['operation_id'] == 1) {
                    $item = $model_recharge_item->getItemById($log['operation_value']);
                    //$return_data[$log_id]['type'] = 1;
                    if($item['type'] == 1) {
                        $return_data[$log_id]['log'] = '充值' . $item['coin_num'] . '米币';
                    } else {
                        $return_data[$log_id]['log'] = '充值' . $item['diamond_num'] . '米钻';
                    }
                    $return_data[$log_id]['create_time'] = $log['create_time'];
                    $return_data[$log_id]['type'] = $item['type'];
                    $return_data[$log_id]['diamond_num'] = $item['diamond_num'];
                    $return_data[$log_id]['coin_num'] = $item['coin_num'];
                    $return_data[$log_id]['extra_num'] = $vip_level > 0 ? $item['extra_num'] * 1.5 : $item['extra_num'];
                }
                if($log['operation_id'] == 2) {
                    $package = $model_gift_package->getPackageBySortId($log['operation_value']);
                    $return_data[$log_id]['type'] = 2;
                    $return_data[$log_id]['log'] = $package['name'];
                    $return_data[$log_id]['create_time'] = $log['create_time'];
                    $return_data[$log_id]['diamond_num'] = $package['diamond_num'];
                    $return_data[$log_id]['coin_num'] = $package['coin_num'];
                    $return_data[$log_id]['extra_num'] = $package['extra_send_coin'];
                }
            }
        }

        return $return_data;
    }

    public function getExpenseLog() {
        $page_no = isset($this->req['page_no']) ? $this->req['page_no'] : 1;
        $page_size = isset($this->req['page_size']) ? $this->req['page_size'] : 20;
        $offset = ($page_no - 1) * $page_size;
        $limit = $page_size;
        $logs = DI()->notorm->user_deal_log->where('user_id = ?', $this->req['user_id'])
               ->order('id DESC')->limit($offset, $limit)->fetchAll();
        $return_data = array();
        if(!empty($logs)) {
            foreach($logs as $key => $value) {
                if($value['mid'] == MOUDEL_LIVE_TICKET) {
                    $return_data[$key]['log'] = '购买门票' . $value['deal_num'] . '米钻';
                }
                if($value['mid'] == MOUDEL_LIVE_BARRAGE) {
                    $return_data[$key]['log'] = '发送弹幕' . $value['deal_num'] . '米钻';
                }
                if($value['mid'] == MOUDEL_LIVE_GIFT) {
                    $return_data[$key]['log'] = '直播间送礼物' . $value['deal_num'] . ($value['deal_type'] == 1?'米钻':"米币");
                }
                if($value['mid'] == MOUDEL_MESSAGE_GIFT) {
                    $return_data[$key]['log'] = '私信送礼物' . $value['deal_num'] . '米钻';
                }
                if($value['mid'] == MOUDEL_USER_DIAMOND_EXCHANGE_COIN) {
                    $return_data[$key]['log'] = '钻石兑换米币' . $value['deal_num'] . '米钻';
                }
                $return_data[$key]['create_time'] = $value['create_time'];
            }
        }

        return $return_data;
    }




}