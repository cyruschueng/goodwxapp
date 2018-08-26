<?php
class Domain_Gift extends Domain_Common {
    public function __construct() {
        parent::__construct();
    }

    public function sendMessageGift() {
        $user_info = $this->checkUser();

        $gift_model = new Model_Gift();
        $gift_info = $gift_model->getGiftInfoById($this->req['gift_id']);
        $total_fee = $this->req['gift_num'] * $gift_info['price'];

        if ($user_info['diamond_num'] < $total_fee) {
            throw new PhalApi_Exception('余额不足,无法交易', 540);
        }

        $domain_user = new Domain_User();
        $rs = $domain_user->updateUserDiamondNumReduce($user_info['id'], $total_fee, true);
        if (!$rs) {
            DI()->logger->error("用户赠送礼物失败", $this->req);
            throw new PhalApi_Exception_BadRequest("用户赠送礼物失败", 54);
        }

        $domain_user->setSendGiftExperience($user_info['id'],
                        $this->req['to_user_id'], $this->req['gift_id'], $total_fee * 1, MOUDEL_MESSAGE_GIFT);

        $to_user_info = $domain_user->getUsersInfoById($this->req['to_user_id']);
        $rs = $domain_user->updateAnchorDiamondNumPlus($to_user_info['id'], $total_fee);
        if (!$rs) {
            DI()->logger->error("用户赠送礼物失败", $this->req);
            throw new PhalApi_Exception_BadRequest("对方收到礼物失败", 55);
        }

        $deal_log_data = array(
            'user_id'     => $user_info['id'],
            'to_user_id'  => $to_user_info['id'],
            'mid'         => MOUDEL_MESSAGE_GIFT,
            'value'       => $to_user_info['id'],
            'extra'       => $this->req['gift_id'],
            'deal_type'   => DEAL_TYPE_DIAMOND,
            'deal_num'    => $total_fee,
            'deal_before' => $user_info['diamond_num'],
            'deal_after'  => $user_info['diamond_num'] - $total_fee,
        );

        $deal_log_model = new Model_UserDealLog();
        $insert_id = $deal_log_model->insertDealLog($deal_log_data);
        if ($insert_id > 0) {
            return true;
        }

        throw new PhalApi_Exception("发送礼物失败", 449);
    }



}