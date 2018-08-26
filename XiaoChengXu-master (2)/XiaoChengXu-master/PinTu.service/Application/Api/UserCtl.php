<?php

class User extends Ctl{
    
    
    /* 从mysql获得用户联系信息 */
    public function selectOne(){
        
        $this->load->mysqlDB('mysql0');
        
        $data = $this->mysql0-> getOne([
            'table'=>'t_user',
            'field'=>'*',
            'where'=>"AND openid = '".$this->input['openid']."'",
        ]);
        
        $out = array(
            'code'  =>'200',
            'msg'=>"成功",
            'data'=>[
                'info'=>$data,
            ]
        );
        
        ajaxJson($out);
    }
    
    //插入或改变用户信息
    public function updateOne(){
        
        $this->load->MysqlDB('mysql0');
        
        if(empty($this->input['_DATA'])){
            die('_DATA必须传过来，_DATA是json数据');
        }
        $data = $this->input['_DATA'];
        $data['openid'] = $this->input['openid'];
        $msg = '';
        
        if(!is_array($data)){
            $msg = '_DATA必须是json数组';
        }
        
        $is_has = $this->mysql0-> getOne([
            'table'=>'t_user',
            'field'=>'id',
            'where'=>"AND openid = '".$this->input['openid']."'",
        ]);
        
        if(!$is_has){
            
            $return = $this->mysql0->insert([
                'table'=>'t_user',
                'data'=>$data,
                'is_return_id'=>true,
            ]);
            
        } else{
            
            $return = $this->mysql0->update([
                'table'=>'t_user',
                'data'=>$data,
                'where'=>"AND openid = '".$this->input['openid']."'",
            ]);
        }
        
        if($return){
            $msg .= '成功';
        }else{
            $msg .= '失败';
        }
        
        $out = [
            'code'=>'200',
            'msg'=>$msg,
            'data'=>$return,
        ];
        
        ajaxJson($out);
    }

    
    //插入用户资金记录 修改用户余额
    public function insertUserMoneyLog(){
        $this->load->MysqlDB('mysql0');
        $data = $this->input['_DATA'];
        
        /*测试数据*/
        $data =  [
            'user_id'=>'2',//用户id
            'wx_id' =>'dfd44',// 微信id,
            'type' =>'IN',// 活动id
            'money' =>1,//金额
            'add_time' =>333,// 时间
        ];
        
        $this->mysql0->begin();
        
        /* 获得用户余额 */
        $user_money = $this->mysql0->select([
            'table'=>'t_user_money',
            'field'=>'*',
            'where'=>"AND wx_id='".$data['wx_id']."'",
            'limit'=>'0,1',
        ]);
        
        /* 得到更新后的余额 */
        $trans_money = 0;
        if($data['type'] == 'OUT'){
            $trans_money = - $data['money'];
        }else{
            $trans_money = $data['money'];
        }
        
        /* 修改用户余额 */
        $this->mysql0->update([
            'table'=>'t_user_moneylog',
            'data'=>['money'=>$trans_money],
            'where'=>"AND wx_id='".$data['wx_id']."'",
        ]);
        
        /* 插入资金记录 */
        $return = $this->mysql0->insert([
            'table'=>'t_user_moneylog',
            'data'=>$data,
            'is_return_id'=>true,
        ]);
        
        $this->mysql0->commit();
        
        $out = [
            'code'=>'200',
            'msg'=>'成功',
            'data'=>$return
        ];
        
        ajaxJson($out);
    }
}
