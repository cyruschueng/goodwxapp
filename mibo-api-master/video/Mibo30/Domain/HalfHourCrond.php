<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/8/16
 * Time: 18:35
 */
class Domain_HalfHourCrond {

    private $req;

    public function __construct() {
        $this->req = DI()->request->getAll();
    }

    public function closeExpiredLive() {
        $half_hour_ago = date('Y-m-d H:i', strtotime('30 minutes ago'));
        DI()->logger->debug('关闭预告时间', $half_hour_ago);
        $rs = DI()->notorm->live_list->where('status = 1 and preview_time < ?', $half_hour_ago)->update(['status' => 5]);

        DI()->logger->info('关闭过期预告', $rs);

        if($rs) {
            DI()->redis->del('get_live_list');
        }

    }

    public function saveMsgLog() {

        //$rs = DI()->redis->get_time("emchat");
        //if (empty($rs)) {
        //
        //    DI()->redis->set_time("emchat", $rs);
        //}
        $start = DI()->redis->get_time('time_to_save_msg_log');
        if($start) {
            return;
        }
        DI()->logger->info('定时导入环信记录');
        DI()->redis->set_time('time_to_save_msg_log', 1, 3600);

        $emchat = new Emchat_Lite();
        $rs = $emchat->getChatLog();

        if (!empty($rs['application']) && !empty($rs['data'])) {
            $log_url = $rs['data'][0]['url'];

            $gz = @file_get_contents($log_url);
            if(!$gz) return;
            $path = API_ROOT . '/Runtime/chatlog/' . date('Ym') . '/' . date('d') . '/';
            if (!is_dir($path)) {
                mkdir($path, 0777, true);
            }

            $file_name = $path . date('YmdH', strtotime('-3 hours'));
            $file_name_gz = $file_name . '.gz';
            $save_res = file_put_contents($file_name_gz, $gz);

            //这里需要解压，然后读取消息消息，根据消息体专门建立一个数据库用于存放日志
            if($save_res) {
                $this->unzip($file_name_gz);
                $this->read_file($file_name);
            }

        }

    }

    public function unzip($old_file) {

        //$old_file = API_ROOT . '/Runtime/chatlog/201704/28/2017042806.gz';

        $buffer_size = 4096;
        $out_file_name = str_replace('.gz', '', $old_file);
        $file = gzopen($old_file, 'rb');
        $out_file = fopen($out_file_name, 'wb');
        while(!gzeof($file)) {
            fwrite($out_file, gzread($file, $buffer_size));
        }
        fclose($out_file);
        gzclose($file);

    }

