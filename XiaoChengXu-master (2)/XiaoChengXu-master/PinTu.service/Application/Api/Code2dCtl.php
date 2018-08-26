<?php

class Code2d extends Ctl{
	

    public function get(){

            $access_token = '5_ymviowwpQETMBJVpla1pn8PhIaYq1FnsholjIQ6wpzDU58ftk0Ww7xRbWvSwL4SJqkK5aLqreHwtl3iMSL9nlbiOgGW7DQDLVs_y0wupQ6I_ZA_Kma29si04GgFSlga9LAi-cK5ADljcBgojRCMdAIAYJT';
            
	    $access_token = $this->getAccessToken();
           
	    $data = $this->input['_DATA'];
	    $path = $data['path'];
	    //$path="pages/index?query=1";
	    //$scene = $data['scene'];
            $width=430;
	    $post_data='{"path":"'.$path.'","width":'.$width.'}';
	    $url="https://api.weixin.qq.com/wxa/getwxacode?access_token=".$access_token;
//print_r($url);
//print_r($post_data);exit;
	    $result=$this->api_notice_increment($url,$post_data);
	  // print_r($result);exit; 
	    $image_name = date('YmdHis',time()).time().rand(100000,999999).'.jpg';
	    file_put_contents(PIC_PATH.'code2d/'.$image_name, $result);
	    ajaxJson([
		'code'=>200,
		'msg'=>'success',
		'data'=>[  'info'=>['pic'=>'code2d/'.$image_name]  ],
	    ]);
    }


	public function getAccessToken(){
		$key = $GLOBALS['CURRENT_KEY']['TENCENT']['WX_XCX'];
        $appid = $key['appid'];
        $secret= $key['secret'];
		$url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$appid&secret=$secret";
		$result=$this->api_notice_increment($url,[]);
		$result = json_decode($result,true);
		return $result['access_token'];
	}

function api_notice_increment($url, $data){
    $ch = curl_init();
    $header = "Accept-Charset: utf-8";
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
   // curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; MSIE 5.01; Windows NT 5.0)');
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_AUTOREFERER, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $tmpInfo = curl_exec($ch);
    //     var_dump($tmpInfo);
    //    exit;
    if (curl_errno($ch)) {
      return false;
    }else{
      // var_dump($tmpInfo);
      return $tmpInfo;
    }
  }



        
    /* 从mysql获得数据 */
    public function selectOne(){
        
        $openid= $this->input['openid'];
        
        $this->load->mysqlDB('mysql0');
        $data = $this->mysql0-> getOne(array(
            'table'=>'t_user_money',
            'field'=>'*',
            'where'=>'AND openid="'.$openid.'"'
        ));
        
        
        $out = array(
            'code'  =>'200',
            'msg'=>"成功",
            'data'=>[
                'info'=>$data
            ]
        );
        
        ajaxJson($out);
    }
    
    public function test1(){
        echo 44;exit;
    }
    
    //插入用户资金记录 修改用户余额
    public function insertOne(){
        
        try{
            $this->load->MysqlDB('mysql0');
            $data = $this->input['_DATA'];
            
            /*测试数据*/
            $data =  [
                'user_id'=>'2',//用户id
                'wx_id' =>'dfd44',// 微信id,
                'type' =>'IN',// 活动id
                'money' =>2,//金额
                'add_time' =>333,// 时间
            ];
            
            $this->mysql0->begin();
            
            /* 获得用户余额 */
            $user_money = $this->mysql0->getOne([
                'table'=>'t_user_money',
                'field'=>'*',
                'where'=>"AND wx_id='".$data['wx_id']."'",
            ]);
            
            /* 如果没有则插入数据 */
            if(!$user_money){
                
                /* 插入资金记录 */
                $this->mysql0->insert([
                    'table'=>'t_user_money',
                    'data'=>[
                        'user_id'=>$data['user_id'],//用户id
                        'wx_id' =>$data['wx_id'],// 微信id,
                        'money' =>0,//金额,
                    ]
                ]);
                
                /* 获得用户余额 */
                $user_money = $this->mysql0->getOne([
                    'table'=>'t_user_money',
                    'field'=>'*',
                    'where'=>"AND wx_id='".$data['wx_id']."'",
                ]);
            }
            
            /* 得到更新后的余额 */
            $trans_money = 0;
            if($data['type'] == 'OUT'){
                $trans_money = $user_money['money'] - $data['money'];
            }else{
                $trans_money = $user_money['money'] + $data['money'];
            }
            
            /* 修改用户余额 */
            $this->mysql0->update([
                'table'=>'t_user_money',
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
        } catch (Exception $e){
            $this->mysql0->rollBack();
            print_r('异常信息：'.$e);exit;
        }

    }
    
}
