<?php

class Pay extends Ctl{
    
    public function get(){
        
        include_once(LIB_PATH."WxpayAPI_php_v3.0.1/lib/WxPay.Data.php");
        include_once(LIB_PATH."WxpayAPI_php_v3.0.1/lib/WxPay.Api.php");
        
        if(!$this->input['money']) die('we need money');
       
	$openid=$this->input['openid'];
        $money=$this->input['money'];
        
        $input = new WxPayUnifiedOrder();
        
        $input->SetBody("test");
        $input->SetAttach("test");
        $input->SetOut_trade_no(WxPayConfig::MCHID.date("YmdHis"));
        $input->SetTotal_fee($money*100);
        $input->SetTotal_fee(1);
        $input->SetTime_start(date("YmdHis"));
        $input->SetTime_expire(date("YmdHis", time() + 600));
        $input->SetGoods_tag("test");
        //$input->SetNotify_url("https://pintu.xizai.com/index.php?_C=Pay&_A=nt&openid=false");
        $input->SetNotify_url("https://pintu.xizai.com/nt.php");
        $input->SetTrade_type("JSAPI");
        $input->SetOpenid($openid);
        
        /* 
        Array
        (
            [appid] => wx3d00770652053edd
            [mch_id] => 1418910502
            [nonce_str] => 2ENnzsfydtmQWvgB
            [prepay_id] => wx2017123116382255906df98d0675899092
            [result_code] => SUCCESS
            [return_code] => SUCCESS
            [return_msg] => OK
            [sign] => 3C92C8502AECCE99BDC3CF6368C9977B
            [trade_type] => JSAPI
            ) */
        $order = WxPayApi::unifiedOrder($input);
	if($order['return_code']=='FAIL'){

			
		$out = [
		    'code'=>'444',
		    'msg'=>'success',
		    'data'=>[
			'info'=>$order
		    ],
		];
		
		ajaxJson($out);
	   
	}        
        $order['timeStamp'] = time();
        $order['package'] = "prepay_id=".$order["prepay_id"];
        $order['signType'] = 'MD5';
        $order['nonceStr'] = $order['nonce_str'];
        
        $str = 'appId='.$order['appid'].'&nonceStr='.$order['nonce_str'].'&package='.$order['package'].'&signType=MD5&timeStamp='.$order['timeStamp']."&key=t9RRtRNYJkL2Dfe6CwiKO27f128AsERs";
        $order['paySign'] = md5($str);
        

//18-01-22 ADD
//$order['paySign']=strtoupper($order['paySign']);


        unset($order['appid']);
        unset($order['key']);
        
        $out = [
            'code'=>'200',
            'msg'=>'success',
            'data'=>[
                'info'=>$order
            ],
        ];
        
        ajaxJson($out);
    }


    public function trans(){

        include_once(LIB_PATH."WxpayAPI_php_v3.0.1/lib/WxPay.Data.php");
        include_once(LIB_PATH."WxpayAPI_php_v3.0.1/lib/WxPay.Api.php");

        if(empty($this->input['money'])) die('we need money');

        $this->load->mysqlDB('mysql0');
//检查是否能体现
$user_money=$this->checkIsCan();


        $openid=$this->input['openid'];
        $money=$this->input['money'];


            /* 修改用户余额 */
            $this->mysql0->update([
                'table'=>'t_user_money',
                'data'=>['money'=>$user_money['money']-$money],
                'where'=>"AND openid='".$openid."'",
            ]);

            /* 插入资金记录 */
            $return = $this->mysql0->insert([
                'table'=>'t_user_moneylog',
                'data'=>[
			'openid'=>$openid,
			'type'=>'OUT',
			'money'=>$money,
			'add_time'=>$time,
			'memo'=>'用户提现'.$money.'元',
		],
                'is_return_id'=>true,
            ]);




//print_r($money);exit;
if($money>1000) {

        $out = [
            'code'=>'444',
            'msg'=>'超出提现金额范围',
            'data'=>[],
        ];
}        
//$input = new WxPayUnifiedOrder();

        //$input->SetBody("test");
        //$input->SetAttach("test");
       // $input->SetOut_trade_no(WxPayConfig::MCHID.date("YmdHis"));
       // $input->SetTotal_fee("1");
       // $input->SetTime_start(date("YmdHis"));
       // $input->SetTime_expire(date("YmdHis", time() + 600));
       // $input->SetGoods_tag("test");
       // $input->SetNotify_url("https://pintu.xizai.com/nt.php");
       // $input->SetTrade_type("JSAPI");
       //$input->SetOpenid($openid);

        /* 
        Array
        (
            [appid] => wx3d00770652053edd
            [mch_id] => 1418910502
            [nonce_str] => 2ENnzsfydtmQWvgB
            [prepay_id] => wx2017123116382255906df98d0675899092
            [result_code] => SUCCESS
            [return_code] => SUCCESS
            [return_msg] => OK
            [sign] => 3C92C8502AECCE99BDC3CF6368C9977B
            [trade_type] => JSAPI
            ) */

        //$order = WxPayApi::unifiedOrder($input);echo 4444;
        $param = array(
            'partner_trade_no' => WxPayConfig::MCHID.date("YmdHis"),
            'openid' => $openid,
            'check_name' => 'NO_CHECK',
            'amount' => $money*100, // 总计
            'desc' => '发一百亿元给陈端生',
        );
	
        $order = WxPayApi::payToUser($param);

	//print_r($param);	
	//print_r($order);exit;

        $out = [
            'code'=>'200',
            'msg'=>'success',
            'data'=>[],
        ];

        ajaxJson($out);
    }


public function checkIsCan(){
	        $openid= $this->input['openid'];
	        $money= $this->input['money'];

        $data = $this->mysql0-> getOne(array(
            'table'=>'t_user_money',
            'field'=>'*',
            'where'=>'AND openid="'.$openid.'"'
        ));
	if(!$data){
		        $out = [
            'code'=>'440',
            'msg'=>'没有余额',
            'data'=>[],
        ];

        ajaxJson($out);

	}
	if($data['money']<$money){
		        $out = [
            'code'=>'200',
            'msg'=>'余额不够',
            'data'=>[],
        ];

        ajaxJson($out);
	}

	return [ 'user_money'=>$data ];

}

    
    public function nt(){
        
        $content = implode('-|-', $_REQUEST);
        addLog([
            'content'=>$content,
            'file_name'=>'wx_money_notify',
        ]);
    }
}