    /**
     * 详细描述
     * @desc chat表示私聊， group表示聊天室
     */
    public function read_file($file) {
        //$file = API_ROOT . '/Runtime/chatlog/201704/28/2017042806';
        if(!is_file($file)) {
            DI()->logger->info('msg-log', 'unzip-file-not-exit');
        }

        $msg_arr = file($file);

        $group_sql = "insert into mb_groupchat_msg (msg_id, msg_timestamp, chat_type, msg_from, msg_to, pid, bodies, ext) values ";
        $chat_sql = "insert into mb_chat_msg (msg_id, msg_timestamp, chat_type, msg_from, msg_to, pid, bodies, ext) values ";

        $has_group_msg = false;
        $has_chat_msg = false;

        //$msg =  json_decode($msg_arr[0], true);
        //$msg_bodies = json_decode($msg['payload']['bodies'][0]['msg'], true);
        //print_r($msg_bodies);exit;
        //print_r($msg['payload']['bodies'][0]);exit;
        //echo json_encode($msg['payload']['bodies'][0]);
        //exit;
        //$tmp = $msg_arr[0];
        //unset($msg_arr);
        //$msg_arr[0] = $tmp;

        //print_r($msg_arr);exit;

        foreach($msg_arr as $per_msg) {
            $per_msg = json_decode($per_msg, true);
            if($per_msg['chat_type'] == 'groupchat') {
                $has_group_msg = true;

                $group_sql .= "('" . $per_msg['msg_id'] . "', '";
                $group_sql .= $per_msg['timestamp'] . "', '";
                $group_sql .= $per_msg['chat_type'] . "', '";


                $per_msg['payload']['from'] = isset($per_msg['payload']['from'])
                    ? $per_msg['payload']['from'] : '';
                $group_sql .= $per_msg['payload']['from'] . "', '";


                $per_msg['payload']['to'] = isset($per_msg['payload']['to'])
                    ? $per_msg['payload']['to'] : '';
                $group_sql .= $per_msg['payload']['to'] . "', '";

                $msg_bodies = isset($per_msg['payload']['bodies'][0]['msg'])
                    ? json_decode($per_msg['payload']['bodies'][0]['msg'], true) : [];
                $msg_pid = !empty($msg_bodies) ? $msg_bodies['pid'] : 0;
                $group_sql .= $msg_pid . "', '";

                //$per_msg['payload']['bodies'][0] = [
                //    "msg" => ["pid" => 200],
                //    "type" => "txt",
                //];
                //echo json_encode($per_msg['payload']['bodies'][0]);exit;
                //echo serialize($per_msg['payload']['bodies'][0]);exit;

                $per_msg['payload']['bodies'][0] = isset($per_msg['payload']['bodies'][0])
                    ? addslashes(json_encode($per_msg['payload']['bodies'][0])) : '';
                $group_sql .= $per_msg['payload']['bodies'][0] . "', '";

                $per_msg['payload']['ext'] = isset($per_msg['payload']['ext']) && !empty($per_msg['payload']['ext']) ?
                    addslashes(json_encode($per_msg['payload']['ext'])) : '';
                $group_sql .= $per_msg['payload']['ext'] . "'";

                $group_sql .= "),";
            }

            if($per_msg['chat_type'] == 'chat') {

                $has_chat_msg = true;

                $chat_sql .= "('" . $per_msg['msg_id'] . "', '";
                $chat_sql .= $per_msg['timestamp'] . "', '";
                $chat_sql .= $per_msg['chat_type'] . "', '";


                $per_msg['payload']['from'] = isset($per_msg['payload']['from'])
                    ? $per_msg['payload']['from'] : '';
                $chat_sql .= $per_msg['payload']['from'] . "', '";


                $per_msg['payload']['to'] = isset($per_msg['payload']['to'])
                    ? $per_msg['payload']['to'] : '';
                $chat_sql .= $per_msg['payload']['to'] . "', '";

                $msg_bodies = isset($per_msg['payload']['bodies'][0]['msg'])
                    ? json_decode($per_msg['payload']['bodies'][0]['msg'], true) : [];
                $msg_pid = !empty($msg_bodies) ? $msg_bodies['pid'] : 0;
                $chat_sql .= $msg_pid . "', '";

                $per_msg['payload']['bodies'][0] = isset($per_msg['payload']['bodies'][0])
                    ? addslashes(json_encode($per_msg['payload']['bodies'][0])) : '';
                $chat_sql .= $per_msg['payload']['bodies'][0] . "', '";


                $per_msg['payload']['ext'] = isset($per_msg['payload']['ext']) && !empty($per_msg['payload']['ext']) ?
                    addslashes(json_encode($per_msg['payload']['ext'])) : '';
                $chat_sql .= $per_msg['payload']['ext'] . "'";

                $chat_sql .= "),";
            }

        }

        DI()->easemob = new PhalApi_DB_NotORM(DI()->config->get('dbs_easemob'), !empty($_GET['__sql__']));

        if($has_group_msg) {
            $group_sql = rtrim($group_sql, ',');
            DI()->easemob->example->queryAll($group_sql);
        }

        if($has_chat_msg) {
            $chat_sql = rtrim($chat_sql, ',');
            DI()->easemob->example->queryAll($chat_sql);
        }

        @unlink($file);

        exit;
    }


}