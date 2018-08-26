package com.visualbusiness.pano.news.dao;

import com.visualbusiness.pano.news.model.FunctionManagement;
import com.visualbusiness.pano.news.model.UserPermissionGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FunctionManagementDao extends JpaRepository<FunctionManagement, String> {

    public FunctionManagement findByFunctionManagementId(Integer functionManagementId);
}
