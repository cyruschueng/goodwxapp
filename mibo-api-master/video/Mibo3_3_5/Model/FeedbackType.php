<?php

class Model_FeedbackType extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'feedback_type';
    }

    public function getList() {
        $feedback_type = DI()->redis->get_time('feedback_type_list');
        if(!empty($feedback_type)) return $feedback_type;

        $feedback_type = DI()->notorm->feedback_type->order('type ASC')->fetchAll();
        if(!empty($feedback_type)) DI()->redis->set_time('feedback_type_list', $feedback_type, 3600 * 12);

        return $feedback_type;
    }

    public function getOneType($type) {
        $info = DI()->redis->get_time('feedback_type_id_'.$type);
        if(!empty($info)) return $info;
        $info = $this->getORM()->where('type', $type)->fetchOne();
        DI()->redis->set_time('feedback_type_id_'.$type, $info, 3600*12);
        return $info;

    }



}
