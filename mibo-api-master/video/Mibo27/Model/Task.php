<?php

class Model_Task extends PhalApi_Model_NotORM {

    protected function getTableName($id) {
        return 'task';
    }

    public function getTaskList() {
        $list = DI()->redis->get_time('task_list');
        if(!empty($list)) return $list;

        $list = $this->getORM()->where('is_show = 1')->fetchAll();
        DI()->redis->set_time('task_list', $list, 43200);
        return $list = $list ? $list : array();
    }

    public function getTaskById($task_id) {
        $task = DI()->redis->get_time('task_id_'.$task_id);
        if(!empty($task)) return $task;
        $task = $this->getORM()->where('id',$task_id)->fetchOne();
        DI()->redis->set_time('task_id_'.$task_id, $task, 43200);
        return $task;
    }






}
