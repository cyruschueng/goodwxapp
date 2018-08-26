<?php 
namespace app\index\controller;
use app\index\model\User as UserModel;
use app\index\model\Order ;
use app\index\model\Province ;
use app\index\model\City ;
use app\index\model\Configuration;
use app\index\model\Dealer;
use app\index\model\OrderH5 ;
use app\index\model\CarModel ;
use app\index\model\SubmitInfo ;
use app\index\model\JdPassword;
use think\Session;
use think\Request;
use think\Cookie;
use think\Config;
class User extends Base{
	/**
	 * [reservation 预约]
	 * @return [type] [description]
	 */
	public function reservation()
	{
		$this->redis->databaseSelect('Sign');
		$orderid = input('param.orderid');


		$name = input('param.name');
		$gender = input('param.gender');//1男 2女
		$telephone = input('param.telephone');
		$verificationcode = input('param.verificationcode');
		$model_code = input('param.model_code');
		$model_name = input('param.model_name');
		$city = input('param.city');
		$openid = $this->openid;
		// $openid = input('param.openid');
		$dealer_id = input('param.dealer_id');
		$config_id = input('param.config_id');
		$car_model_id = input('param.car_model_id');
		$flag = input('param.flag');
		$response = array();
		if(empty($verificationcode)){
			do_log('add',$telephone,'验证码为空',$this->userid);
			$response['error'] = 1;
			$response['message'] = '验证码为空';
			exit(json_encode($response));
		}
		$telephonekey = 'verificationcode'.$telephone;
		if($verificationcode != $this->redis->get($telephonekey) && $verificationcode != -1){
			do_log('add',$telephone,'验证码不对' . "正确的验证码 ： " .$this->redis->get($telephonekey) . ",错误的验证码:" . $verificationcode ,$this->userid);
			$response['error'] = 1;
			$response['message'] = '验证码不对';
			exit(json_encode($response));
		}
		$user = new UserModel;

		if($car_model_id < 4){
			$this->dealreservation($flag, $telephone, $dealer_id, $openid, $model_code, 6, 1);
		}else{
			$this->dealreservation($flag, $telephone, $dealer_id, $openid, $model_code, 3, 2);
		}

		$dealer = new Dealer();
		$dealerinfo = $dealer->get(['id'=>$dealer_id]);
		$provincemodel = new Province();
		$provinceinfo = $provincemodel->get(['province_code'=>$dealerinfo['dealer_province_code']]);
		$province = $provinceinfo['province_name'];
		if($flag == "add"){
			$reuserid = $user->where('openid',$openid)->update([
			    'telephone'  => $telephone,
			    'nickename' => $name,
			    'city' => $city,
			    'province' => $province,
			    'gender' => $gender,
			    'last_login_time'=>date('Y-m-d H:i:s')
			]);
		}else{
			$reuserid = $user->where('openid',$openid)->update([
			    'telephone'  => $telephone,
			    'nickename' => $name,
			    'gender' => $gender,
			    'last_login_time'=>date('Y-m-d H:i:s')
			]);
		}
		

		if($reuserid < 1 || empty($reuserid)){
			$response['error'] = 1;
			if($flag == 'add'){
				do_log('adduser',$telephone,'录入用户预约信息出错' .",reuserid : " . $reuserid  .",openid :" . $openid . ",telephone : " . $telephone . ",nickname : " . $name . "city:" . $city . ",province : " . $province . ",gender:".$gender,$this->userid);
			}else{
				do_log('updateuser',$telephone .",openid :" . $openid . ",telephone : " . $telephone . ",nickname : " . $name . ",gender:".$gender,'更新用户预约信息出错',$this->userid);
			}
			$response['error'] = 3;
			$response['message'] = '出错了,请稍后再试';
			exit(json_encode($response));
		}
		$order = new Order();
		
		if(empty($orderid)){
			$order->user_id = $this->userid;
			$order->car_model_id = $car_model_id;
			$order->model_name = $model_name;
			$order->model_code = $model_code ;
			$order->province_code = $dealerinfo['dealer_province_code'];
			$order->city_code = $dealerinfo['dealer_city_code'] ;
			$order->dealer_id = $dealer_id;//4s门店id
			$order->config_id = $config_id;//配置id
			$order->createtime = date('Y-m-d H:i:s');
			$order->status = 1;
			$order->updatetime = date('Y-m-d H:i:s');
			$order->order_name = $name;
			$order->order_sex = $gender;
			$reorderid = $order->save();
			
		}else{
			$reorderid = $order->where('id',$orderid)->update([
			    'status' => 1,
			    'order_name' => $name,
			    'order_sex' => $gender,
			    'updatetime'=>date('Y-m-d H:i:s')
			]);

		}
		if($reorderid < 1 || empty($reorderid)){
			$userdelete = $user->get($reuserid);
			$userdelete->delete();
			do_log('addorder',$telephone,'录入用户预约订单信息出错'  . "openid : " .$openid ."reorderid : " . $reorderid  ,$this->userid);
			$response['error'] = 1;
			$response['message'] = '出错了,请稍后再试';
			exit(json_encode($response));
		}
		if($flag == 'add'){
			Cookie::set('equipment','1',3600*24*30*6);
			Cookie::set('is_order',$order->id, 3600*24*30*6);
		}
		do_log('add',$telephone,'用户预约成功',$this->userid);
		$response['error'] = 0;
		$response['message'] = '预约成功';
		if($flag == 'add'){
			$response['orderid'] = $order->id;
		}else{
			$response['orderid'] = $orderid;
		}
		exit(json_encode($response));
		
	}

