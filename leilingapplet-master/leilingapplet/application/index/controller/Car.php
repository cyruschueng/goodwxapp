<?php
namespace app\index\controller;
use app\index\model\CarModel ;
use app\index\model\Configuration;
use app\index\model\City;
use app\index\model\Dealer;
use think\Request;
class Car extends Base{

	/**
	 * [getCar 获取试驾车的详情]
	 * @return [type] [description]
	 */
	public function getCar()
	{
		
		$id = input('param.car_model_id');//车型id
		$city = input('param.city');//所在城市
		$response = array();

		$car = new CarModel();
		$carinfo = $car->get($id);//车型详情
		$description = $carinfo['description'];
		$des_arr = explode('<br/>', $description);
		$carinfo['description'] = $des_arr;
		$response['carinfo'] = $carinfo;

		$configuration = new Configuration();
		$configurationinfo = $configuration->all(['car_model_id'=>$id]);//车型配置
		$configurationin_arr = array(
			"id"=> "0",
            "car_model_id"=> "0",
			'series_name'=>'请选择车型配置'
			);
		array_unshift($configurationinfo,$configurationin_arr);
		$response['configurationinfo'] = $configurationinfo;


		$cityModel = new City();
		$dealerinfo = "";
		if(!empty($city)){
			$cityinfo = $cityModel->where('city_name', 'like', "%" .$city. "%")->find();
			$citycode = $cityinfo['city_code'];
			$response['citycode'] = $citycode;

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
			$dealern_arr = array(
				"id"=> "0",
				'dealer_name'=>'请选择4s店地址'
				);
			array_unshift($dealerinfo,$dealern_arr);
		}
		$response['dealerinfo'] = $dealerinfo;
		exit(json_encode($response));
	}

	
}