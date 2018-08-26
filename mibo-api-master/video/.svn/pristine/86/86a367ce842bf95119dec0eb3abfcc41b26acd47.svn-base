<?php
class Domain_Task extends Domain_Common {

    public function __construct() {
        parent::__construct();
        $today_end_second = strtotime('tomorrow');
        $this->today_remain_second = $today_end_second - time();
    }

    public function getTaskList() {
        $today = date('Y-m-d', time());
        $user_id = $this->req['user_id'];
        $model_task = new Model_Task();
        $task_list = $model_task->getTaskList();

        if(empty($task_list)) throw new PhalApi_Exception('没有任务列表');

        foreach($task_list as &$per_task) {
            $per_task['task_status'] = '0';
            $per_task['finish_times'] = '0';

            //坐庄一次
            if($per_task['id'] == 1) {
                $finish_times = DI()->notorm->apply_dealer->where('user_id', $user_id)
                    ->where('create_time >= ?', $today)->count();
                $per_task['need_times'] = '1';
                if($finish_times >= 1) {
                    $per_task['task_status'] = '1';
                    $per_task['finish_times'] = '1';
                    $had_get_reward = DI()->redis->sIsMember('finish_task_user_id_'.$user_id, $per_task['id']);
                    $had_get_reward && $per_task['task_status'] = '2';
                }
            }

            //单次赢100万
            if($per_task['id'] == 2) {
                $finish_times = DI()->notorm->game_loop_settlement->where('user_id', $user_id)
                    ->where('create_time >= ?', $today)->where('earn_num >= ?', 1000000)->count();
                $per_task['need_times'] = '1';
                if($finish_times >= 1) {
                    $per_task['task_status'] = '1';
                    $per_task['finish_times'] = '1';
                    $had_get_reward = DI()->redis->sIsMember('finish_task_user_id_'.$user_id, $per_task['id']);
                    $had_get_reward && $per_task['task_status'] = '2';
                }
            }

            //送礼超过100钻
            if($per_task['id'] == 3) {
                $send_diamond = DI()->r_notorm->user_deal_log->where('user_id', $user_id)
                    ->where('create_time >= ?', $today)->where('deal_type = 1')->sum('deal_num');
                $per_task['need_times'] = '100';
                $per_task['finish_times'] = $send_diamond ? $send_diamond : '0';
                if($send_diamond >= 100) {
                    $per_task['task_status'] = '1';
                    $per_task['finish_times'] = $send_diamond;
                    $had_get_reward = DI()->redis->sIsMember('finish_task_user_id_'.$user_id, $per_task['id']);
                    $had_get_reward && $per_task['task_status'] = '2';
                }
            }

            //充值一次
            if($per_task['id'] == 4) {
                $finish_times = DI()->notorm->recharge_log->where('user_id', $user_id)
                    ->where('create_time >= ?', $today)->where('is_update_diamond = 1')->count();
                $per_task['need_times'] = '1';
                if($finish_times >= 1) {
                    $per_task['task_status'] = '1';
                    $per_task['finish_times'] = '1';
                    $had_get_reward = DI()->redis->sIsMember('finish_task_user_id_'.$user_id, $per_task['id']);
                    $had_get_reward && $per_task['task_status'] = '2';
                }
            }

            //获胜一局
            if($per_task['id'] == 5) {
                $finish_times = DI()->notorm->game_loop_settlement->where('user_id', $user_id)
                    ->where('create_time >= ?', $today)->where('earn_num > 0')->count();
                $per_task['need_times'] = '1';
                if($finish_times >= 1) {
                    $per_task['task_status'] = '1';
                    $per_task['finish_times'] = '1';
                    $had_get_reward = DI()->redis->sIsMember('finish_task_user_id_'.$user_id, $per_task['id']);
                    $had_get_reward && $per_task['task_status'] = '2';
                }
            }

            //玩牌50局
            if($per_task['id'] == 6) {
                $finish_times = DI()->notorm->game_loop_settlement->where('user_id', $user_id)
                    ->where('create_time >= ?', $today)->count();
                $per_task['need_times'] = '50';
                $per_task['finish_times'] = $finish_times;
                if($finish_times >= 50) {
                    $per_task['task_status'] = '1';
                    $had_get_reward = DI()->redis->sIsMember('finish_task_user_id_'.$user_id, $per_task['id']);
                    $had_get_reward && $per_task['task_status'] = '2';
                }
            }

            //分享两次
            if($per_task['id'] == 7) {
                $finish_times = DI()->notorm->share_log->where('user_id', $user_id)
                    ->where('share_time >= ?', $today)->count();
                $per_task['need_times'] = '2';
                $per_task['finish_times'] = $finish_times;
                if($finish_times >= 2) {
                    $per_task['task_status'] = '1';
                    $had_get_reward = DI()->redis->sIsMember('finish_task_user_id_'.$user_id, $per_task['id']);
                    $had_get_reward && $per_task['task_status'] = '2';
                }
            }

            //看直播5次
            if($per_task['id'] == 8) {
                $finish_times = DI()->notorm->live_entry_log->where('user_id', $user_id)
                    ->where('create_time >= ?', $today)->where('act = 0')->count('DISTINCT live_id');
                $per_task['need_times'] = '5';
                $per_task['finish_times'] = $finish_times;
                if($finish_times >= 5) {
                    $per_task['task_status'] = '1';
                    $had_get_reward = DI()->redis->sIsMember('finish_task_user_id_'.$user_id, $per_task['id']);
                    $had_get_reward && $per_task['task_status'] = '2';
                }
            }


        }

        return $task_list;

    }

