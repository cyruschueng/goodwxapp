<?php
class Domain_Wealth extends Domain_Common {

    private $one_card_need_diamond_num = 3;

    public function __construct() {
        parent::__construct();
    }

   public function exchangeRoomCard() {
       $user_id = $this->req['user_id'];
       $card_num = $this->req['card_num'];
       $user_info = $this->checkUser($user_id);

       $total_diamond = $card_num * $this->one_card_need_diamond_num;
       if($total_diamond > $user_info['diamond_num']) {
           throw new PhalApi_Exception('米钻不足', 483);
       }

       $model_user = new Model_User();
       $update_diamond_res =  $model_user->updateUserDiamondNumReduce($user_id, $total_diamond, false, 0);
       if(!$update_diamond_res) throw new PhalApi_Exception('服务器出错,联系客服');

       $update_card = array('room_card' => new NotORM_Literal('room_card + ' . $card_num));
       $update_card_res = DI()->notorm->user->where('id', $user_id)->update($update_card);
       if(!$update_card_res) throw new PhalApi_Exception('门卡购买失败，钻石已付，紧急联系客服');

       return true;
   }



}