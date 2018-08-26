<?php

class Api_App extends PhalApi_Api {

    private $appDomain;

    public function __construct() {
        $this->appDomain = new Domain_App();
    }

    public function getRules() {
        return array(
            'getNewVersion'   => array(
                'channel' => array('name' => 'channel', 'type' => 'string', 'require' => true, 'desc' => '渠道'),
            ),
            'getVerifyCode'   => array(
                'channel'   => array('name' => 'channel', 'type' => 'string', 'require' => true, 'desc' => '渠道ID'),
                'code_type' => array('name' => 'code_type', 'type' => 'int', 'require' => true, 'desc' => '验证码类型，1手机注册，2找回密码'),
                'phone'     => array('name' => 'phone', 'type' => 'string', 'require' => true, 'regex' => '#^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[0,6,7,8]{1}\d{8}$|^18[\d]{9}$#', 'desc' => '手机号码'),
            ),
            'doVerifyCode'    => array(
                'channel'     => array('name' => 'channel', 'type' => 'string', 'require' => true, 'desc' => '渠道ID'),
                'code_type'   => array('name' => 'code_type', 'type' => 'int', 'require' => true, 'desc' => '验证码类型'),
                'phone'       => array('name' => 'phone', 'type' => 'string', 'require' => true, 'regex' => '#^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[0,6,7,8]{1}\d{8}$|^18[\d]{9}$#', 'desc' => '手机号码'),
                'verify_code' => array('name' => 'verify_code', 'type' => 'string', 'min' => 4, 'max' => 6, 'require' => true, 'desc' => '验证码'),
            ),
            'changeAvatar'    => array(
                'filter' => array('name' => 'filter', 'type' => 'string', 'require' => false, 'desc' => 'filter签名，签名为文件名'),
                'dir'    => array('name' => 'dir', 'type' => 'string', 'require' => false, 'desc' => '保存路径，请传avatar'),
            ),
            'getShareInfo'    => array(
                'channel'    => array('name' => 'channel', 'type' => 'string', 'require' => true, 'desc' => '渠道ID'),
                'live_id'    => array('name' => 'live_id', 'type' => 'int', 'require' => false, 'desc' => '直播ID'),
                'user_id'    => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户ID'),
                'share_type' => array('name' => 'share_type', 'type' => 'int', 'require' => true, 'desc' => '分享类型1:微信 2:微信朋友圈 3:新浪微博 4:QQ 5:QQ空间'),
                'from'       => array('name' => 'from', 'type' => 'int', 'require' => false, 'default'=> 1,
                                      'desc' => '从哪里进行的分享 1：直播间  2：娱乐场  3：PK场房间 4：房间战绩分享 5：每日送卡 6：个人战绩分享'),
                'room_id'    => array('name' => 'room_id', 'type' => 'int', 'require' => false, 'desc' => 'pk房间id'),
            ),
            'setShareResult'  => array(
                'channel'    => array('name' => 'channel', 'type' => 'string', 'require' => true, 'desc' => '渠道ID'),
                'live_id'    => array('name' => 'live_id', 'type' => 'int', 'require' => false, 'desc' => '直播ID'),
                'room_id'    => array('name' => 'room_id', 'type' => 'int', 'require' => false, 'desc' => '房间ID'),
                'user_id'    => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '用户ID'),
                'title'      => array('name' => 'title', 'type' => 'string', 'require' => true, 'desc' => '标题'),
                'img_url'    => array('name' => 'img_url', 'type' => 'string', 'require' => true, 'desc' => '图片地址'),
                'desc'       => array('name' => 'desc', 'type' => 'string', 'require' => true, 'desc' => '内容'),
                'link'       => array('name' => 'link', 'type' => 'string', 'require' => true, 'desc' => '点击链接'),
                'share_type' => array('name' => 'share_type', 'type' => 'int', 'require' => true, 'desc' => '分享类型'),
                'is_in_room' => array('name' => 'is_in_room', 'type' => 'int', 'require' => false, 'desc' => '是否在直播室，0为否，1为是'),
                'from'       => array('name' => 'from', 'type' => 'int', 'require' => false, 'default'=> 1,
                                      'desc' => '从哪里进行的分享 1：直播间  2：娱乐场  3：PK场房间 4：房间战绩分享 5：每日送卡 6：个人战绩分享'),
            ),
            'report'          => array(
                'user_id'    => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '举报人id'),
                'to_user_id' => array('name' => 'to_user_id', 'type' => 'int', 'require' => true, 'desc' => '被举报人id'),
                'type'       => array('name' => 'type', 'type' => 'int', 'require' => true,
                                      'desc' => '举报类型,1广告欺诈，2淫秽色情，3骚扰谩骂，4反动政治，5其他内容'),
                'content'    => array('name' => 'content', 'type' => 'string', 'format' => 'utf8', 'max' => 33, 'desc' => '举报内容'),
            ),
            'getFeedbackType' => array(),
            'sendFeedback'    => array(
                'user_id' => array('name' => 'user_id', 'type' => 'int', 'require' => true, 'desc' => '反馈人id'),
                'type'    => array('name' => 'type', 'type' => 'int', 'require' => true, 'default' => 0,
                                   'desc' => '反馈类型,从后台取得,多个用英文逗号隔开'),
                'content' => array('name' => 'content', 'type' => 'string', 'format' => 'utf8', 'min' => 0, 'max' => 200, 'desc' => '内容'),
            ),
            'contactUs'       => array(),
            'getAppConfig'    => array(
                'channel'      => array('name' => 'channel', 'type' => 'string', 'require' => true, 'desc' => '渠道ID'),
                'version_name' => array('name' => 'version_name', 'type' => 'string', 'require' => true, 'desc' => 'version_name'),
                'version_code' => array('name' => 'version_code', 'type' => 'string', 'require' => true, 'desc' => 'version_code'),
                'device'       => array('name' => 'device', 'type' => 'string', 'require' => true, 'desc' => 'device'),
                'imei'         => array('name' => 'imei', 'type' => 'string', 'require' => true, 'desc' => 'imei'),
                'os'           => array('name' => 'os', 'type' => 'string', 'require' => true, 'desc' => 'Android/iOS'),
            ),
        );
    }

    /**
     * 获取最新版本
     * @desc 获取最新版本
     * @request http://t.com/video/Public/mibo/index.php?service=App.GetNewVersion&channel=bt
     */
    public function getNewVersion() {
        $new_version = $this->appDomain->getNewVersion();
        return $new_version;
    }

    /**
     * 获取验证码
     * @desc 根据验证码类型获取验证码
     * @request http://mibo.yahalei.com/mibo/index.php?service=App.getVerifycode&channel=bt&phone=13510129004&code_type=1
     */
    public function getVerifyCode() {

        if ($this->code_type == 1) {
            $user_model = new Model_User();
            $user_info = $user_model->getUserInfoByPhone($this->phone);
            if (!empty($user_info)) {
                throw new PhalApi_Exception("此号码已被注册，您可以通过忘记密码重置密码", 413);
            }
        }

        if ($this->code_type == 2) {
            $user_model = new Model_User();
            $user_info = $user_model->getUserInfoByPhone($this->phone);
            if (empty($user_info)) {
                throw new PhalApi_Exception("此号码未注册!", 413);
            }
        }

        $sms = new SMSCL_Lite($this->phone, PROJECT_NAME);
        $verify_code = $sms->send();
        if (empty($verify_code)) {
            throw new PhalApi_Exception_BadRequest('请求验证码失败', 30);
        }

        $key = $this->phone . $this->code_type;
        DI()->redis->set_time($key, $verify_code);
        $code_data = array(
            'phone'       => $this->phone,
            'code_type'   => $this->code_type,
            'verify_code' => $verify_code,
        );

        $verify_model = new Model_VerifyCode();
        $verify_model->addVerifyCode($code_data);

        unset($code_data['verify_code']);

        return $code_data;
    }

    /**
     * 校验码校验
     * @desc 校验码校验
     */
    public function doVerifyCode() {
        $key = $this->phone . $this->code_type;
        $verify_code = DI()->redis->get_time($key);

        if (empty($verify_code)) {
            throw new PhalApi_Exception_BadRequest('验证码已过有效期', 31);
        }

        if ($verify_code == $this->verify_code) {
            DI()->redis->del($key);
            $verify_model = new Model_VerifyCode();
            return $verify_model->setVerifyCodeChecked($this->phone, $this->code_type);
        }

        throw new PhalApi_Exception_BadRequest('验证码错误', 32);
    }

    /**
     * 头像上传接口
     * @desc 必须post方式提交
     * @request http://mibores.yahalei.com/upload.php
     * @return 返回data-> width,height,size,file_url,desc,重点获取file_url
     */
    public function changeAvatar() {
        $url = "http://mibores.yahalei.com/testIndex.html";
        header("location:" . $url);
        exit;
    }

    /**
     * 获取分享地址
     * @request http://mibo.yahalei.com/mibo/index.php?service=App.getShareInfo&channel=bt&user_id=15&live_id=1&share_type=1
     */
    public function getShareInfo() {
        return $this->appDomain->getShareInfo();
    }

    /**
     * 分享结果统计地址
     * @desc 分享一条直播，加10点经验。要是在直播间分享，还要给所有成员发消息
     * @request http://mibo.yahalei.com/mibo/index.php?service=App.setShareResult&channel=bt&live_id=1&user_id=14&title=hello&desc=thisiscontent&img_url=http://www.baidu.com&share_type=1&link=http://mibo.yahalei.com&is_in_room=1
     */
    public function setShareResult() {
        return $this->appDomain->setShareResult();
    }

    /**
     * 举报接口
     * @desc 举报接口
     * @request http://mibo.yahalei.com/mibo/index.php?service=App.report&user_id=14&to_user_id=15&type=1
     */
    public function report() {
        $domain_app = new Domain_App();
        return $domain_app->report();
    }

    /**
     * 取得快速反馈类型列表
     * @desc 取得快速反馈类型列表
     * @request http://t.com/mibotest.yahalei.com/public/mibo/index.php?service=App.GetFeedbackType
     */
    public function getFeedbackType() {
        return $this->appDomain->getFeedbackType();
    }


    /**
     * 意见反馈接口
     * @desc 意见反馈接口
     */
    public function sendFeedback() {
        return $this->appDomain->sendFeedback();
    }

    /**
     * 联系我们接口
     * @desc 联系我们接口
     * @request http://t.com/video/Public/mibo/index.php?service=App.ContactUs
     */
    public function contactUs() {
        return $this->appDomain->contactUs();
    }

    /**
     * 帮助中心
     * @desc 帮助中心
     * @return string
     * @request http://mibo.yahalei.com/mibo/index.php?service=App.Help
     */
    public function help() {
        return 'http://os.mibolive.com/index.php?g=Web&m=help&a=index';
    }

    /**
     * 加载资源图标
     * @desc 加载资源图标
     */
    public function getLoadindIcon() {
        return $this->appDomain->getLoadingIcon();
    }

    /**
     * 获取app配置
     * @desc 获取app配置，如支付方式1微信、2支付宝、3apple pay，这个接口在app启动时调用，同时会记录开启app的记录
     * @request http://t.com/mibotest.yahalei.com/public/mibo/index.php?service=App.GetAppConfig&channel=bt&version_name=2&version_code=20&device=oppo&imei=asdfad&os=Android
     */
    public function getAppConfig() {
        return $this->appDomain->getAppConfig();
    }

}