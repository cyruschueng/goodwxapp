<?php

class Api_PkGame extends PhalApi_Api {

    private $domain_pk_game ;

    public function __construct() {
        $this->domain_pk_game = new Domain_PkGame();
    }

    public function getRules() {
        return array(
            'reqCard'     => array(
                'gid'       => array('name' => 'gid', 'type' => 'int', 'require' => true, 'desc' => '游戏ID'),
                'room_id'   => array('name' => 'room_id', 'type' => 'int', 'require' => true, 'desc' => 'pk房间ID'),
                'owner_id'   => array('name' => 'owner_id', 'type' => 'int', 'require' => true, 'desc' => '房主ID'),
                'pool1_user_id' => array('name' => 'pool1_user_id', 'type' => 'int', 'require' => false, 'desc' => '池1用户ID'),
                'pool2_user_id' => array('name' => 'pool2_user_id', 'type' => 'int', 'require' => false, 'desc' => '池2用户ID'),
                'pool3_user_id' => array('name' => 'pool3_user_id', 'type' => 'int', 'require' => false, 'desc' => '池3用户ID'),
                'pool4_user_id' => array('name' => 'pool4_user_id', 'type' => 'int', 'require' => false, 'desc' => '池4用户ID'),
            ),
            'bet' => array(
                'room_id' => array('name' => 'room_id', 'type' => 'int', 'require' => true, 'desc' => '房间id'),
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '下注用户'),
                'pool_id' => array('name' => 'pool_id', 'type' => 'int', 'require' => true, 'min' => 1, 'max' => 4, 'desc' => '座位id'),
                'bet_num' => array('name' => 'bet_num', 'type' => 'int', 'min' => 1, 'require' => true, 'desc' => '下注量'),
            ),
            'setResult'   => array(
                'gid'           => array('name' => 'gid', 'type' => 'int', 'require' => true, 'desc' => '游戏ID'),
                'game_type'     => array('name' => 'game_type', 'type' => 'int', 'require' => true,
                                         'desc' => '游戏类型，1钻石，2米币'),
                'room_id'       => array('name' => 'room_id', 'type' => 'int', 'require' => true, 'desc' => '房间ID'),
                'loop_id'       => array('name' => 'loop_id', 'type' => 'int', 'require' => true, 'desc' => '游戏局数ID'),
                'dealer_id'     => array('name' => 'dealer_id', 'type' => 'int', 'require' => true,
                                         'desc' => '庄家id '),
                'pool1_user_id' => array('name' => 'pool1_user_id', 'type' => 'int', 'require' => false,
                                         'desc' => '池1用户id '),
                'pool2_user_id' => array('name' => 'pool2_user_id', 'type' => 'int', 'require' => false,
                                         'desc' => '池2用户id '),
                'pool3_user_id' => array('name' => 'pool3_user_id', 'type' => 'int', 'require' => false,
                                         'desc' => '池3用户id '),
                'pool4_user_id' => array('name' => 'pool4_user_id', 'type' => 'int', 'require' => false,
                                         'desc' => '池4用户id '),
                'pool1_num'     => array('name' => 'pool1_num', 'type' => 'int', 'require' => false,
                                         'desc' => '池1用户下注数量'),
                'pool2_num'     => array('name' => 'pool2_num', 'type' => 'int', 'require' => false,
                                         'desc' => '池2用户下注数量'),
                'pool3_num'     => array('name' => 'pool3_num', 'type' => 'int', 'require' => false,
                                         'desc' => '池3用户下注数量'),
                'pool4_num'     => array('name' => 'pool4_num', 'type' => 'int', 'require' => false,
                                         'desc' => '池4用户下注数量'),
            ),
            'getPkRecord' => array(
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
                'page_no' => array('name' => 'page_no', 'type' => 'int', 'require' => true, 'desc' => '页码'),
                'page_size' => array('name' => 'page_size', 'type' => 'int', 'require' => true, 'desc' => '每页数量'),
            ),
            'getRoomPkDetail' => array(
                'room_id' => array('name' => 'room_id', 'type' => 'int', 'require' => true, 'desc' => '房间id'),
                'page_no' => array('name' => 'page_no', 'type' => 'int', 'require' => true, 'desc' => '页码'),
                'page_size' => array('name' => 'page_size', 'type' => 'int', 'require' => true, 'desc' => '每页数量'),
            ),
        );
    }

    /**
     * pk房间请求牌
     * @desc pk房间请求牌与直播间的请求牌接口不一样
     * @request http://t.com/mibotest.yahalei.com/public/mibo/index.php?service=PkGame.ReqCard&gid=1&room_id=2&owner_id=29&pool1_user_id=29&pool2_user_id=100
     */
    public function reqCard() {
        return $this->domain_pk_game->reqCard();
    }

    /**
     * 用户下完注提交
     * @desc 用户下完注提交
     * @request http://t.com/mibotest.yahalei.com/public/mibo/index.php?service=PkGame.Bet&room_id=2&user_id=100&pool_id=1&bet_num=100
     */
    public function bet() {
        return $this->domain_pk_game->bet();
    }

    /**
     * pk房间结算
     * @desc 房主提交结算，其他人只下注就可以。pk房间结算与直播间的结算接口不一样
     * @request http://t.com/mibotest.yahalei.com/public/mibo/index.php?service=pkgame.setresult&gid=1&room_id=2&loop_id=5&dealer_id=100&pool1_user_id=100&game_type=1&pool1_num=400&pool2_num=400&pool3_num=300&pool4_num=100
     */
    public function setResult() {
        return $this->domain_pk_game->setResult();
    }

    /**
     * pk场个人下注情况
     * @desc pk场个人下注情况
     * @return null
     */
    public function getPkRecord() {
        return $this->domain_pk_game->getPkRecord();
    }

    /**
     * pk房间输赢情况
     * @desc pk房间输赢情况
     * @return array
     */
    public function getRoomPkDetail() {
        return $this->domain_pk_game->getRoomPkDetail();
    }


}
