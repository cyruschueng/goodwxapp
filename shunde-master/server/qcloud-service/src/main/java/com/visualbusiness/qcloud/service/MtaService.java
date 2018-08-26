package com.visualbusiness.qcloud.service;

import java.util.Map;

import com.visualbusiness.qcloud.model.MtaVisit;
import com.visualbusiness.qcloud.service.exception.QcloudException;

public interface MtaService {
	/**
	 * 
	 * @param startDate
	 * @param endDate
	 * @param custom
	 * @return {custom:{date:visit}}
	 * @throws QcloudException
	 */
	public Map<String, Map<String, MtaVisit>> ctrCustom(String mtaSecretId, String mtaSecretKey, String startDate, String endDate, String... custom) throws QcloudException;
}
