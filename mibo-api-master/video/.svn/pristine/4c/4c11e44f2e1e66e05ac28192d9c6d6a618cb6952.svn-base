<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/8/16
 * Time: 18:35
 */
class Domain_Home {

    private $req;
    private $liveModel;

    public function __construct() {
        $this->req = DI()->request->getAll();
        $this->liveModel = new Model_LiveList();
    }

    private function getMoudelSet() {

        $moudels = DI()->redis->get_time("mb_moudel_set");

        if (empty($moudels)) {
            $tools = new Model_Tools();
            $moudel_list = $tools->getMoudelList();
            if (!empty($moudel_list)) {
                DI()->redis->set_time("mb_moudel_set", json_encode($moudel_list));
            }
        }
        $moudels = json_decode($moudels, true);

        return $moudels;
    }

    public function getLiveList() {

        $page_no = isset($this->req['page_no']) ? $this->req['page_no'] : 1;
        $page_size = isset($this->req['page_size']) ? $this->req['page_size'] : 20;

        $live_list = $this->liveModel->getLiveList($page_no, $page_size);
        if (empty($live_list)) {
            return false;
        }

        return $this->getLiveInfo($live_list);

    }

    public function getGameList() {

        $page_no = isset($this->req['page_no']) ? $this->req['page_no'] : 1;
        $page_size = isset($this->req['page_size']) ? $this->req['page_size'] : 20;

        $live_list = $this->liveModel->getGameList($page_no, $page_size);
        if (empty($live_list)) {
            return false;
        }

        return $this->getGameInfo($live_list);

    }

    public function getLiveInfo($live_list) {
        //一、组合live_id,user_id
        $anchor_ids = "";
        $live_ids = "";
        foreach ($live_list as $itm) {
            $anchor_ids .= $itm['anchor_id'] . ",";
            $live_ids .= $itm['id'] . ",";
        }

        $anchor_ids = rtrim($anchor_ids, ',');
        $live_ids = rtrim($live_ids, ',');

        //二、取得所有列表的主播信息
        $user_domain = new Domain_User();
        $anchor_list = $user_domain->getUsersInfoByIds($anchor_ids);
        if (empty($anchor_list)) {
            throw new PhalApi_Exception_BadRequest('内部错误-1', 111);
        }

        //三、取得用户是否买门票
        $user_deal_log_model = new Model_UserDealLog();
        $spend_list = $user_deal_log_model->getUserDealList($this->req['user_id'], MOUDEL_LIVE_TICKET, $live_ids);
        $pay_live_list = array();
        foreach ($spend_list as $itm) {
            $pay_live_list[] = $itm['value'];
        }

        //四、取得环信的在线人数
        $live_list = $this->getRoomsSeeNum($live_list);
        //$redis_im_rooms_data = DI()->redis->get_forever('im_rooms_data');
        //if(!empty($redis_im_rooms_data)) {
        //    $rooms_data = json_decode($redis_im_rooms_data, true);
        //    if(is_array($rooms_data)) {
        //        //重置数组结构，用环信id作为键，数组值不变
        //        $new_rooms_data = array_reduce($rooms_data, function (&$new_rooms_data, $v) {
        //            $new_rooms_data[$v['id']] = $v;
        //            return $new_rooms_data;
        //        });
        //    }
        //}

        $final_live_list = array();
        $model_game = new Model_Game();
        foreach ($live_list as $itm) {
            $itm['anchor_name'] = $anchor_list[$itm['anchor_id']]['nick_name'];
            $itm['anchor_sex'] = $anchor_list[$itm['anchor_id']]['sex'];
            $itm['anchor_avatar'] = $anchor_list[$itm['anchor_id']]['avatar'];
            $itm['anchor_address'] = ($anchor_list[$itm['anchor_id']]['address']
                && $anchor_list[$itm['anchor_id']]['address'] != ' ')
                ? $anchor_list[$itm['anchor_id']]['address']
                : '火星';
            if($itm['status'] == 2) {
                if($itm['type'] == 0) {
                    $itm['start_time'] = '直播中';
                } else {
                    $itm['start_time'] = '无主播场';
                }
            } else {
                $itm['start_time'] = g_dayToWeak($itm['start_time']);
            }
            $itm['create_time'] = '发布时间：' . g_tranTime(strtotime($itm['create_time']));
            $itm['location'] = ($itm['location']
                && $itm['location'] != ' ')
                ? $itm['location']
                : '火星';
            $itm['is_pay'] = in_array($itm['id'], $pay_live_list) ? true : false;
            //直播间正在玩的人数
            //$itm['playing_num'] = isset($new_rooms_data[$itm['chatroom_id']])
            //    ? $new_rooms_data[$itm['chatroom_id']]['affiliations_count']
            //    : 0;
            //购票人数等于实际购票人数加上在线机器人;
            if($itm['ticket_price'] > 0) {
                $chatroom_robot_user_list_key = "chatroom_" . $itm['id'] . "_robot_user_list_key";
                $robot_users = DI()->redis->get_forever($chatroom_robot_user_list_key);
                $robot_users_num = substr_count($robot_users, ',');
                $itm['ticket_sale'] = $itm['ticket_sale'] + $robot_users_num + 10;
            }

            //五、取得游戏id
            $live_game = $model_game->getLiveGame($itm['id']);
            $itm['gid'] = isset($live_game['gid']) ? $live_game['gid'] : 0;
            $final_live_list[] = $itm;
        }
        return $final_live_list;
    }