	public function dealreservation($flag, $telephone, $dealer_id, $openid, $model_code, $month="6", $type = 1){
		if($month == 6){
			$retime = "半年";
		}elseif($month == 3){
			$retime = "3个月";
		}
		$month_where = "-" . $month . " month";
		if($type == 1){
			$car_mode_type =  " and o.car_model_id in ('1,2,3')";
		}elseif($type == 2){
			$car_mode_type =  " and o.car_model_id in ('5,6,7')";
		}
		$user = new UserModel;
		//设备唯一性判断
		// if($flag == 'add'){
		// 	if(Cookie::has('equipment') || Cookie::has('is_order')){
		// 		do_log('add',$telephone,'该设备已预订'.Cookie::get('is_order'),$this->userid);
		// 		$response['error'] = 2;
		// 		$response['message'] = '该设备已预约';
		// 		$response['orderid'] = Cookie::get('is_order');
		// 		exit(json_encode($response));
		// 	}
		// }
		//半年内不能重复试驾(手机号和时间来判断)openid
		//单个车型只能试驾一次(手机号和车型判断)openid
		
		$order = new Order();
		//一天允许10人预约
		$count_where = "createtime > '" . date('Y-m-d 00:00:00') . "' and status = 1 and dealer_id = " . $dealer_id;
		$count = $order->where($count_where)->count('id');
		if($count >= 10 ){
			do_log('add',$telephone,'一天内超过10人预约该4s店，拒绝该用户',$this->userid);
			$response['error'] = 1;
			$response['message'] = '该4s店今天预约次数已满,请更换其它4s店或者改日再来!';
			exit(json_encode($response));
		}
		$order_where = "( u.telephone = '" .$telephone. "' ";
		if($flag == "add"){
			$order_where .= "or u.openid  = '".$openid."'";
		}
		$order_where .= " )";
		$order_where .= "and (o.createtime > '" .date("Y-m-d H:i:s", strtotime($month_where)). "' or o.model_code = '" .$model_code. "') and (o.status > 0 ) " . $car_mode_type;

		$orderinfo = $order->alias('o')
						   ->join('user u', 'u.id = o.user_id')
		                   ->where($order_where)->find();

		if($flag == 'add'){
			if($orderinfo['id'] > 0 ){
				do_log('add',$telephone,'你之前' . $retime . '内预约过' . "select sql :" . $order->getLastSql(),$this->userid);
				$response['error'] = 2;
				$response['message'] = '你已经预约过了,请赶紧去试驾!';
				$response['orderid'] = $orderinfo['id'];
				exit(json_encode($response));
			}
		}else{
			if($orderinfo['id'] > 0 && $this->telephone != $telephone){
				do_log('add',$telephone,'你之前' . $retime . '内预约过' . "select sql :" . $order->getLastSql() ,$this->userid);
				$response['error'] = 2;
				$response['message'] = '你已经预约过了,请赶紧去试驾!';
				$response['orderid'] = $orderinfo['id'];
				exit(json_encode($response));
			}
		}
		if($type == 1){
			$orderh5 = new OrderH5();
			$orderh5_where = "( model_code = '" . $model_code . "' or create_time > '".date("Y-m-d H:i:s", strtotime($month_where))."') and (mobile = '".$telephone."')";
			$orderh5info = $orderh5->where($orderh5_where)->find();
			if($flag == 'add'){
				if($orderh5info['id'] > 0 ){
					do_log('add',$telephone,'你之前' . $retime . '内预约过' . "select sql : " .$orderh5->getLastSql(),$this->userid);
					$response['error'] = 2;
					$response['message'] = '你已经预约过了,请赶紧去试驾!';
					$response['orderid'] = $orderinfo['id'];
					exit(json_encode($response));
				}
			}else{
				if($orderh5info['id'] > 0 && $this->telephone != $telephone){
					do_log('add',$telephone,'你之前' . $retime . '内预约过' . "select sql : " .$orderh5->getLastSql() ,$this->userid);
					$response['error'] = 2;
					$response['message'] = '你已经预约过了,请赶紧去试驾!';
					exit(json_encode($response));
				}
			}

			$submitinfo = new SubmitInfo();
			$submitinfomation = $submitinfo->where('openid',$openid)->whereTime('createtime',$month_where)->find();
			// $submit_where = " submit.createtime > '" .date("Y-m-d H:i:s", strtotime("-6 month")). "' and submit.user_phone = '" .$telephone. "' and (o.status > 0 ) and u.openid != '".$openid."'";
			// $submitinfomation = $user->alias('u')
			// 					->join('submit_info submit', 'u.openid = submit.openid')
			// 					->join('order o', 'o.user_id = u.id')
			// 					->where($submit_where)
			// 					->find();
			if(!empty($submitinfomation)){
				do_log('add',$telephone,'你之前' . $retime . '内试驾过' . "select sql :" . $submitinfo->getLastSql(),$this->userid);
				$response['error'] = 2;
				$response['message'] = '你已经试驾过了!';
				exit(json_encode($response));
			}
		}

	}

