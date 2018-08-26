package com.vizen.sd.service;

import com.vizen.sd.model.LoginUser;
import com.vizen.sd.repository.mysql.domain.PanoStitch;

public interface PanoManageService {

	void ceatePano(String panoName ,LoginUser loginUser);

	void updatePanoName(String panoId, String panoName, LoginUser loginUser);

	PanoStitch getPanoStitch(String panoId);

	void submitAllPanoAutoStitch(String panoId, String picMap, LoginUser loginUser);

}
