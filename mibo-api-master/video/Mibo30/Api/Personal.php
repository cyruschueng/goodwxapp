<?php

class Api_Personal extends PhalApi_Api
{

    public function __construct()
    {
    }


    public function getRules()
    {
        return array(
            'homePage'      => array(
                'channel'      => array('name' => 'channel', 'type' => 'string', 'require' => true, 'desc' => '渠道ID'),
                'user_id'      => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户ID'),
                'self_user_id' => array('name' => 'self_user_id', 'type' => 'int', 'require' => true, 'desc' => '自身用户ID，黑名单用到'),
            ),
            'identifyName'      => array(
                'user_id'      => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户ID'),
                'name'         => array('name' => 'name', 'type' => 'string', 'require' => true, 'desc' => '姓名'),
                'phone'         => array('name' => 'phone', 'type' => 'string', 'require' => true, 'desc' => '电话'),
                'id_front_url' => array('name' => 'id_front_url', 'type' => 'string', 'require' => true, 'desc' => '身份证正面'),
            ),
            'applyAnchor'   => array(
                'channel'   => array('name' => 'channel', 'type' => 'string', 'require' => true, 'desc' => '渠道ID'),
                'user_id'   => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户ID'),
                'user_name' => array('name' => 'user_name', 'type' => 'string', 'require' => true, 'desc' => '姓名昵称'),
                'age'       => array('name' => 'age', 'type' => 'int', 'require' => true, 'desc' => '年龄'),
                'sex'       => array('name' => 'sex', 'type' => 'int', 'require' => true, 'desc' => '性别，1男2女'),
                'height'    => array('name' => 'height', 'type' => 'string', 'require' => true, 'desc' => '身高'),
                'weight'    => array('name' => 'weight', 'type' => 'string', 'require' => true, 'desc' => '姓名昵称'),
                'education' => array('name' => 'education', 'type' => 'string', 'require' => false, 'desc' => '学历'),
                'wechat'    => array('name' => 'wechat', 'type' => 'string', 'require' => true, 'desc' => '微信号'),
                'phone'     => array('name' => 'phone', 'type' => 'string', 'require' => true, 'desc' => '手机号'),
                'id_number' => array('name' => 'id_number', 'type' => 'string', 'require' => true, 'min' => 15,
                                     'desc' => '身份证号，可选是为了兼容前面版本'),
                'img_idcard_hold' => array('name' => 'img_idcard_hold', 'type' => 'string', 'require' => false,
                                           'desc' => '手持身份证'),
                'img_idcard_front' => array('name' => 'img_idcard_front', 'type' => 'string', 'require' => false,
                                            'desc' => '身份证正面'),
                'img_idcard_backside' => array('name' => 'img_idcard_backside', 'type' => 'string', 'require' => false,
                                               'desc' => '身份证背面'),
                'img_idcard_live' => array('name' => 'img_idcard_live', 'type' => 'string', 'require' => false,
                                           'desc' => '生活照'),
            ),
            'getFansList'   => array(
                'channel'      => array('name' => 'channel', 'type' => 'string', 'require' => true, 'desc' => '渠道ID'),
                'user_id'      => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户ID'),
                'self_user_id' => array('name' => 'self_user_id', 'type' => 'int', 'require' => true, 'desc' => '当前登录的用户id'),
                'page_no'      => array('name' => 'page_no', 'type' => 'int', 'require' => false, 'desc' => '页码'),
                'page_size'    => array('name' => 'page_size', 'type' => 'int', 'require' => false, 'default' => 50, 'desc' => '每页数量'),
            ),
            'getFollowList' => array(
                'channel'      => array('name' => 'channel', 'type' => 'string', 'require' => true, 'desc' => '渠道ID'),
                'user_id'      => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户ID'),
                'self_user_id' => array('name' => 'self_user_id', 'type' => 'int', 'require' => true, 'desc' => '当前登录的用户id'),
                'page_no'      => array('name' => 'page_no', 'type' => 'int', 'require' => false, 'desc' => '页码'),
                'page_size'    => array('name' => 'page_size', 'type' => 'int', 'require' => false, 'default' => 50, 'desc' => '每页数量'),
            ),
            'getBlackList'  => array(
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
                'page_no'      => array('name' => 'page_no', 'type' => 'int', 'require' => false, 'desc' => '页码'),
                'page_size'    => array('name' => 'page_size', 'type' => 'int', 'require' => false, 'default' => 50, 'desc' => '每页数量'),
            ),
            'toggleBlock'   => array(
                'channel'    => array('name' => 'channel', 'type' => 'string', 'require' => true, 'desc' => '渠道ID'),
                'user_id'    => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => 'Ta用户ID'),
                'to_user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '被拉黑用户ID'),
                'act'        => array('name' => 'act', 'type' => 'string', 'require' => true, 'desc' => '拉黑与删除黑名单操作 add/del'),
            ),
            'toggleFollow'  => array(
                'channel'    => array('name' => 'channel', 'type' => 'string', 'require' => true, 'desc' => '渠道ID'),
                'user_id'    => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户ID'),
                'to_user_id' => array('name' => 'to_user_id', 'type' => 'int', 'require' => true, 'desc' => '被关注用户ID'),
                'act'        => array('name' => 'act', 'type' => 'string', 'require' => true, 'desc' => '关注与取消操作 add/del'),
                'is_in_room' => array('name' => 'is_in_room', 'type' => 'int', 'require' => false, 'desc' => '是否在直播间，用于关注后发消息，1/0'),
                'live_id'    => array('name' => 'live_id', 'type' => 'int', 'require' => false, 'desc' => '如果在直播间，用于关注后发消息'),
                'position'    => array('name' => 'position', 'type' => 'string', 'require' => false,
                                       'desc' => '关注的位置，如金币排行榜的接口名字Home.GetCoinRank，魅力榜Home.WhoReceiveMost'),
            ),
            'isMyFollow'    => array(
                'user_id'    => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户ID'),
                'to_user_id' => array('name' => 'to_user_id', 'type' => 'int', 'require' => true, 'desc' => '被关注用户ID'),
            ),
            'myFeedback'     => array(
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
                'page_no'      => array('name' => 'page_no', 'type' => 'int', 'require' => false, 'default' => 1, 'desc' => '页码'),
                'page_size'    => array('name' => 'page_size', 'type' => 'int', 'require' => false, 'default' => 20, 'desc' => '每页数量'),
            ),
            'guardList'     => array(
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户id'),
            ),
        );
    }

    /**
     * 个人主页
     * @desc 获取个人主页信息
     * @request http://mibo.yahalei.com/mibo/index.php?service=Personal.homePage&channel=bt&user_id=14&self_user_id=14
     */
    public function homePage()
    {
        $personal = new Domain_Personal();
        $rs = $personal->getHomePageInfo();
        if (empty($rs)) {
            throw new PhalApi_Exception_BadRequest('获取用户信息失败', 60);
        }
        return $rs;
    }

    /**
     * 实名认证
     * @desc 实名认证
     * @request http://t.com/mibotest.yahalei.com/public/mibo/index.php?service=Personal.IdentifyName&user_id=1&name=22&id_front_url=33
     */
    public function identifyName() {
        $domain = new Domain_Personal();
        return $domain->identifyName();
    }

    /**
     * 用户粉丝信息
     * @request http://mibo.yahalei.com/mibo/index.php?service=Personal.getFansList&channel=bt&user_id=14&self_user_id=15
     */
    public function getFansList()
    {
        $personal = new Domain_Personal();
        return $personal->getFansList();
    }

    /**
     * 用户关注信息
     * @request http://mibo.yahalei.com/mibo/index.php?service=Personal.getFollowList&channel=bt&user_id=14&self_user_id=15
     */
    public function getFollowList()
    {
        $personal = new Domain_Personal();
        return $personal->getFollowList();
    }

    /**
     * 申请主播
     * @desc 填写 姓名昵称，年龄，身高，体重，学历，性别，微信号，电话，身份证号
     * @request http://t.com/video/Public/mibo/index.php?service=Personal.ApplyAnchor
     * &channel=bt&user_id=14&user_name=xx&age=16&&sex=1&height=160&weight=180
     * &wechat=xx&phone=18316227457&id_number=441625199205304152
     * &img_idcard_hold=2222&img_idcard_front=xx&img_idcard_backside=ss&img_idcard_live=ooo
     */
    public function applyAnchor()
    {
        $personal = new Domain_Personal();
        $rs = $personal->applyAnchorSubmit();
        if (empty($rs)) {
            throw new PhalApi_Exception_BadRequest('提交失败', 61);
        }
        return $rs;
    }

    /**
     * 获取黑名单
     * @desc 获取黑名单
     * @request http://mibo.yahalei.com/mibo/index.php?service=Personal.GetBlackList&user_id=34
     */
    public function getBlackList()
    {
        $domain_personal = new Domain_Personal();
        $black_list = $domain_personal->getBlackList();
        return $black_list;
    }

    /**
     * 拉黑与删除黑名单
     * @desc 拉黑与取消
     * @request http://mibo.yahalei.com/mibo/index.php?service=Personal.toggleBlock&channel=bt&user_id=14&to_user_id=15&act=add
     */
    public function toggleBlock()
    {
        $personal = new Domain_Personal();
        $rs = $personal->toggleBlock();
        if (!$rs) {
            throw new PhalApi_Exception_BadRequest('请勿重复操作', 62);
        }
        return array('act' => $this->act, 'status' => 'success');
    }

    /**
     * 关注与取消关注
     * @desc 关注与取消关注
     * @request http://mibo.yahalei.com/mibo/index.php?service=Personal.toggleFollow&channel=bt&user_id=14&to_user_id=15&act=add
     */
    public function toggleFollow() {
        $domain_personal = new Domain_Personal();
        $domain_personal->toggleFollow();

        return array('act' => $this->act, 'status' => 'success');
    }

    /**
     * 判断是否被我关注
     * @desc 判断是否被我关注
     */
    public function isMyFollow()
    {
        $domain_personal = new Domain_Personal();
        $rs = $domain_personal->isMyFollow();
        return $rs;
    }

    /**
     * 我的反馈
     * @desc 我的反馈,audit_status 0未审核，1采纳，2未采纳
     * @request http://t.com/mibotest.yahalei.com/public/mibo/index.php?service=Personal.MyFeedback&user_id=3385
     */
    public function myFeedback()
    {
        $domain_feedback = new Domain_Feedback();
        return $domain_feedback->myFeedback();
    }

    /**
     * 个人日、周守护榜
     * @desc 个人日、周守护榜
     * @request http://mibo.yahalei.com/mibo/index.php?service=Personal.GuardList&user_id=14&type=day
     */
    public function guardList()
    {
        $domain_personal = new Domain_Personal();
        return $domain_personal->guardList();
    }

}
