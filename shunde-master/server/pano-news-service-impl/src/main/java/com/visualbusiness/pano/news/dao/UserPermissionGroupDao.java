package com.visualbusiness.pano.news.dao;

import com.visualbusiness.pano.news.model.UserPermissionGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserPermissionGroupDao extends JpaRepository<UserPermissionGroup, String> {

    public UserPermissionGroup findByGroupId(Integer groupId);

}
