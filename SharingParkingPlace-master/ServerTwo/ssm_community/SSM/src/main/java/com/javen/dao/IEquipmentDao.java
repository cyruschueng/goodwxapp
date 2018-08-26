package com.javen.dao;

import java.util.List;

import com.javen.model.Equipment;
import com.javen.model.User;

public interface IEquipmentDao {

    int deleteByPrimaryKey(Integer id);

    int insert(User record);

    int insertSelective(User record);

    List <Equipment> selectAll();

    int updateByPrimaryKeySelective(Equipment record);

    // 执行更新操作
    int updateByEquipId(Equipment equip);
}
