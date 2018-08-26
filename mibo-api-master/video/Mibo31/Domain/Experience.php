<?php
    class Domain_Experience {

        //退出时加观看经验,每小时200经验，每天最多累积2小时
        public function setSeeLiveExperience($uid, $live_id) {

            $exp_model = new Model_Experience();
            $exp_log_info = $exp_model->getLastSeeLiveExp($uid);
            $exp_log_num = count($exp_log_info);
            if($exp_log_num == 0 || ($exp_log_num == 1 && $exp_log_info[0]['experience'] == 200)) {
                $live_entry_model = new Model_LiveEntryLog();
                $last_entry = $live_entry_model->getLastEntry($uid, $live_id);
                if($last_entry['act'] == 0) {
                    $duration = time() - strtotime($last_entry['create_time']);
                    $experience_hour = floor($duration / 3600) >= 2 ? 2 : floor($duration / 3600);

                    //若已经增加一次经验，第二次只能是200
                    $experience = $exp_log_num == 1 ? 200 : 200 * $experience_hour;

                    $userModel = new Model_User();

                    $rs = $userModel->addUserExperience($uid, $experience);

                    if ($rs == 1) {
                        $data = array(
                            'user_id'    => $uid,
                            'mid'        => MOUDEL_LIVE_ENTRY,
                            'value'      => $live_id,
                            'extra'      => "",
                            'experience' => $experience,
                        );
                        $insert_id = $exp_model->addUserExperienceLog($data);
                    }
                }
            }

        }

        function getLevel($expeience) {
            $level = 0;
            while ($expeience >= 0) {
                $expeience -= 50 + $level++ * 10;
            }
            return $level;
        }



    }