	public function reservationInfomation()
	{
		$user = new UserModel;
		$openid = $this->openid;
		$orderid = input('param.orderid');
		$orderh5id = input('param.orderh5id');
		$order = new Order();
		$orderh5 = new OrderH5();
		if(!empty($orderid)){
			$orderinfo = $order->where('id',$orderid)->find();
		}
		// if(!empty($orderh5id)){
		// 	$orderinfo = $orderh5->where(['id'=>$orderh5id])->find();
		// }
		$userinfo = $user->where('openid',$openid)->find();

		$dealer = new Dealer();
		$dealerinfo = $dealer->get($orderinfo['dealer_id']);//4s店的地理信息详情
		$response['dealerinfo'] = $dealerinfo;

		$configuration = new Configuration();
		$configurationinfo = $configuration->get($orderinfo['config_id']);//车型配置
		$response['configurationinfo'] = $configurationinfo;
		
		$response['userinfo'] = $userinfo;
		$response['orderinfo'] = $orderinfo;
		exit(json_encode($response));
	}
	public function userLogin()
	{
		$this->redis->databaseSelect('Sign');
		$telephone = input('param.telephone');
		$openid = $this->openid;
		$city = input('param.city');
		$verificationcode = input('param.verificationcode');
		if(empty($verificationcode)){
			do_log('userLogin',$telephone,'验证码为空','0');
			$response['error'] = 1;
			$response['message'] = '验证码为空';
			exit(json_encode($response));
		}
		if(empty($openid)){
			do_log('userLogin',$telephone,'openid为空','0');
			$response['error'] = 1;
			$response['message'] = '出错了';
			exit(json_encode($response));
		}
		$user = new UserModel;
		// $userinfo = $user->where('openid',$openid)->find();
		// $this->userid = $userinfo['id'];
		$telephonekey = 'verificationcode' . $telephone;
		if($verificationcode != $this->redis->get($telephonekey)){
			do_log('userLogin',$telephone,'验证码不对',$this->userid);
			$response['error'] = 1;
			$response['message'] = '验证码不对';
			exit(json_encode($response));
		}
		$orderh5 = new OrderH5();
		if($telephone != $this->telephone){
			$userinfocheck = $user->where('telephone',$telephone)->whereTime('createtime','-6 month')->find();
			if(!empty($userinfocheck)){
				do_log('userLogin',$telephone,'该手机号半年内试驾过' . "select sql : " . $user->getLastSql(),$this->userid);
				$response['error'] = 1;
				$response['message'] = '该手机号半年内试驾过';
				exit(json_encode($response));
			}
			$orderh5check = $orderh5->where('mobile',$telephone)->whereTime('create_time', '-6 month')->find();
			if(!empty($orderh5check)){
				do_log('userLogin',$telephone,'该手机号半年内试驾过' . "select sql : " . $orderh5->getLastSql() ,$this->userid);
				$response['error'] = 1;
				$response['message'] = '该手机号半年内试驾过';
				exit(json_encode($response));
			}
			$submit_where = " submit.createtime > '" .date("Y-m-d H:i:s", strtotime("-6 month")). "' and submit.user_phone = '" .$telephone. "' and (o.status > 0 ) and u.openid != '".$openid."'";
			$submitinfomation = $user->alias('u')
							->join('submit_info submit', 'u.openid = submit.openid')
							->join('order o', 'o.user_id = u.id')
							->where($submit_where)
							->find();
			if(!empty($submitinfomation)){
				do_log('add',$telephone,'你之前半年内试驾过' . ",select sql : " . $user->getLastSql(),$this->userid);
				$response['error'] = 1;
				$response['message'] = '你已经试驾过了!';
				exit(json_encode($response));
			}				
		}
		$uid = $user->where('openid',$openid)->update([
		    'telephone'  => $telephone,
		    'city' => $city,
		    'last_login_time'=>date('Y-m-d H:i:s')
		]);
		
		if($uid < 1 || empty($uid)){
			do_log('userLogin',$telephone,'登录失败' . ",openid :" . $openid . ",telephone : " . $telephone . ",city : " . $city  ,$this->userid);
			$response['error'] = 1;
			$response['message'] = '登录失败';
			exit(json_encode($response));
		}else{
			do_log('userLogin',$telephone,'登陆成功',$this->userid);
			$response['error'] = 0;
			$response['message'] = '登陆成功';
			exit(json_encode($response));
		}

	}
	/**
	 * [rereservation 重新预约]
	 * @return [type] [description]
	 */
	public function rereservation(){
		$orderid = input('param.orderid');//预约订单id
		$order = new Order();
		$response = array();
		$id = $order->save([
			'status'=>0
			],['id'=>$orderid]);
		if($id > 0){
			Cookie::delete('equipment');
			$response['cookie'] = Cookie::get('equipment');
			$response['error'] = 0;
			$response['message'] = "重新预约成功";
		}else{
			$response['error'] = 1;
			$response['message'] = "重新预约失败";
		}
		exit(json_encode($response));
	}
	/**
	 * [editreservation 预约信息修改]
	 * @return [type] [description]
	 */
	public function editreservation(){
		$openid = $this->openid;
		$user = new UserModel;
		$userinfo = $user->where('openid',$openid)->find();
		if(empty($userinfo)){
			$response['error'] = 1;
			$response['message'] = '出错了,请稍后再试';
		}else{
			$response['error'] = 0;
			$response['userinfo'] = $userinfo;
		}
		exit(json_encode($response));
	}
	/**
	 * [CreateVerificationCode 创建验证码]
	 */
	public function CreateVerificationCode()
	{
		$telephone = input('param.telephone');
		$verificationcode = rand(1000,9999);
		$this->redis->databaseSelect('Sign');
		$key = 'verificationcode' . $telephone;
		$this->redis->set($key,$verificationcode, 60*5);
		//短信发送验证码
		// $res = send_msg($telephone,$verificationcode);
		$res = send_msg_aliyun($telephone,strval($verificationcode));
		
		if(strpos($res, 'ok') !== false){
			//成功
			$response['verifycode'] = $verificationcode;
			exit(json_encode($response));
		}else{
			//失败
			$response['verifycode'] = 0;
			exit(json_encode($response));
		}
		// $response['verifycode'] = $verificationcode;
		// exit(json_encode($response));
	}

