<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/8/16
 * Time: 18:35
 */
class Domain_App {

    private $req;
    private $channelModel;

    public function __construct() {
        $this->req = DI()->request->getAll();
        $this->channelModel = new Model_Channel();
    }

    public function getNewVersion() {
        $model_version = new Model_Version();
        return $model_version->getNewVersion($this->req['channel']);
    }

    public function getChannelInfo() {
        $channels = $this->channelModel->getChannelInfoByChannel($this->req['channel']);
        if (empty($channels)) {
            return false;
        }

        return $channels;
    }

    public function getShareInfo() {

        $share_info = NULL;
        //$logo_url = "https://mmbiz.qlogo.cn/mmbiz_png/5A0v82JgqJZdrMYqNe9C1yDBtE8Gt1f4XSpDh1c8ic0tBEZBicEzWgLndLtATZMo0icWYibNdwShicfNJ9zG9Eiak6BQ/0?wx_fmt=png";

        $from = isset($this->req['from']) ? $this->req['from'] : 1;
        $domain_share = new Domain_Share();

        switch($from) {
            case 2://娱乐场
                $share_info = $domain_share->shareNoAnchorLive();
                break;
            case 3://PK场
                $share_info = $domain_share->sharePkRoom();
                break;
            case 4://PK场战绩分享
                $share_info = $domain_share->shareRoomResult();
                break;
            case 5://每日送卡
                $share_info = $domain_share->shareThenSendCard();
                break;
            case 6://分享我的战绩
                $share_info = $domain_share->shareMyPkResult();
                break;
            case 7://直播预告
                $share_info = $domain_share->sharePreview();
                break;
            default://直播间
                $share_info = $domain_share->shareLive();
        }

        return $share_info;
    }

    public function setShareResult() {

        $from = isset($this->req['from']) ? $this->req['from'] : 1;
        $domain_share = new Domain_Share();

        switch($from) {
            case 2:
                $data = $domain_share->shareNoAnchorLiveRes();
                break;
            case 3:
                $data = $domain_share->sharePkRoomRes();
                break;
            case 4:
                $data = $domain_share->sharePkRoomRes();
                break;
            case 5:
                $data = $domain_share->sendRoomCard();
                break;
            case 6:
                $data = $domain_share->sharePkRoomRes();
                break;
            case 7:
                $data = $domain_share->shareLiveRes();
                break;
            default:
                $data = $domain_share->shareLiveRes();
        }

        return $data;
    }

    public function report() {
        $data = array(
            'user_id'    => $this->req['user_id'],
            'to_user_id' => $this->req['to_user_id'],
            'type'       => $this->req['type'],
            'content'    => isset($this->req['content']) ? $this->req['content'] : '',
        );
        DI()->notorm->report->insert($data);
        $id = DI()->notorm->report->insert_id();

        if ($id) {
            return true;
        } else {
            return false;
        }

    }

    public function getFeedbackType() {
        $model_feedback_type = new Model_FeedbackType();
        $list = $model_feedback_type->getList();
        return $list;
    }

    public function sendFeedback() {
        //一天只能10条
        $send_num = DI()->redis->get_time('user_id_' . $this->req['user_id'] . '_feedback_num');
        $send_num = isset($send_num) ? $send_num : 0;
        if ($send_num <= 10) {
            $send_num += 1;
            DI()->redis->set_time('user_id_' . $this->req['user_id'] . '_feedback_num', $send_num, 86400);
            $data['user_id'] = $this->req['user_id'];
            $data['type'] = $this->req['type'];
            if (!empty($data['type'])) {
                $is_right_format = preg_match('/^\d+(,\d+)*$/', $data['type']);
                if (!$is_right_format) throw new PhalApi_Exception('格式不对', 404);
            }
            $data['content'] = addslashes($this->req['content']);
            DI()->notorm->feedback->insert($data);
            $id = DI()->notorm->feedback->insert_id();
            if (!$id) {
                return false;
            }
        }

        return true;

    }

    //加载资源图标
    public function getLoadingIcon() {
        $model_loading_icon = new Model_LoadingIcon();
        $rs = $model_loading_icon->getLoadingIcon();
        return $rs;
    }

    //联系我们
    public function contactUs() {
        $rs = '<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title></title>
</head>
<body>
	<p style="margin: 20px auto;">请联系米播客服,微信号：媚芝</p>
</body>
</html>';

        return $rs;
    }

    public function getAppConfig() {
        $os = $this->req['os'] == 'Android' ? 1 : 2;
        $channel = isset($this->req['channel']) ? $this->req['channel'] : '';
        $version_code = isset($this->req['version_code']) ? (int)$this->req['version_code'] : 0;
        $data = array(
            'channel'      => $this->req['channel'],
            'version_name' => $this->req['version_name'],
            'version_code' => $this->req['version_code'],
            'device'       => $this->req['device'],
            'imei'         => $this->req['imei'],
            'os'           => $this->req['os'],
            'ip'           => PhalApi_Tool::getClientIp(),
        );
        $model_open_stats = new Model_OpenStatistic();
        //$model_open_stats->insertOpenStatistic($data);

        $app_config = array();
        $model_config = new Model_AppConfig();
        $app_config['config'] = $model_config->getAppConfig($os, $channel, $version_code);
        return $app_config;
    }

}