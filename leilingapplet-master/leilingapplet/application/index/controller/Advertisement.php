<?php
namespace app\index\controller;
use app\index\model\Advertisement as AdvertisementModel;
use app\index\model\CarModel ;
use app\index\model\User as UserModel;
use app\index\model\Order ;
use app\index\model\OrderH5 ;
class Advertisement extends Base{

	public function getAdvertisement()
	{
		$advertisement = new AdvertisementModel();
		$advertisementinfo = $advertisement->select();
		
		$pastadvertisementinfo = array_slice($advertisementinfo, 0, 3);
		$nowadvertisementinfo = array_slice($advertisementinfo, 3, 3);
		$response = array();
		$response['telephone'] = $this->telephone;
		if(empty($this->userid)){
			do_log('getAdvertisement','','获取openid出错',0);
			$response['error'] = 1;
			$response['message'] = '出错了,请稍后再试';
			exit(json_encode($response));
		}
		$user_id = $this->userid;
		$telephone = $this->telephone;
		$order = new Order();
		$car = new CarModel();
		$pastorderinfo = $order->where('user_id',$user_id)->where('status', '>',0)->whereTime('createtime','-6 month')->where('car_model_id', 'in', '1,2,3')->find();
		$noworderinfo = $order->where('user_id',$user_id)->where('status', '>',0)->whereTime('createtime','-3 month')->where('car_model_id', 'in', '5,6,7')->find();
		$hashistory = 0;
		$res = $this->dealAdvertisement($pastadvertisementinfo, $pastorderinfo, $hashistory);
		$pastadvertisementinfo = $res['advertisement'];
		$hashistory = $res['hashistory'];
		$response['hashistory'] = 0;
		$response['pastadvertisementinfo'] = $pastadvertisementinfo;
		$nowres = $this->dealAdvertisement($nowadvertisementinfo, $noworderinfo, $hashistory,2);
		$response['nowadvertisementinfo'] = $nowres['advertisement'];
		$response['telephone'] = $telephone;
		exit(json_encode($response));
	}

	private function dealAdvertisement($advertisementinfo, $orderinfo, $hashistory, $type = 1)
	{
		$response = array();
		$tmphashistory = $hashistory;
		$statusmess = "预约";
		if(empty($orderinfo)){
			foreach ($advertisementinfo as $advertisementinfokey => $advertisementinfoval) {
				$advertisementinfo[$advertisementinfokey]['status'] = 0;
				$advertisementinfo[$advertisementinfokey]['statusmessage'] = "立即参与";
			}
			$response['advertisement'] = $advertisementinfo;
			$response['hashistory'] = $tmphashistory;
			return $response;
		}
		foreach ($advertisementinfo as $advertisementinfokey => $advertisementinfoval) {
			if($orderinfo['car_model_id'] == $advertisementinfoval['car_model_id']){
				if($orderinfo['status'] == 1){
					$advertisementinfo[$advertisementinfokey]['statusmessage'] = "已预约";
					$advertisementinfo[$advertisementinfokey]['status'] = 1;
					$tmphashistory = 1;
					$statusmess = "预约";
				}
				if($orderinfo['status'] == 2 || $orderinfo['status'] == 3 || $orderinfo['status'] == 4 || $orderinfo['status'] == 5){
					$advertisementinfo[$advertisementinfokey]['statusmessage'] = "试驾完成";
					$advertisementinfo[$advertisementinfokey]['status'] = 2;
					$tmphashistory = 1;
					$statusmess = "试驾";
				}
				$advertisementinfo[$advertisementinfokey]['orderid'] = $orderinfo['id'];
				$advertisementinfo[$advertisementinfokey]['orderh5id'] = "";
			}else{

				$advertisementinfo[$advertisementinfokey]['status'] = -1;
				$advertisementinfo[$advertisementinfokey]['statusmessage'] = $type == 1 ? "您已预约其他车型" : "3个月内不能重复预约" ;
				switch ($advertisementinfoval['id']) {
					case '1':
						$advertisementinfo[$advertisementinfokey]['ad_img_url'] = IMGURL . "lenlingshuangqingdark3.png";
						break;
					case '2':
						$advertisementinfo[$advertisementinfokey]['ad_img_url'] = IMGURL . "lenlingshuangqingdark1.png";
						break;
					case '3':
						$advertisementinfo[$advertisementinfokey]['ad_img_url'] = IMGURL . "lenlingshuangqingdark2.png";
						break;
					case '4':
						$advertisementinfo[$advertisementinfokey]['ad_img_url'] = IMGURL . "kaimeiruidark.jpg";
						break;
					case '5':
						$advertisementinfo[$advertisementinfokey]['ad_img_url'] = IMGURL . "kaimeiruiyundongdark.jpg";
						break;
					case '6':
						$advertisementinfo[$advertisementinfokey]['ad_img_url'] = IMGURL . "kaimeiruishuangqingdark.jpg";
						break;	
					default:
						# code...
						break;
				}
			}

		}
		foreach ($advertisementinfo as $k => $val) {
			if($val['status'] == '-1'){
				$advertisementinfo[$k]['statusmessage'] = $type == 1 ? "您已预约其他车型" : "3个月内不能重复" . $statusmess ;
			}
		}
		$response['advertisement'] = $advertisementinfo;
		$response['hashistory'] = $tmphashistory;
		return $response;
	}
}