	/**
	 * [authcode 生成accesstoken]
	 * @param  [type]  $string    [description]
	 * @param  string  $operation [description]
	 * @param  string  $key       [description]
	 * @param  integer $expiry    [description]
	 * @return [type]             [description]
	 */
	public function authcode($string, $operation = 'DECODE', $key = '', $expiry = 0) {   
	    // 动态密匙长度，相同的明文会生成不同密文就是依靠动态密匙   
	    $ckey_length = 4;   
	       
	    // 密匙   
	    $key = md5($key ? $key : $GLOBALS['discuz_auth_key']);   
	       
	    // 密匙a会参与加解密   
	    $keya = md5(substr($key, 0, 16));   
	    // 密匙b会用来做数据完整性验证   
	    $keyb = md5(substr($key, 16, 16));   
	    // 密匙c用于变化生成的密文   
	    $keyc = $ckey_length ? ($operation == 'DECODE' ? substr($string, 0, $ckey_length): 
	substr(md5(microtime()), -$ckey_length)) : '';   
	    // 参与运算的密匙   
	    $cryptkey = $keya.md5($keya.$keyc);   
	    $key_length = strlen($cryptkey);   
	    // 明文，前10位用来保存时间戳，解密时验证数据有效性，10到26位用来保存$keyb(密匙b)， 
	//解密时会通过这个密匙验证数据完整性   
	    // 如果是解码的话，会从第$ckey_length位开始，因为密文前$ckey_length位保存 动态密匙，以保证解密正确   
	    $string = $operation == 'DECODE' ? base64_decode(substr($string, $ckey_length)) :  
	sprintf('%010d', $expiry ? $expiry + time() : 0).substr(md5($string.$keyb), 0, 16).$string;   
	    $string_length = strlen($string);   
	    $result = '';   
	    $box = range(0, 255);   
	    $rndkey = array();   
	    // 产生密匙簿   
	    for($i = 0; $i <= 255; $i++) {   
	        $rndkey[$i] = ord($cryptkey[$i % $key_length]);   
	    }   
	    // 用固定的算法，打乱密匙簿，增加随机性，好像很复杂，实际上对并不会增加密文的强度   
	    for($j = $i = 0; $i < 256; $i++) {   
	        $j = ($j + $box[$i] + $rndkey[$i]) % 256;   
	        $tmp = $box[$i];   
	        $box[$i] = $box[$j];   
	        $box[$j] = $tmp;   
	    }   
	    // 核心加解密部分   
	    for($a = $j = $i = 0; $i < $string_length; $i++) {   
	        $a = ($a + 1) % 256;   
	        $j = ($j + $box[$a]) % 256;   
	        $tmp = $box[$a];   
	        $box[$a] = $box[$j];   
	        $box[$j] = $tmp;   
	        // 从密匙簿得出密匙进行异或，再转成字符   
	        $result .= chr(ord($string[$i]) ^ ($box[($box[$a] + $box[$j]) % 256]));   
	    }   
	    if($operation == 'DECODE') {  
	        // 验证数据有效性，请看未加密明文的格式   
	        if((substr($result, 0, 10) == 0 || substr($result, 0, 10) - time() > 0) &&  
	substr($result, 10, 16) == substr(md5(substr($result, 26).$keyb), 0, 16)) {   
	            return substr($result, 26);   
	        } else {   
	            return '';   
	        }   
	    } else {   
	        // 把动态密匙保存在密文里，这也是为什么同样的明文，生产不同密文后能解密的原因   
	        // 因为加密后的密文可能是一些特殊字符，复制过程可能会丢失，所以用base64编码   
	        return $keyc.str_replace('=', '', base64_encode($result));   
	    }   
	}

