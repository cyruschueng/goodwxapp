<?php

class My extends Ctl{
	
	
	/* 我创建的活动 */
	public function selectOut(){
	  
	    if(empty($this->input['_LIMIT'])){
		die('用于分页的get参数"_LIMIT"没有传过来，写法：_LIMIT=10,20   这里代表查找第10条到第20条数据');
	    }
 
	    $this->load->mysqlDB('mysql0');

	    $where = '';
	    $where.= " AND openid ='".$this->input['openid']."'";


	    $data = $this->mysql0-> getAll(array(
	        
	        'table'=>'t_act',
	        'field'=>'id,pic,add_time,pay_total,pay_fee,num_group',
		'where'=>$where,
   		'order'=>'add_time DESC',
	        'limit'=>$this->input['_LIMIT']
	    ));

	    $total = $this->mysql0-> getOne(array(
	        
	        'table'=>'t_act',
	        'field'=>'COUNT(*) total, SUM((pay_total-pay_fee)) money_total',
		'where'=>$where,
	    ));

	    foreach ($data as &$d){
		$d['add_time'] = date('Y-m-d H:i:s',$d['add_time']);
		$d['money']=$d['pay_total']-$d['pay_fee'];
		$d['money_eachGroup'] = $d['money']/$d['num_group'];
		
		    $act_group = $this->mysql0-> getAll(array(

			'table'=>'t_act_group',
			'field'=>'person_need,person_has',
			'where'=>"AND act_id=".$d['id'],
		    ));
		
		    $group_num = 0;
		    $group_num_finish = 0;
		    foreach($act_group as $ag){
			$group_num += 1;
			if($ag['person_need']<=$ag['person_has']){
				$group_num_finish += 1;
			}
		    }
		    $d['group_num']=$group_num;
		    $d['group_num_finish']=$group_num_finish;

	    }
	    
	    $out = array(
	        'code'  =>'200',
	        'msg'=>"成功",
	        'data'=>[
	            'list'=>$data,
	            'num'=>count($data),
	            'total'=>$total['total'],
		    'money_total'=>$total['money_total'],
	        ]
	    );
	    
	    ajaxJson($out);
	}
	
	/* 我参与的活动 */
	public function selectIn(){
	  
	    if(empty($this->input['_LIMIT'])){
		die('用于分页的get参数"_LIMIT"没有传过来，写法：_LIMIT=10,20   这里代表查找第10条到第20条数据');
	    }
 
	    $this->load->mysqlDB('mysql0');

	    $where = '';
	    $where.= " AND openid ='".$this->input['openid']."'";

	    $data = $this->mysql0-> getAll(array(
	        
	        'table'=>'t_act_user',
	        'field'=>'act_id,use_time,create_time,get_award,get_ranking',
		'where'=>$where,
   		'order'=>'create_time DESC',
	        'limit'=>$this->input['_LIMIT']
	    ));

	    $total = $this->mysql0-> getOne(array(
	        
	        'table'=>'t_act_user',
	        'field'=>'COUNT(*) total, SUM(get_award) total_money',
		'where'=>$where,
	    ));

	    foreach ($data as &$d){
		    $act_info = $this->mysql0-> getOne(array(

			'table'=>'t_act',
			'field'=>'pic',
			'where'=>"AND id=".$d['act_id'],
		    ));
		
		    $d['act_info']=$act_info;

	    }
	    
	    $out = array(
	        'code'  =>'200',
	        'msg'=>"成功",
	        'data'=>[
	            'list'=>$data,
	            'num'=>count($data),
	            'total'=>$total['total'],
	            'money_total'=>$total['total_money']
	        ]
	    );
	    
	    ajaxJson($out);
	}

        /*投诉*/
	function insertComplain(){

            $this->load->mysqlDB('mysql0');

            $data = $this->input['_DATA'];

            $data['create_time'] = date('Y-m-d H:i:s',time());
            //插入活动
            $return = $this->mysql0->insert([
                'table'=>'t_my_complain',
                'data'=>$data,
                'is_return_id'=>true,
            ]);

            $out = [
                'code'  =>'200',
            'msg'=>"成功",
            'data'=>$return,
            ];
       	    ajaxJson($out);

	}



}	
