package com.javen.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.javen.model.Equipment;
import com.javen.service.IEquipmentService;

@Controller  
@RequestMapping("/equipment")  
// /equipment/**
public class EquipmentController {
	
	 private static Logger log = LoggerFactory.getLogger(EquipmentController.class);
	 @Resource  
	 private IEquipmentService equipmentService;     
   
	 // /equipment/showAllEquip
	 // 返回系统所有的车位json对象
	 @RequestMapping(value="/showallequip", method=RequestMethod.GET)  
	 public @ResponseBody List<Equipment> getUserInJson2(Map<String, Object> model){  
	     List <Equipment> equipment = this.equipmentService.showAllEquip();  
	     log.info(equipment.toString());
	     return equipment;  
	 } 
	 
	 // /equipment/reserve
	 // 进行预约车位，生成订单及修改车位设备信息
	 @RequestMapping(value="/reserve", method=RequestMethod.POST)
	 public @ResponseBody JSONObject reserve(HttpServletRequest request, Model model) {
		 // 测试获取车位信息
		 String user_id = request.getParameter("userId");
		 String equip_id = request.getParameter("equipId");
		 String description = request.getParameter("description");
		 System.out.println(equip_id);
		 JSONObject json = new JSONObject();
		 // new state信息
		 // new equipment对象
		 Equipment equip = new Equipment();
		 Integer state = 1;
		 equip.setState(state);
		 equip.setEquipId(equip_id);
		 // 执行update操作
		 int res = this.equipmentService.updateByEquipId(equip);
		 if (res == 1) {
			 json.put("res", 1);
			 log.debug("reserve success");
			 System.out.println("success");
		 } else {
			 json.put("res", 0);
			 log.debug("reserve failed");
			 System.out.println("failed");
		 }
		 return json;
		 
	 }
	
	 
}