	/**
	 * [testDrive 试驾完成]
	 * @return [type] [description]
	 */
	public function testDrive()
	{
		$orderid = input('param.orderid');
		$response = array();
		$staff_name = input('param.staff_name');
		$staff_phone = input('param.staff_phone');
		$user_phone = input('param.user_phone');
		$openid = $this->openid;
		$img = input('param.img');
		if($orderid < 1 || empty($orderid )){
			do_log('testDrive',$user_phone,'获取orderid出错' . ",orderid : ". $orderid,$this->userid);
			$response['error'] = 1;
			$response['message'] = '出错了,请稍后再试';
			exit(json_encode($response));
		}
		$order = new Order();
		$orderstatus = $order->where('id', $orderid)->field('status')->find();
		if( $orderstatus['status'] > 1){
			do_log('testDrive',$user_phone,'你已经提交过试驾信息了' . ",orderstatus: " . $orderstatus['status'],$this->userid);
			$response['error'] = 2;
			$response['message'] = '您已经提交过试驾信息了';
			exit(json_encode($response));
		}
		$submitinfo = new SubmitInfo();
		$submitinfo->staff_name = $staff_name;
		$submitinfo->openid = $openid;
		$submitinfo->staff_phone = $staff_phone;
		$submitinfo->user_phone = $user_phone;
		$submitinfo->img = $img;
		$submitinfo->createtime = date('Y-m-d H:i:s');
		$submitinfo->save();
		if($submitinfo->id < 1 || empty($submitinfo->id) ){
			do_log('testDrive',$user_phone,'试驾完成信息提交出错' . ",submitinfoid ：" . $submitinfo->id,$this->userid);
			$response['error'] = 1;
			$response['message'] = '出错了,请稍后再试';
			exit(json_encode($response));
		}

		$id = $order->save([
			'status'=>2
			],['id'=>$orderid]);
		if( ( $id < 1 || empty($id)) && $id !== 0 ){
			$submitinfo->delete();
			do_log('testDrive',$user_phone,'试驾完成信息更新订单出错' . "oderid : " .$id, $this->userid);
			$response['error'] = 1;
			$response['message'] = '出错了,请稍后再试';
			exit(json_encode($response));
		}
		do_log('testDrive',$user_phone,'试驾完成信息提交成功',$this->userid);
		$response['error'] = 0;
		$response['message'] = '信息提交成功';
		exit(json_encode($response));
	}
	/**
	 * [testDriveInfomation 试驾结果显示]
	 * @return [type] [description]
	 */
	public function testDriveInfomation()
	{
		$openid = $this->openid;
		$response =array();
		$submitinfo = new SubmitInfo();
		$submitinfomation = $submitinfo->where('openid',$openid)->whereTime('createtime','-6 month')->order('id Desc')->find();
		$response['submitinfo'] = $submitinfomation;

		$user = new UserModel();
		$userinfo = $user->where('openid',$openid)->whereTime('createtime','-6 month')->find();
		$user_id = $userinfo['id'];
		$telephone = $userinfo['telephone'];

		$dealer = new Dealer();
		$order = new Order();
		$orderinfo = $order->where('user_id',$user_id)->where('status', '>',0)->whereTime('createtime','-6 month')->order('id Desc')->find(); 
		$jdpassword = new JdPassword();
		if(!empty($orderinfo)){

			$response['submitinfo']['model_name'] = $orderinfo['model_name'];
			$dealerinfo = $dealer->where('id', $orderinfo['dealer_id'])->find();
			$response['submitinfo']['dealername'] = $dealerinfo['dealer_name'];
			if($orderinfo['status'] == 2){
				$response['activityresult']['message'] = "感谢您的参与，审核结果将在5个工作日内公布，请耐心等候~";
				$response['activityresult']['status'] = 2;
			}elseif($orderinfo['status'] == 3){
				$response['activityresult']['message'] = "感谢您的参与，审核结果将在5个工作日内公布，请耐心等候~";
				$response['activityresult']['status'] = 3;
			}elseif($orderinfo['status'] == 4){
				$jdpasswordinfo = $jdpassword->where('orderid',$orderinfo['id'])->find();
				$response['activityresult']['message'] = "恭喜您，您的奖品京东卡卡密为:".$jdpasswordinfo['password']."，请尽快使用，感谢您的参与~";
				$response['activityresult']['status'] = 4;
			}elseif($orderinfo['status'] == 5){
				$response['activityresult']['message'] = "很遗憾，您没有通过审核。原因可能是照片不合格、没有领券信息、电话号码不一致、未核实到有试驾等，敬请期待后续活动~";
				$response['activityresult']['status'] = 5;
			}
			exit(json_encode($response));
		}
		$orderh5 = new OrderH5();
		$orderh5info = $orderh5->where(['mobile'=>$telephone])->whereTime('create_time','-6 month')->order('id Desc')->find();
		if(!empty($orderh5info)){
			$response['submitinfo']['model_name'] = $orderh5info['model_name'];
			$response['submitinfo']['dealername'] = "";
			if($orderh5info['status'] == 1){
				$jdpasswordinfo = $jdpassword->where('orderh5id',$orderh5info['id'])->where('status', 1)->find();
				$response['activityresult']['message'] = "恭喜您，您的奖品京东卡卡密为：".$jdpasswordinfo['password']."，感谢您的参与~";
				$response['activityresult']['status'] = 4;
			}else{
				$response['activityresult']['message'] = "感谢您的参与，审核结果将在5个工作日内公布，请耐心等候~";
				$response['activityresult']['status'] = 3;
			}
			exit(json_encode($response));
		}
	}

