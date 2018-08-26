<?php
class Domain_Feedback extends Domain_Common {
    public function __construct() {
        parent::__construct();
    }

   public function myFeedback() {
       $page_no = isset($this->req['page_no']) ? $this->req['page_no'] : 1;
       $page_size = isset($this->req['page_size']) ? $this->req['page_size'] : 20;
       $offset = ($page_no - 1) * $page_size;

       $user_id = $this->req['user_id'];
       $feedback = DI()->notorm->feedback->where('user_id', $user_id)->order('id desc')
                    ->limit($offset, $page_size)->fetchAll();

       $model_feedback_type = new Model_FeedbackType();
       $type_list = $model_feedback_type->getList();
       $new_type_list = array();
       foreach($type_list as $per_type) {
           $new_type_list[$per_type['type']] = $per_type['value'];
       }

       foreach($feedback as &$per) {
           $per['type_desc'] = array();
            $tmp_type_arr = explode(',', $per['type']);
           if(!empty($tmp_type_arr)) {
               foreach($tmp_type_arr as $one_type) {
                   if(isset($new_type_list[$one_type])) {
                       array_push($per['type_desc'], $new_type_list[$one_type]);
                   }
               }
           }

       }

       return $feedback;
   }



}