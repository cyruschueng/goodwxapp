package com.javen.model;

public class Equipment {
	
    private Integer id;
    // 模拟车位设备id
    private String equip_id;
    // 车位拥有者
    private String user_id;
    // 车位北纬信息
    private String location_nl;
    // 车位东经信息
    private String location_el;
    // 中文描述信息
    private String description;
    // 状态信息  0为预约中 1为可预约 2为不可预约
    private Integer state;
    
  
    public Integer getId() {
        return id;
    }
    
    public void setId(Integer id) {
        this.id = id;
    }
    
    public String getUserId( ) {
    	return user_id;
    }
    
    public void setUserId(String user_id) {
    	this.user_id = user_id;
    }
    
    public String getEquipId( ) {
    	return equip_id;
    }
    
    public void setEquipId(String equip_id) {
    	this.equip_id = equip_id;
    }
    
    public String getLocationNL() {
        return location_nl;
    }

    public void setLocationNL(String location_nl) {
        this.location_nl = location_nl == null ? null : location_nl.trim();
    }
    
    public String getLocationEL() {
        return location_el;
    }

    public void setLocationEL(String location_el) {
        this.location_el = location_el == null ? null : location_el.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }
    
    public Integer getState() {
        return state;
    }
    
    public void setState(Integer state) {
        this.state = state;
    }

	@Override
	public String toString() {
		return "Equipment [id=" + id + ", equip_id=" + equip_id + ", user_id=" + user_id + 
				", location_nl=" + location_nl +  ", location_el=" + location_el + 
			     ", description=" + description + ", state=" + state
				+ "]";
	}
}