    public function getRoomsSeeNum($live_list) {
        $page_no = isset($this->req['page_no']) ? $this->req['page_no'] : 1;
        $page_size = isset($this->req['page_size']) ? $this->req['page_size'] : 20;

        $easemob = new Emchat_Lite();

        $see_num_list = DI()->redis->get_time('live_see_num_page_no_'.$page_no.'_page_size_'.$page_size);
        if(!empty($see_num_list)) {
            foreach($live_list as &$info) {
                $live_id = $info['id'];
                if($info['status'] == 2) {
                    if(array_key_exists($live_id, $see_num_list)) {

                        $info['playing_num'] = $see_num_list[$live_id]['affiliations_count'];

                    } else {
                        $im_info = $easemob->getChatRoomDetail($info['chatroom_id']);
                        //$see_num_list[$live_id]['affiliations_count'] = isset($im_info['data'][0]['affiliations_count']) ?
                        //    $im_info['data'][0]['affiliations_count'] : 0 ;
                        $info['playing_num'] = isset($im_info['data'][0]['affiliations_count']) ?
                            $im_info['data'][0]['affiliations_count'] : 0 ;
                    }

                } else {
                    //$see_num_list[$live_id]['affiliations_count'] = 0;
                    $info['playing_num'] = 0 ;
                }
            }

            return $live_list;
        } else {

            $see_num_list = [];

            foreach($live_list as &$info) {
                $live_id = $info['id'];
                if($info['status'] == 2) {

                    $im_info = $easemob->getChatRoomDetail($info['chatroom_id']);
                    $see_num_list[$live_id]['affiliations_count'] = isset($im_info['data'][0]['affiliations_count']) ?
                        $im_info['data'][0]['affiliations_count'] : 0 ;
                    $info['playing_num'] = isset($im_info['data'][0]['affiliations_count']) ?
                        $im_info['data'][0]['affiliations_count'] : 0 ;

                } else {
                    $see_num_list[$live_id]['affiliations_count'] = 0;
                    $info['playing_num'] = 0 ;
                }
            }

            DI()->redis->set_time('live_see_num_page_no_'.$page_no.'_page_size_'.$page_size, $see_num_list, 3);

            return $live_list;

        }

    }

    public function getGamesSeeNum($live_list) {
        $page_no = isset($this->req['page_no']) ? $this->req['page_no'] : 1;
        $page_size = isset($this->req['page_size']) ? $this->req['page_size'] : 20;

        $easemob = new Emchat_Lite();

        $see_num_list = DI()->redis->get_time('games_see_num_page_no_'.$page_no.'_page_size_'.$page_size);
        if(!empty($see_num_list)) {
            foreach($live_list as &$info) {
                $live_id = $info['id'];
                if($info['status'] == 2) {
                    if(array_key_exists($live_id, $see_num_list)) {

                        $info['playing_num'] = $see_num_list[$live_id]['affiliations_count'];

                    } else {
                        $im_info = $easemob->getChatRoomDetail($info['chatroom_id']);
                        //$see_num_list[$live_id]['affiliations_count'] = isset($im_info['data'][0]['affiliations_count']) ?
                        //    $im_info['data'][0]['affiliations_count'] : 0 ;
                        $info['playing_num'] = isset($im_info['data'][0]['affiliations_count']) ?
                            $im_info['data'][0]['affiliations_count'] : 0 ;
                    }

                } else {
                    //$see_num_list[$live_id]['affiliations_count'] = 0;
                    $info['playing_num'] = 0 ;
                }
            }

            return $live_list;
        } else {

            $see_num_list = [];

            foreach($live_list as &$info) {
                $live_id = $info['id'];
                if($info['status'] == 2) {

                    $im_info = $easemob->getChatRoomDetail($info['chatroom_id']);
                    $see_num_list[$live_id]['affiliations_count'] = isset($im_info['data'][0]['affiliations_count']) ?
                        $im_info['data'][0]['affiliations_count'] : 0 ;
                    $info['playing_num'] = isset($im_info['data'][0]['affiliations_count']) ?
                        $im_info['data'][0]['affiliations_count'] : 0 ;

                } else {
                    $see_num_list[$live_id]['affiliations_count'] = 0;
                    $info['playing_num'] = 0 ;
                }
            }

            DI()->redis->set_time('games_see_num_page_no_'.$page_no.'_page_size_'.$page_size, $see_num_list, 3);

            return $live_list;

        }
    }

