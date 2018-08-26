<?php

class Model_PkLoopSettlement extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'pk_loop_settlement';
    }

    public function getPkRecordByUser($user_id, $page_no = 1, $page_size = 20) {
        $offset = ($page_no - 1) * $page_size;

        $record = $this->getORM()->select('room_id, user_id, sum(earn_num) as total_earn, create_time')->where('user_id', $user_id)
            ->group('room_id')->limit($offset, $page_size)->fetchAll();

        $record = !empty($record) ? $record : NULL;
        return $record;
    }

    public function getRoomPkList($room_id, $page_no = 1, $page_size = 20) {
        $offset = ($page_no - 1 ) * $page_size;

        $pk_list = $this->getORM()->where('room_id', $room_id)->offset($offset, $page_size)->fetchAll();

        $pk_list = !empty($pk_list) ? $pk_list : NULL;

        return $pk_list;
    }


}
