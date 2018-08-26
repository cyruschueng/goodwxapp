<?php

class Act extends Ctl{
	
	public $act_limit_person = 10;
	
	/* 查询列表数据 */
	public function select(){
	  
	    if(empty($this->input['_LIMIT'])){
		die('用于分页的get参数"_LIMIT"没有传过来，写法：_LIMIT=10,20   这里代表查找第10条到第20条数据');
	    }
 
	    $this->load->mysqlDB('mysql0');

	    $current_user = $this->mysql0-> getOne(array(
	        
	        'table'=>'t_user',
	        'field'=>'gender',
		'where'=>"AND openid='".$this->input['openid']."'",
	    ));
 
	    $time = time();
	    $where = ' AND is_list=1 AND (end_time=0 OR end_time>'.$time.')'; //insertUser 方法里面会计算并修改这里的end_time的值
	   
	    if(empty($current_user['gender'])) $current_user['gender'] = 0; 
	    $where.= ' AND limit_sex IN(0,'.$current_user['gender'].')';
 
	    $data = $this->mysql0-> getAll(array(
	        
	        'table'=>'t_act',
	        'field'=>'*',
		'where'=>$where,
   		'order'=>'add_time DESC',
	        'limit'=>$this->input['_LIMIT']
	    ));
		
	    $total = $this->mysql0-> getOne(array(
	        
	        'table'=>'t_act',
	        'field'=>'COUNT(*) total',
		'where'=>$where,
	    ));
		

	    foreach ($data as &$d){
		    $this_user = $this->mysql0-> getOne(array(

			'table'=>'t_user',
			'field'=>'*',
			'where'=>"AND openid='".$d['openid']."'",
		    ));
		    $d['user_info']=$this_user;

	    }
	    
	    $out = array(
	        'code'  =>'200',
	        'msg'=>"成功",
	        'data'=>[
	            'list'=>$data,
	            'num'=>count($data),
		    'total'=>$total['total'],
	        ]
	    );
	    
	    ajaxJson($out);
	}
	