    public function getGameInfo($live_list) {
        $anchor_ids = "";
        $live_ids = "";
        foreach ($live_list as $itm) {
            $anchor_ids .= $itm['anchor_id'] . ",";
            $live_ids .= $itm['id'] . ",";
        }

        $anchor_ids = rtrim($anchor_ids, ',');
        $live_ids = rtrim($live_ids, ',');

        $user_domain = new Domain_User();
        $anchor_list = $user_domain->getUsersInfoByIds($anchor_ids);
        if (empty($anchor_list)) {
            throw new PhalApi_Exception_BadRequest('内部错误-1', 111);
        }

        $user_deal_log_model = new Model_UserDealLog();

        $spend_list = $user_deal_log_model->getUserDealList($this->req['user_id'], MOUDEL_LIVE_TICKET, $live_ids);
        $pay_live_list = array();
        foreach ($spend_list as $itm) {
            $pay_live_list[] = $itm['value'];
        }

        //观看人数
        //$redis_im_rooms_data = DI()->redis->get_forever('im_rooms_data');
        //if(!empty($redis_im_rooms_data)) {
        //    $rooms_data = json_decode($redis_im_rooms_data, true);
        //    if(is_array($rooms_data)) {
        //        //重置数组结构，用环信id作为键，数组值不变
        //        $new_rooms_data = array_reduce($rooms_data, function (&$new_rooms_data, $v) {
        //            $new_rooms_data[$v['id']] = $v;
        //            return $new_rooms_data;
        //        });
        //    }
        //}

        $live_list = $this->getGamesSeeNum($live_list);

        $final_live_list = array();
        $model_game = new Model_Game();
        foreach ($live_list as $itm) {
            $itm['anchor_name'] = $anchor_list[$itm['anchor_id']]['nick_name'];
            $itm['anchor_sex'] = $anchor_list[$itm['anchor_id']]['sex'];
            $itm['anchor_avatar'] = $anchor_list[$itm['anchor_id']]['avatar'];
            $itm['anchor_address'] = ($anchor_list[$itm['anchor_id']]['address']
                && $anchor_list[$itm['anchor_id']]['address'] != ' ')
                ? $anchor_list[$itm['anchor_id']]['address']
                : '火星';
            if($itm['status'] == 2) {
                if($itm['type'] == 0) {
                    $itm['start_time'] = '直播中';
                } else {
                    $itm['start_time'] = '无主播场';
                }
            } else {
                $itm['start_time'] = g_dayToWeak($itm['start_time']);
            }
            $itm['create_time'] = '发布时间：' . g_tranTime(strtotime($itm['create_time']));
            $itm['location'] = ($itm['location']
                && $itm['location'] != ' ')
                ? $itm['location']
                : '火星';
            $itm['is_pay'] = in_array($itm['id'], $pay_live_list) ? true : false;
            //直播间正在玩的人数
            //$itm['playing_num'] = isset($new_rooms_data[$itm['chatroom_id']])
            //    ? $new_rooms_data[$itm['chatroom_id']]['affiliations_count']
            //    : 0;
            //购票人数等于实际购票人数加上在线机器人;
            if($itm['ticket_price'] > 0) {
                $chatroom_robot_user_list_key = "chatroom_" . $itm['id'] . "_robot_user_list_key";
                $robot_users = DI()->redis->get_forever($chatroom_robot_user_list_key);
                $robot_users_num = substr_count($robot_users, ',');
                $itm['ticket_sale'] = $itm['ticket_sale'] + $robot_users_num + 10;
            }

            //五、取得游戏id
            $live_game = $model_game->getLiveGame($itm['id']);
            $itm['gid'] = isset($live_game['gid']) ? $live_game['gid'] : 0;
            $final_live_list[] = $itm;
        }
        return $final_live_list;
    }

    public function getBannerList() {
        $tools = new Model_Tools();
        $banner_list = $tools->getBannerList();
        if (empty($banner_list)) {
            return false;
        }

        return $banner_list;
    }



    public function getUserLiveList($user_id) {
        $live_list = $this->liveModel->getUserLiveList($user_id);
        if (empty($live_list)) {
            return false;
        }
        return $live_list;
    }

}