    public function gainTaskReward() {
        $user_id = $this->req['user_id'];
        $task_id_str = $this->req['task_id'];
        $task_ids = explode(',', $task_id_str);

        $user_info = DI()->notorm->user->select('coin_num,diamond_num')->where('id', $user_id)->fetchOne();

        //循环是为了一键领取所有完成的任务
        foreach($task_ids as $task_id) {
            if(!$task_id) throw new PhalApi_Exception('任务id错误', 479);
            //一、判断是否已经领取
            $had_get_reward = DI()->redis->sIsMember('finish_task_user_id_'.$user_id, $task_id);
            if($had_get_reward) throw new PhalApi_Exception('已经领取了', 480);

            //二、是否存在这任务
            $model_task = new Model_Task();
            $task = $model_task->getTaskById($task_id);
            if(empty($task)) throw new PhalApi_Exception('没这任务', 481);

            //三、是否已经完成
            if(!$this->hadFinishTask($user_id, $task_id)) throw new PhalApi_Exception('任务没完成');

            //四、发放奖励
            $model_user = new Model_User();
            $rs = $model_user->updateUserDiamondCoin($user_id, 0, $task['reward']);
            if(!$rs) throw new PhalApi_Exception('服务器出错', 581);

            //完成的任务id存到缓存中
            DI()->redis->sAdd('finish_task_user_id_'.$user_id, $task_id, $this->today_remain_second);

            $deal_log_data = array(
                'user_id'     => 1,
                'to_user_id'  => $user_id,
                'mid'         => MOUDEL_DAY_TASK,
                'value'       => $task_id,
                'deal_type'   => DEAL_TYPE_COIN,
                'deal_num'    => $task['reward'],
                'deal_before' => $user_info['coin_num'],
                'deal_after'  => $user_info['coin_num'] + $task['reward'],
            );

            $deal_log_model = new Model_UserDealLog();
            $insert_id = $deal_log_model->insertDealLog($deal_log_data);
            if($insert_id) {
                $user_info['coin_num'] = $deal_log_data['deal_after'];
            }
        }

        return $user_info;
    }

    public function hadFinishTask($user_id, $task_id) {
        $today = date('Y-m-d', time());
        //坐庄一次
        if($task_id == 1) {
            $finish_times = DI()->notorm->apply_dealer->where('user_id', $user_id)
                ->where('create_time >= ?', $today)->count();
            if($finish_times >= 1) return true;
        }

        //单次赢100万
        if($task_id == 2) {
            $finish_times = DI()->notorm->game_loop_settlement->where('user_id', $user_id)
                ->where('create_time >= ?', $today)->where('earn_num >= ?', 1000000)->count();
            if($finish_times >= 1) return true;
        }

        //送礼超过100钻
        if($task_id == 3) {
            $send_diamond = DI()->notorm->user_deal_log->where('user_id', $user_id)
                ->where('create_time >= ?', $today)->where('deal_type = 1')->sum('deal_num');
            if($send_diamond >= 100) return true;
        }

        //充值一次
        if($task_id == 4) {
            $finish_times = DI()->notorm->live_entry_log->where('user_id', $user_id)
                ->where('create_time >= ?', $today)->where('act = 0')->count('DISTINCT live_id');
            if($finish_times >= 1) return true;
        }

        //获胜一局
        if($task_id == 5) {
            $finish_times = DI()->notorm->game_loop_settlement->where('user_id', $user_id)
                ->where('create_time >= ?', $today)->where('earn_num > 0')->count();
            if($finish_times >= 1) return true;
        }

        //玩牌50局
        if($task_id == 6) {
            $finish_times = DI()->notorm->game_loop_settlement->where('user_id', $user_id)
                ->where('create_time >= ?', $today)->count();
            if($finish_times >= 50) return true;
        }

        //分享两次
        if($task_id == 7) {
            $finish_times = DI()->notorm->share_log->where('user_id', $user_id)
                ->where('share_time >= ?', $today)->count();
            if($finish_times >= 2) return true;
        }

        //看直播5次
        if($task_id == 8) {
            $finish_times = DI()->notorm->live_entry_log->where('user_id', $user_id)
                ->where('create_time >= ?', $today)->where('act = 0')->count();
            if($finish_times >= 5) return true;
        }

        return false;
    }

    public function signToday() {
        $user_id = $this->req['user_id'];
        $is_sign = DI()->redis->get_time('day_sign_user_id_' . $user_id);
        if(!empty($is_sign)) throw new PhalApi_Exception('今天已经签过了', 488);

        $model_user = new Model_User();
        $model_user->updateUserDiamondCoin($user_id, 0, 20000);     //签到送米币

        $today_end_second = strtotime('tomorrow');
        $today_remain_second = $today_end_second - time();
        $res = DI()->redis->set_time('day_sign_user_id_'.$user_id, 1, $today_remain_second);
        if($res) {
            return DI()->r_notorm->user->select('coin_num,diamond_num')->where('id', $user_id)->fetchOne();
        } else {
            return false;
        }
    }

    public function hadSignToday() {
        $is_sign = DI()->redis->get_time('day_sign_user_id_' . $this->req['user_id']);
        $is_sign = !empty($is_sign) ? true : false;

        return $is_sign;

    }


}