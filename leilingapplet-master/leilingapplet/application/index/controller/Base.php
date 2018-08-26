<?php
namespace app\index\controller;
use app\index\model\User as UserModel;
use think\Controller;
use think\Session;
use think\Exception;
use think\Config;
use think\Request;
use think\DefaultRedis;
class Base extends controller{
	public $redis;
	public $openid;
	public $userid;
	public $telephone;
	public $isreserver;
	public $istestdrive;
	public $order_id;
	public function __construct(){
		$this->redis = new DefaultRedis(); 
		$this->openid = input('param.openid');

		$this->isreserver = 0;
		$this->istestdrive = 0;
		if(!empty($this->openid)){
			$user = new UserModel;
			$userinfo = $user->alias('u')
							->join('submit_info submit', 'u.openid = submit.openid', 'LEFT')
							->join('order o', 'o.user_id = u.id', 'LEFT')
							->field('u.id, u.telephone, u.openid, o.id as order_id,o.status, o.createtime as ocreatetime, submit.createtime as screatetime, submit.id as submitinfo_id')
							->where("u.openid = '".$this->openid."'")
							->order('o.createtime desc, submit.createtime desc')
							->find();
			if(empty($userinfo)){
				$user->openid = $this->openid;
				$user->createtime = date('Y-m-d H:i:s');
				$user->last_login_time = date('Y-m-d H:i:s');
				$user->save();
				$this->userid = $user->id;
				$this->telephone = '';
			}else{
				$this->userid = $userinfo['id'];
				$this->telephone = $userinfo['telephone'];
				if(isset($userinfo['order_id']) && $userinfo['order_id'] > 0 && $userinfo['status'] > 0 && $userinfo['ocreatetime'] > date('Y-m-d H:i:s', strtotime(" -6 month") )){
					$this->isreserver = 1;
					$this->order_id = $userinfo['order_id'];
				}
				if(isset($userinfo['submitinfo_id']) && $userinfo['submitinfo_id'] > 0 && $userinfo['screatetime'] > date('Y-m-d H:i:s', strtotime(" -6 month") ))
					$this->istestdrive = 1;
			}
		}
	}
	public function isReserverTestDrive()
	{
		if($this->istestdrive == 1){
			$response['error'] = 1;
			$response['message'] = "试驾过,跳转试驾结果页面";
		}elseif($this->isreserver == 1){
			$response['error'] = 2;
			$response['order_id'] = $this->order_id;
			$response['message'] = "没试驾过,跳转预约结果页面";
		}else{
			$response['error'] = 0;
			$response['message'] = "没试驾过,没预约过";
		}
		exit(json_encode($response));
	}
}

