package com.javen.service;

import java.util.List;

import com.javen.model.Equipment;

public interface IEquipmentService {
	
	// Model Equipment接口，获取所有的车位设备信息
	public List<Equipment> showAllEquip();
	
	// Model Equipment接口 预约订单信息
	public int updateByEquipId(Equipment equip);
	
}