	/**
	 * [getUserOpenid 获取openid]
	 * @return [type] [description]
	 */
	public function getUserOpenid()
	{
		$code = input('param.code');
		$appid = config('applet.appid');
		$secret = config('applet.secret');
		$api_url = "https://api.weixin.qq.com/sns/jscode2session?appid=" .$appid. "&secret=" .$secret. "&js_code=" .$code. "&grant_type=authorization_code";
		$res = json_decode($this->curlGet($api_url));
		if(!empty($res->errcode)){
			$res->error = 1;
		}else{
			$res->error = 0;
		}
		exit(json_encode($res));
	}
	/**
	 * [firstLogin 第一次登录]
	 * @return [type] [description]
	 */
	public function firstLogin()
	{
		$openid = $this->openid;
		$user = new UserModel();
		$userinfo = $user->where('openid',$openid)->find();
		if(!empty($userinfo)){
			$response['error'] = 0;
			$response['message'] = '登陆成功';
			exit(json_encode($response));
		}
		$user->openid = $openid;
		$user->createtime = date('Y-m-d H:i:s');
		$user->last_login_time = date('Y-m-d H:i:s');
		$user->save();
		if($user->id < 1 || empty($user->id)){
			$response['error'] = 1;
			$response['message'] = '出错了';
		}else{
			$response['error'] = 0;
			$response['message'] = '登陆成功';
		}
		exit(json_encode($response));
	}
	public function uploadAnotherFile()
	{
		$absolute_uploads_dir = UPLOAD_DEFAULT_DIR;
		$url = $_POST['url'];
		$filename = $_POST['filename'];
		$res = $this->GrabImage($url,$filename, $absolute_uploads_dir);
		if($res){
			echo 1;
		}else{
			echo 0;
		}
	}
	//URL是远程的完整图片地址，不能为空, $filename 是另存为的图片名字 
	//默认把图片放在以此脚本相同的目录里 
	public function GrabImage($url, $filename="", $path=""){ 
		// //$url 为空则返回 false; 
		// if($url == ""){return false;} 
		// $ext = strrchr($url, ".");//得到图片的扩展名 
		// if($ext != ".gif" && $ext != ".jpg" && $ext != ".bmp"){echo "格式不支持！";return false;} 
		// if($filename == ""){$filename = time()."$ext";}//以时间戳另起名 
		//开始捕捉 
		ob_start(); 
		readfile($url); 
		$img = ob_get_contents(); 
		ob_end_clean(); 
		$size = strlen($img); 
		$fp2 = fopen($path.$filename , "a"); 
		$res = fwrite($fp2, $img); 
		fclose($fp2); 
		return $res; 
	} 
	
