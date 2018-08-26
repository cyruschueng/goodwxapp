package com.javen.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.javen.dao.IEquipmentDao;
import com.javen.model.Equipment;
import com.javen.service.IEquipmentService;

@Service("equipmentService")
// 继承IEquipmentService 实现showAllEquip()
public class EquipmentServiceImpl implements IEquipmentService {
	
    @Resource  
    private IEquipmentDao equipmentDao;  
    
    public List<Equipment> showAllEquip() {  
        // TODO Auto-generated method stub  
        return this.equipmentDao.selectAll();  
    }

	public int updateByEquipId(Equipment equip) {
		// TODO Auto-generated method stub
		return this.equipmentDao.updateByEquipId(equip);
	}  
}