	/* 查询一条 */
	public function selectOne(){
	    
	    $this->load->mysqlDB('mysql0');
	    
	    $id = $this->input['id'];
            if(!$id) die('活动id没有传');
	  $data = [];




            $current_user = $this->mysql0-> getOne(array(

                'table'=>'t_user',
                'field'=>'gender',
                'where'=>"AND openid='".$this->input['openid']."'",
            ));
	    if(!$current_user){
		die('无当前用户！');
	    }
 

 
	    $act_group= $this->mysql0-> getAll(array(
                    
                'table'=>'t_act_group',
                'field'=>'*',
                'where'=>"AND act_id=$id"
            ));
	    if(!$act_group){
		die('没有这个活动了!');
	    }
	    if(empty($this->input['group_id'])){
		
	    	$minPersonNum_group = $act_group['0']['id'];
	    	foreach($act_group as $a_g){
		
			if($a_g['person_has']>$minPersonNum_group){
				$minPersonNum_group = $a_g['person_has'];
			}
	    	}
	    	$group_id=$minPersonNum_group;	   
	    }else{
		$group_id=$this->input['group_id'];
	    }
	    $data['group_id']=$group_id;
	    $info = $this->mysql0-> getOne(array(
	        
	        'table'=>'t_act',
	        'field'=>'*',
	        'where'=>"AND id=$id"
	    ));


	    $group_info = $this->mysql0-> getOne(array(
	        
	        'table'=>'t_act_group',
	        'field'=>'*',
	        'where'=>"AND act_id=$id"
	    ));
	    $is_finish = 0;
            if($group_info['end_time']<time() && $group_info['end_time'] !=0){
                $is_finish  = 1;
            }

/*
if($info['limit_sex']!=0){
if($info['limit_sex']!=$current_user['gender']){
            $out = array(
                'code'  =>'402',
                'msg'=>"性别不符合",
                'data'=>[]
            );
            ajaxJson($out);

}
}*/

	    $pic = $this->mysql0-> getAll(array(

                'table'=>'t_act_pic',
                'field'=>'*',
                'where'=>"AND act_id=$id"
            ));
 	    $info['description_pic']=$pic;


            $report_user_info= $this->mysql0-> getOne(array(
                         'table'=>'t_user',
                         'field'=>'*',
                        'where'=>"AND openid='".$this->input['openid']."'"
            ));
                        $info['user_info']=$report_user_info;



	    $data['info'] = $info;
	
	    $group_where = $group_id ? " AND group_id=".$group_id : '';
            $is_i_in = $this->mysql0-> getOne(array(
                'table'=>'t_act_user',
                'field'=>'count(*) num',
                'where'=>"AND act_id=$id AND openid='".$this->input['openid']."'".$group_where
            ));
	    $data['is_i_in']=$is_i_in['num']>0 ? 1 : 0;
	    if($data['is_i_in']>=1){
		    $i_act_info = $this->mysql0-> getOne(array(
			'table'=>'t_act_user',
			'field'=>'*',
			'where'=>"AND act_id=$id AND openid='".$this->input['openid']."'".$group_where
		    ));
		    $data['i']=[];
		    $data['i']['act_info']=$i_act_info;
	    }    
 
            $data['group'] = ['list'=>$act_group];
	    
 
	    if($group_id){
	        $user_data_one_group= $this->mysql0-> getAll(array(
	            
	            'table'=>'t_act_user',
	            'field'=>'*',
	            'where'=>"AND act_id=$id AND group_id=$group_id",
		    'order'=>"use_time ASC, create_time ASC",
	        ));
		foreach($user_data_one_group as $k=>&$u){
			$user_info= $this->mysql0-> getOne(array(
                    
                   	 'table'=>'t_user',
                	    'field'=>'*',
                    	'where'=>"AND openid='".$u['openid']."'"
                	));
			$u['user_info']=$user_info;
			$u['current_ranking']=$k+1;
		}
			
		$data['user_data_one_group'] = ['list'=>$user_data_one_group];
		$data['user_data_one_group']['is_finish']=$is_finish;
		
		$data['user_data_one_group']['is_award']=0;
		if(count($user_data_one_group)>=$this->act_limit_person){
			$data['user_data_one_group']['is_finish']=1;
			$data['user_data_one_group']['is_award']=1;
                }
	    }
	    
	    
	    $out = array(
	        'code'  =>'200',
	        'msg'=>"成功",
	        'data'=>$data
	    );
	    
	    ajaxJson($out);
	}
	
	
	public function insertOne(){
	    
        $this->load->mysqlDB('mysql0');
	    
	    $data = $this->input['_DATA'];
	   
        $this->mysql0->begin();
        
        $data['add_time'] = time();
        $data['end_time'] = 0;
	$description_pic=$data['description_pic'];
        unset($data['description_pic']);

	    //插入活动
        $return = $this->mysql0->insert([
            'table'=>'t_act',
            'data'=>$data,
	        'is_return_id'=>true,
        ]);

foreach($description_pic as $pic){
	            //插入图片
        $this->mysql0->insert([
            'table'=>'t_act_pic',
            'act_id'=>$return['id'],
            'data'=>[ 'pic'=>$pic, 'act_id'=>$return['id'] ],
        ]);
}

	    //插入活动分组
        for($i=0; $i<$data['num_group']; $i++){
            $this->mysql0->insert([
                'table'=>'t_act_group',
                'data'=>[
                    'act_id'=>$return['id'],
                    'person_need'=>( $data['num_person'] / $data['num_group'] ),
                ]
            ]);         
        }

	    $this->mysql0->commit();

	    $out = [
	        'code'  =>'200',
            'msg'=>"成功",
            'data'=>$return,
	    ];
       ajaxJson($out);

	}
        
	//插入用户拼图成绩
	public function insertUser(){
	    
	    $this->load->MysqlDB('mysql0');
	   
	    if(empty($this->input['_DATA'])){
                die('_DATA没有post过来');
            } 
	    $data = $this->input['_DATA'];
	    if(empty($data['act_id'])){
		die('act_id没有传过来');
            }
	    if(empty($data['group_id'])){
                die('group_id没有传过来');
            }
	    $act_id = $data['act_id'];
	    $group_id = $data['group_id'];
	   
	    $is_i_in = $this->mysql0-> getOne(array(
                'table'=>'t_act_user',
                'field'=>'count(*) num',
                'where'=>"AND act_id=".$act_id." AND openid='".$this->input['openid']."'"
            )); 
	    if($is_i_in['num']>0){
		
		$out = [
                	'code'=>'444',
                	'msg'=>'该拼图已经参加过了',
                	'data'=>[]
                ];

                ajaxJson($out);
	    }

            $this->mysql0->begin();


            $group_person = $this->mysql0-> getOne(array(
                'table'=>'t_act_user',
                'field'=>'count(*) num',
                'where'=>"AND group_id='".$group_id."'"
            ));

	    if($group_person['num']>=$this->act_limit_person){

                $out = [
                	'code'=>'444',
                	'msg'=>'该组拼图已经结束，你可以选择其他的参加',
                	'data'=>$return
            	];

            	ajaxJson($out);
            }

 
	     /*测试数据
	     $data =  [
	     'user_id'=>'2',//用户id
	     'wx_id' =>'dfd44',// 微信id,
	     'act_id' =>20,// 活动id
	     'group_id' =>1,//分组id
	     'use_time' =>333,// 用时
	     ];
	     */
	    $data['create_time'] = date('Y-m-d H:i:s',time());
	    $return = $this->mysql0->insert([
	        'table'=>'t_act_user',
	        'data'=>$data,
	        'is_return_id'=>true,
	    ]);
	   
	    $this_group_data = $this->mysql0-> getOne(array(
                'table'=>'t_act_group',
                'field'=>'end_time',
                'where'=>"AND id='".$group_id."'"
            ));
  
            $update_group_data = [];//当前分组开始计算结束时间
	    if($this_group_data['end_time']==0){
		$update_group_data[ 'add_time' ] = time(); 
		$update_group_data[ 'end_time' ] = 3600*3 + time();
	    }
	    $this->mysql0->update([
                'table'=>'t_act_group',
		'data'=>$update_group_data,
                'data_str'=>"person_has=person_has+'1'",
	 	'where'=>'AND id='.$group_id,
                'is_return_id'=>true,
            ]);
	   
	    //如果达到每组数量限制，开始计算奖金
	    if($group_person['num']==$this->act_limit_person-1){
            	$this->finishGroup(['act_id'=>$act_id, 'group_id'=>$group_id]);
            }


	    $out = [
	        'code'=>'200',
	        'msg'=>'成功',
	        'data'=>$return
	    ];
	    
        $this->mysql0->commit();
	    ajaxJson($out);
	}


function test(){

	    $this->load->mysqlDB('mysql0');
            $this->mysql0->update([
                'table'=>'t_act_group',
		'data'=>[],
                'data_str'=>"person_has=person_has+'1'",
                'where'=>'AND id=7',
                'is_return_id'=>true,
            ]); 

}

