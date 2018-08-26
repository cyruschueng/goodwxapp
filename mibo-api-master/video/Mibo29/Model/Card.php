<?php

class Model_Card extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'pk_loop_card_log';
    }

    public function getPkLastCard($room_id) {
        $card = DI()->notorm->pk_loop_card_log->where('room_id', $room_id)
            ->order('id desc')->fetchOne();
        return !empty($card) ? $card : NULL;
    }

    public function getPkCardByLoopId($loop_id) {
        $card = DI()->redis->get_time('pk_card_loop_id_' . $loop_id);

        if(empty($card)) {
            $card = DI()->notorm->pk_loop_card_log->where('id', $loop_id)->fetchOne();
            DI()->redis->set_time('pk_card_loop_id_' . $loop_id, $card, 180);
        }

        return !empty($card) ? $card : NULL;
    }

    public function getRoomCurrentLoop($room_id) {

        $num = DI()->redis->get_time('loop_num_pk_room_id_'.$room_id);
        if($num) return $num;

        $num = DI()->notorm->pk_loop_card_log->where('room_id', $room_id)->count('id');
        DI()->redis->set_time('loop_num_pk_room_id_'.$room_id, $num);

        return $num;
    }

    public function getDealerByRoomId($room_id) {
        $dealer = DI()->notorm->pk_dealer->where('room_id', $room_id)
            ->order('id desc')->fetchOne();
        return !empty($dealer) ? $dealer : NULL;
    }

    public function insertPkCard($data) {
        DI()->notorm->pk_loop_card_log->insert($data);
        $id = DI()->notorm->pk_loop_card_log->insert_id();
        return $id ? $id : false;
    }


}