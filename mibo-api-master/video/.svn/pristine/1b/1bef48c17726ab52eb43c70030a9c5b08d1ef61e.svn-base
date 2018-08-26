<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/8/16
 * Time: 18:35
 */
class Domain_Rank {
    private $req;

    public function __construct() {
        $this->req = DI()->request->getAll();
    }

    //魅力榜，主播收到最多的钻石
    public function whoReceiveMost() {
        $receive_most = DI()->redis->get_time('who_receive_most');
        if(empty($receive_most)) {
            $self_user_id = $this->req['self_user_id'];
            $sql = "select user.id as user_id, user.nick_name, user.im_id, user.level, user.avatar, user.signature, " .
                "user.sex, user.address, user.receive_num, " .
                "follow.to_user_id from mb_user as user left join mb_follow_list as follow on user.id = follow.to_user_id " .
                "and follow.user_id = {$self_user_id} and follow.is_cancel = 0 order by user.receive_num DESC limit 20";

            $receive_most = DI()->notorm->example->queryAll($sql);

            foreach ($receive_most as &$val) {
                if (!empty($val['to_user_id'])) {
                    $val['is_followed'] = true;
                } else {
                    $val['is_followed'] = false;
                }
                unset($val['to_user_id']);
            }

            //十分钟更新一次财富排行榜
            DI()->redis->set_time('who_receive_most', $receive_most);
        }

        return $receive_most;
    }


    public function getCoinRank() {
        //$rank = DI()->redis->get_time('coin_rank_user');
        //if(empty($rank)) {
            $self_user_id = $this->req['self_user_id'];
            $sql = "select user.id as user_id, user.nick_name, user.im_id, user.level, user.avatar, user.signature, " .
                "user.sex, user.address, user.coin_num, " .
                "follow.to_user_id from mb_user as user left join mb_follow_list as follow on user.id = follow.to_user_id " .
                "and follow.user_id = {$self_user_id} and follow.is_cancel = 0 where anchor_type = 0 order by user.coin_num DESC limit 20";
            $rank = DI()->notorm->example->queryAll($sql);

            foreach($rank as &$val) {
                if (!empty($val['to_user_id'])) {
                    $val['is_followed'] = true;
                } else {
                    $val['is_followed'] = false;
                }
                unset($val['to_user_id']);
            }

            //十分钟更新一次财富排行榜
            //DI()->redis->set_time('coin_rank_user',$rank);
        //}

        return $rank;
    }

    public function getTodayWinner() {
        $winners = DI()->redis->get_time('today_winners');
        if(!empty($winners)) {
            $winners = json_decode($winners, true);
        } else {
            $today = date('Y-m-d H:i:s', strtotime('-1 days'));
            //根据user_id分组，取得每个用户当天的金币收益总数
            $sql = "select user_id, sum(earn_num) as earn_total from mb_game_loop_settlement " .
                "where create_time >= '{$today}' group by user_id having earn_total > 0 ORDER BY earn_total DESC limit 20";
            $rank_list = DI()->notorm->example->queryRows($sql);

            $user_ids = "";

            if (empty($rank_list)) {
                throw new PhalApi_Exception('没有数据', 333);
            }

            foreach ($rank_list as $itm) {
                $user_ids .= $itm['user_id'] . ",";
            }

            $user_ids = rtrim($user_ids, ',');

            $self_user_id = $this->req['self_user_id'];

            $sql = "select user.id, user.nick_name, user.im_id, user.level, user.avatar, user.signature, user.sex, user.address, " .
                "follow.to_user_id from mb_user as user left join mb_follow_list as follow on user.id = follow.to_user_id " .
                "and follow.user_id = {$self_user_id} and follow.is_cancel = 0 where user.id in ({$user_ids})";
            $users = DI()->notorm->example->queryAll($sql);

            //userid作为数组键
            $user_list = array_reduce($users, function(&$user_list, $v){
                $user_list[$v['id']] = $v;
                return $user_list;
            });

            $winners = array();
            foreach ($rank_list as $itm) {
                $itm['avatar'] = $user_list[$itm['user_id']]['avatar'];
                $itm['nick_name'] = $user_list[$itm['user_id']]['nick_name'];
                $itm['sex'] = $user_list[$itm['user_id']]['sex'];
                $itm['level'] = $user_list[$itm['user_id']]['level'];
                $itm['signature'] = $user_list[$itm['user_id']]['signature'];
                if (!empty($user_list[$itm['user_id']]['to_user_id'])) {
                    $itm['is_followed'] = true;
                } else {
                    $itm['is_followed'] = false;
                }
                $itm['signature'] = $user_list[$itm['user_id']]['signature'];
                $winners[] = $itm;
            }

            DI()->redis->set_time('today_winners', json_encode($winners));

        }

        return $winners;

    }

    //新人榜，最近三天的用户
    public function newUserRank() {
        //记得关注时清除缓存
        $rank = DI()->redis->get_time('new_user_rank');
        if(empty($rank)) {
            $two_week_ago = date('Y-m-d', strtotime('-14 day'));
            $self_user_id = $this->req['self_user_id'];
            $sql = "select user.id as user_id, user.nick_name, user.im_id, user.level, user.avatar, user.signature, " .
                "user.sex, user.address, user.coin_num, " .
                "follow.to_user_id from mb_user as user left join mb_follow_list as follow on user.id = follow.to_user_id " .
                "and follow.user_id = {$self_user_id} and follow.is_cancel = 0 where user.create_time >= '".
                $two_week_ago."' order by user.coin_num DESC limit 20";
            $rank = DI()->notorm->example->queryAll($sql);

            foreach($rank as &$val) {
                if (!empty($val['to_user_id'])) {
                    $val['is_followed'] = true;
                } else {
                    $val['is_followed'] = false;
                }
                unset($val['to_user_id']);
            }

            //十分钟更新一次财富排行榜
            DI()->redis->set_time('new_user_rank',$rank);
        }

        return $rank;
    }

}