	public function finishGroup($param){
	    $act = $this->mysql0-> getOne(array(
                'table'=>'t_act',
                'field'=>'*',
                'where'=>"AND id=".$param['act_id'],
            ));

	    $is_list=0;
	    $end_time=0;//计算所发布的活动的结束时间，取值是：距离结束时间最长的分组的结束时间*********************可能存在事务上的缺陷
            $act_group = $this->mysql0->getAll([
                'table'=>'t_act_group',
                'field'=>'*',
                'where'=>"AND act_id=".$param['act_id'],
            ]);
	    foreach($act_group as $v){
		if($v['person_has']==0){
			$is_list = 1;
		}
		if($v['end_time']>$end_time){
			$end_time = $v['end_time'];
		}
	    }
	    


	    $act_user = $this->mysql0->getAll([
		'table'=>'t_act_user',
		'field'=>'*',
		'where'=>"AND group_id=".$param['group_id'],
		'order'=>"use_time ASC,create_time ASC"
	    ]);
	   
	     
	    foreach($act_user as $k=>$v){
		
		
		
		$data = [];
		
		$data['get_ranking']=$k+1;
		if($k==0){
		    $data['get_award']=$act['award_first'];
		}
		elseif($k==1){
			$data['get_award']=$act['award_two'];
		}
		elseif($k==2){
		  	$data['get_award']=$act['award_third'];
		}
		else{
			$data['get_award']=$act['award_all'];
		}
		//更新用户成绩和获奖
	    	$this->mysql0->update([
                	'table'=>'t_act_user',
                	'data'=>$data,
                	'where'=>'AND openid='.$this->input['openid'].' AND group_id='.$param['group_id'],
            	]);

	//如果金额小于等于0
		if($data['get_award']<=0){
			continue;
		}
		//更新用户金额	
				
	    $is_has_money_row = $this->mysql0-> getOne(array(
                'table'=>'t_user_money',
                'field'=>'id',
                'where'=>"AND openid=".$this->input['openid'],
            ));
	    	if($is_has_money_row){
		$this->mysql0->update([
                	'table'=>'t_user_money',
                	'data_str'=>'money=money+'.$data['get_award'],
                	'where'=>'AND openid='.$this->input['openid'],
            	]);
		}else{
		$this->mysql0->insert([
			'table'=>'t_user_money',
			'data'=>['money'=>$data['get_award']],
		]);
		}
		
		$money_log = [];
		$money_log['openid']=$this->input['openid'];
		$money_log['type']='IN';
		$money_log['money']=$data['get_award'];
		$money_log['add_time']=time();
	 	$money_log['memo']='act_id='.$param['act_id'].';group_id='.$param['group_id'].';领取拼图奖励';
	    	//插入金额记录
        	$return = $this->mysql0->insert([
            		'table'=>'t_user_moneylog',
            		'data'=>$money_log,
        	]);
	    }


	    $data = [ 'is_list'=>$is_list, 'end_time'=>$end_time ];
	    $this->mysql0->update([
                	'table'=>'t_act',
                	'data'=>$data,
                	'where'=>'AND id='.$param['act_id'],
            ]);
		
	}
	

	
}
