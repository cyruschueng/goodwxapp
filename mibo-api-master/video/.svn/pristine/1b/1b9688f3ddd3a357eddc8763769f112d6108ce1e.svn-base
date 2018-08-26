<?php

/**
 * 默认接口服务类
 *
 * @author: Dallon <chanzonghuang@gmail.com> 2014-10-04
 */
class Api_Game extends PhalApi_Api {

    private $gameDomain;

    public function getRules() {
        return array(
            'gameButton'     => array(
                'gid'       => array('name' => 'gid', 'type' => 'int', 'require' => true, 'desc' => '游戏ID,1拼三张，2斗牛'),
                'live_id'   => array('name' => 'live_id', 'type' => 'int', 'require' => true, 'desc' => '直播间ID'),
                'status'   => array('name' => 'status', 'type' => 'int', 'require' => true, 'desc' => '1开启，0关闭'),
            ),
            'reqCard'     => array(
                'channel'   => array('name' => 'channel', 'type' => 'string', 'require' => true, 'desc' => '渠道ID'),
                'gid'       => array('name' => 'gid', 'type' => 'int', 'require' => true, 'desc' => '游戏ID'),
                'live_id'   => array('name' => 'live_id', 'type' => 'int', 'require' => true, 'desc' => '直播间ID'),
                'user_id'   => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '主播用户ID'),
                'dealer_id' => array('name' => 'dealer_id', 'type' => 'int', 'require' => true, 'desc' => '庄家用户ID'),
            ),
            'setResult'   => array(
                'channel'   => array('name' => 'channel', 'type' => 'string', 'require' => true, 'desc' => '渠道ID'),
                'gid'       => array('name' => 'gid', 'type' => 'int', 'require' => true, 'desc' => '游戏ID'),
                'live_id'   => array('name' => 'live_id', 'type' => 'int', 'require' => true, 'desc' => '直播间ID'),
                'user_id'   => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '直播用户ID'),
                'loop_id'   => array('name' => 'loop_id', 'type' => 'int', 'require' => true, 'desc' => '游戏局数ID'),
                'bet_pool1' => array('name' => 'bet_pool1', 'type' => 'int', 'require' => true, 'default' => 0,
                                     'desc' => '池1下注数量, 如果是庄家，请传该池的总数量 '),
                'bet_pool2' => array('name' => 'bet_pool2', 'type' => 'int', 'require' => true, 'default' => 0,
                                     'desc' => '池2下注数量, 如果是庄家，请传该池的总数量 '),
                'bet_pool3' => array('name' => 'bet_pool3', 'type' => 'int', 'require' => true, 'default' => 0,
                                     'desc' => '池3下注数量, 如果是庄家，请传该池的总数量 '),
            ),
            'setDealerResult'   => array(
                'gid'       => array('name' => 'gid', 'type' => 'int', 'require' => true, 'desc' => '游戏ID'),
                'live_id'   => array('name' => 'live_id', 'type' => 'int', 'require' => true, 'desc' => '直播间ID'),
                'loop_id'   => array('name' => 'loop_id', 'type' => 'int', 'require' => true, 'desc' => '游戏局数ID'),
                'chatroom_id'   => array('name' => 'chatroom_id', 'type' => 'string', 'require' => true, 'desc' => 'im聊天室id'),
            ),
            'getLiveRank' => array(
                'channel' => array('name' => 'channel', 'type' => 'string', 'require' => true, 'desc' => '渠道ID'),
                'gid'     => array('name' => 'gid', 'type' => 'int', 'require' => true, 'desc' => '游戏ID'),
                'live_id' => array('name' => 'live_id', 'type' => 'int', 'require' => true, 'desc' => '直播间ID'),
            ),
            'changeDealer' => array(
                'live_id'     => array('name' => 'live_id', 'type' => 'int', 'require' => true, 'desc' => '直播间ID'),
                'loop_id'     => array('name' => 'loop_id', 'type' => 'int', 'require' => true, 'desc' => '新庄家上任的局数id'),
                'user_id'     => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '申请庄家用户id'),
            ),
        );
    }

    public function __call($method, $arguments) {
        if (method_exists($this, $method)) {
            return call_user_func_array(array(&$this, $method), $arguments);
        }
    }

    public function __construct() {
        $this->gameDomain = new Domain_Game();
    }

    /**
     * 获取游戏列表
     * @desc 前期游戏有限，暂时由前端控制，不请求服务器
     */
    public function getGames() {

    }

    /**
     * 开启游戏、关闭游戏通知服务器
     * @desc 开启游戏、关闭游戏通知服务器
     * @request http://t.com/mibotest.yahalei.com/public/mibo/index.php?service=Game.GameButton&gid=1&live_id=7&status=1
     */
    public function gameButton() {
        $domain_game = new Domain_Game();
        return $domain_game->gameStatus();
    }

    /**
     * 请求发牌 如，拼三张
     * @desc 用于直播间主播请求牌值
     * @request http://mibo.yahalei.com/mibo/index.php?service=Game.ReqCard&channel=bt&gid=1&live_id=7&user_id=1&dealer_id=14;
     */
    public function reqCard() {
        return $this->gameDomain->reqCard();
    }

    /**
     * 返回结果：如,拼三张
     * @desc 用于直播间用户通过玩游戏获取输赢结果反馈给服务器进行记录
     * @request http://t.com/mibotest.yahalei.com/public/mibo/index.php?service=Game.SetResult&channel=bt&gid=2&live_id=789&user_id=14&loop_id=499768&bet_pool1=100&bet_pool2=2000
     */
    public function setResult() {
        return $this->gameDomain->setResult();
    }

    /**
     * 庄家结算
     * @desc 庄家结算，公布本局大赢家，向前端发送庄家最新金币消息
     */
    public function setDealerResult() {
        return $this->gameDomain->setDealerResult();
    }

    /**
     * 获取游戏中的榜单
     * @desc 开心榜-赢主播的榜单  伤心榜-输给主播的榜单
     *
     */
    public function getLiveRank() {
        $rank =  $this->gameDomain->getLiveRank();
        return $rank;
    }

    /**
     * 切换庄家
     * @desc 切换庄家,玩家申请发环信给主播，主播选择新庄家，并把新的庄家信息发到服务器
     * @request http://mibo.yahalei.com/mibo/index.php?service=Game.ChangeDealer&live_id=27&user_id=7&nick_name=%27sss%27&loop_id=2331&dealer_coin=10000000
     */
    public function changeDealer() {
        $domain_game = new Domain_Game();
        $rs = $domain_game->changeDealer();
        return $rs;
    }

}