	public function curlGet($url,$timeout = 3, $type = 1, $filename = "", $servername = "")
	{ 
		if($type == 2){
			$data = array(
				'url'=>$url,
				'filename'=>$filename,
			);
		}
		$ch = curl_init();
		if($type == 2 ){
			$curl_url = "http://" .$servername. ":8080/leilingapplet/public/index.php/index/User/uploadAnotherFile/";
			curl_setopt($ch, CURLOPT_URL, $curl_url);
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $data); 
		}else{
			curl_setopt($ch, CURLOPT_URL, $url);
		}
    	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);    // 要求结果为字符串且输出到屏幕上
    	curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);
   	 	curl_setopt($ch, CURLOPT_HEADER, 0); // 不要http header 加快效率
		$output = curl_exec($ch);
		curl_close($ch);
		return $output; 
	}	
	public function uploadFile(){
		$serverNames = array(//要上传的服务器地址数组
			array(
				'internal' => '10.27.116.96',
				'external' =>'120.55.170.151'
				),
			array(
				'internal' => '10.165.95.95',
				'external' =>'139.224.60.230'
				),
		);
		$self_serverip = $_SERVER["SERVER_ADDR"];//本服务器内网ip地址
		$absolute_uploads_dir = UPLOAD_DEFAULT_DIR;
		$file = $_FILES['file']['name'];
		$filetype = pathinfo($file, PATHINFO_EXTENSION);
    	$mimetype = exif_imagetype($_FILES['file']['tmp_name']);

		if (!($mimetype == IMAGETYPE_GIF || $mimetype == IMAGETYPE_JPEG || $mimetype == IMAGETYPE_PNG || $mimetype == IMAGETYPE_BMP))
		{
			$response['error'] = 1;
			$response['message'] = "请上传图片文件格式";
            exit(json_encode($response));
		}
    	//判断图片尺寸
    	// list($width, $height, $type, $attr) = getimagesize($_FILES["file"]["tmp_name"]);
    	// if( $height != 200 || $width != 200){
    	// 	$response['error'] = 9;
    	// 	echo json_encode($response);
    	// 	exit;
    	// }
		$rand = rand(100000,999999);
		$filename =  "APPLET".date('Ymd',time()).$rand. "." .$filetype;
		$absolute_store_upload_filename 	= $absolute_uploads_dir . $filename;
		$res = move_uploaded_file($_FILES["file"]["tmp_name"],$absolute_store_upload_filename);
		if($res){
			$url =  'http://'.$self_serverip.":8080/ltb_static_files/levin/img/".$filename;
			foreach ($serverNames as $k => $v) {
				if($v['internal'] != $self_serverip){
					$return = $this->curlGet($url,3,2,$filename,$v['external']);
				}
			}
			if($return == 1){
				$response['error'] 		= 0;
				$response['filename'] 	= $filename;
			}else{
				$response['error'] = 1;
				$response['message'] = "上传失败";
			}
			
		}else{
			$response['error'] = 1;
			$response['message'] = "上传失败";
		}	 
    	exit(json_encode($response));
	}
	/**
	 * [getlocation 根据经纬度获取地址]
	 * @return [type] [description]
	 */
	public function getlocation(){
		$longitude = input('param.longitude');
		$latitude = input('param.latitude');
		$txmapapi = "http://apis.map.qq.com/ws/geocoder/v1/?location=" .$latitude. "," .$longitude. "&key=DL3BZ-YH3WS-25XO2-6LIMA-FBNYJ-TSBD5";
		$res = json_decode($this->curlGet($txmapapi));
		// var_dump($res->result->address_component->city);
		exit;
	}
	/**
	 * [getProvince 获取所有的省份]
	 * @return [type] [description]
	 */
	public function getProvinceback(){
		$advancedprovinces = array(
			array('id'=>'', 'province_name'=>'热门', 'province_code'=>'000000', 'status'=>'2'),
			array('id'=>'28', 'province_name'=>'山东省', 'province_code'=>'063001', 'status'=>'1'),
			array('id'=>'12', 'province_name'=>'广东省', 'province_code'=>'060002', 'status'=>'1'),
			array('id'=>'29', 'province_name'=>'江苏省', 'province_code'=>'064001', 'status'=>'1'),
			array('id'=>'3', 'province_name'=>'辽宁省', 'province_code'=>'057003', 'status'=>'1'),
			array('id'=>'4', 'province_name'=>'北京市', 'province_code'=>'058001', 'status'=>'1'),
			array('id'=>'30', 'province_name'=>'上海市', 'province_code'=>'064002', 'status'=>'1'),
			array('id'=>'', 'province_name'=>'A-Z', 'province_code'=>'000000', 'status'=>'2'),
		);
		$response = array();
		krsort($advancedprovinces);
		$advancedprovincesname = array('山东省','广东省','江苏省','辽宁省','北京市','上海市');
		$province = new Province();
		$provinceinfo = $province->all(['status'=>1]);
		foreach ($provinceinfo as $key => $value) {
			if('重庆市' == $value['province_name']){
				$provinceinfoaar['CQS'] = $value;
			}else{
				$provinceinfoaar[get_pinyin($value['province_name'])] = $value;
			}
		}
		ksort($provinceinfoaar);
		foreach ($provinceinfoaar as $prokey => $val) {
			if(in_array( $val['province_name'], $advancedprovincesname )){
				unset($provinceinfoaar[$prokey]);
			}
		}
		foreach ($advancedprovinces as $adkey => $adval) {
			array_unshift($provinceinfoaar, $adval);
		}
		foreach ($provinceinfoaar as $key => $provinceinfoval) {
			$response[] = $provinceinfoval;
		}
		exit(json_encode($response));
	}

	public function getProvince(){
		$advancedprovinces = array(
			array('id'=>'', 'province_name'=>'热门', 'province_code'=>'000000', 'status'=>'2'),
			array('id'=>'28', 'province_name'=>'山东省', 'province_code'=>'063001', 'status'=>'1'),
			array('id'=>'12', 'province_name'=>'广东省', 'province_code'=>'060002', 'status'=>'1'),
			array('id'=>'29', 'province_name'=>'江苏省', 'province_code'=>'064001', 'status'=>'1'),
			array('id'=>'3', 'province_name'=>'辽宁省', 'province_code'=>'057003', 'status'=>'1'),
			array('id'=>'4', 'province_name'=>'北京市', 'province_code'=>'058001', 'status'=>'1'),
			array('id'=>'30', 'province_name'=>'上海市', 'province_code'=>'064002', 'status'=>'1'),
			array('id'=>'', 'province_name'=>'A-Z', 'province_code'=>'000000', 'status'=>'2'),
		);
		$response = array();
		$provinceinfomation = array();
		$cityinfomation = array();
		krsort($advancedprovinces);
		$advancedprovincesname = array('山东省','广东省','江苏省','辽宁省','北京市','上海市');
		$province = new Province();
		$provinceinfo = $province->all(['status'=>1]);
		foreach ($provinceinfo as $key => $value) {
			if('重庆市' == $value['province_name']){
				$provinceinfoaar['CQS'] = $value;
			}else{
				$provinceinfoaar[get_pinyin($value['province_name'])] = $value;
			}
		}
		ksort($provinceinfoaar);
		foreach ($provinceinfoaar as $prokey => $val) {
			if(in_array( $val['province_name'], $advancedprovincesname )){
				unset($provinceinfoaar[$prokey]);
			}
		}
		foreach ($advancedprovinces as $adkey => $adval) {
			array_unshift($provinceinfoaar, $adval);
		}
		foreach ($provinceinfoaar as $key => $provinceinfoval) {
			$provinceinfomation[] = $provinceinfoval;
		}
		$response['province'] = $provinceinfomation;

		$dealer = new Dealer();
		$dealerinfo = $dealer->distinct(true)->field('dealer_city_code')->select();//4s店的地理信息详情
		$dealercitycode = array();
		foreach($dealerinfo as $dealerkey => $dealervalue) {
			$dealercitycode[] = $dealervalue['dealer_city_code'];
		}

		$city = new City();

		foreach ($provinceinfomation as $prokey => $proval) {
			$cityinfo = array();
			$cityinfo = $city->where('city_code', 'like', $proval["province_code"].'%')->where('status', 1)->select();
			$cityrealinfo = array();
			//去除市里没有4s店的
			foreach($cityinfo as $citykey => $cityvalue) {
				if(in_array($cityvalue['city_code'], $dealercitycode)){
					$cityrealinfo[] = $cityvalue;
				}
			}
			$cityinfomation[$proval['province_code']] = $cityrealinfo;
		}
		$response['city'] = $cityinfomation;
		exit(json_encode($response));
	}

	/**
	 * [getCity 根据省代码获取市]
	 * @return [type] [description]
	 */
	public function getCity(){
		$provincecode = input('param.provincecode');
		$city = new City();
		$cityinfo = $city->where('city_code', 'like', $provincecode.'%')->where('status', 1)->select();
		$dealer = new Dealer();
		$dealerinfo = $dealer->distinct(true)->field('dealer_city_code')->select();//4s店的地理信息详情
		$dealercitycode = array();
		foreach($dealerinfo as $dealerkey => $dealervalue) {
			$dealercitycode[] = $dealervalue['dealer_city_code'];
		}
		$cityrealinfo = array();
		//去除市里没有4s店的
		foreach($cityinfo as $citykey => $cityvalue) {
			if(in_array($cityvalue['city_code'], $dealercitycode)){
				$cityrealinfo[] = $cityvalue;
			}
		}
		// ksort($cityinfo);
		exit(json_encode($cityrealinfo));
	}

	public function getdealerinfoAfterAuth()
	{
		$longitude = input('param.longitude');
		$latitude = input('param.latitude');
		$url = "http://apis.map.qq.com/ws/geocoder/v1/?location=".$latitude.",".$longitude."&key=SYUBZ-2CYCJ-AUZFF-FGHIE-SFMCO-UEBWY&get_poi=1";
		$res = json_decode($this->curlGet($url,1));
		if(!empty($res->result->address_component->city)){
			$city = $res->result->address_component->city;
			$cityModel = new City();
			$cityinfo = $cityModel->where('city_name', 'like', "%" .$city. "%")->find();
			$citycode = $cityinfo['city_code'];
			$dealer = new Dealer();
			$dealerinfo = array();
			$dealerinfotmp = $dealer->all(['dealer_city_code'=>$citycode]);//4s店的地理信息详情
			foreach ($dealerinfotmp as $dealkey => $dealvalue) {
				if(strpos($dealvalue, ',') !== false){
					$tel_arr = array();
					$tel_arr = explode(',', $dealvalue['tel']);
					$dealvalue['tel'] = $tel_arr['0'];
				}
				$dealerinfo[] = $dealvalue;
			}
			$response['error'] = 0;
			$response['dealerinfo'] = $dealerinfo;
			$response['city'] = $city;
			exit(json_encode($response));
		}
		$response['error'] = 1;
		$response['dealerinfo'] = 0;
		exit(json_encode($response));
	}
	/**
	 * [getLocationInfo 获取客户端位置]
	 * @return [type] [description]
	 */
	public function getLocationInfo(){
		$request = Request::instance();
	   	$ip = $request->ip(0, true);  //get_client_ip()为tp自带函数，如没有，自己百度搜索。此处就不重复复制了
	    $result = $this->get_user_district($ip);
	    exit(json_encode($result));
	}
	public function get_user_district($user_ip)
    {        
        $this->redis->databaseSelect('Ip');
         if ($this->redis->existsRedis("Ip:" . $user_ip)) {
             $res = $this->redis->hget("Ip:" . $user_ip);
             $special_map_arr = ['闽' => '福建'];
             foreach ($special_map_arr as $k => $v) {
                 //特殊替换
                 if ($k == $res['province']) $res['province'] = $v;
             }
             $res['error'] = 0;
         } else {
            //设置file_get_contents 超时时间
            $opts = array(
                'http' => array(
                    'method' => "GET",
                    'timeout' => 3,  
                )
            );
            //从百度ip获取
            $res_baidu = json_decode(file_get_contents("https://api.map.baidu.com/location/ip?ip=" . $user_ip . "&ak=E9FAeIguIYQe6M0NcYxEUpMb", false, stream_context_create($opts)), true);
            if (!empty($res_baidu['content']['address_detail']['province']) && !empty($res_baidu['content']['address_detail']['city'] ) ) {
                // $res = array('province' => '', 'city' => '');
            	$res['error'] = 0;
                $res['province'] = $res_baidu['content']['address_detail']['province'];
                $res['city'] = $res_baidu['content']['address_detail']['city'];

            } else {
            	$res['error'] = 1;
            	$res['message'] = "未定位";
            }
        }
        return $res;
    }

}
