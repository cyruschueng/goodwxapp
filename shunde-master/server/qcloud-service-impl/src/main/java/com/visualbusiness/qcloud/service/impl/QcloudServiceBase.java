package com.visualbusiness.qcloud.service.impl;

import java.util.TreeMap;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.qcloud.QcloudApiModuleCenter;
import com.qcloud.Module.Base;
import com.qcloud.Module.Cdn;
import com.qcloud.Utilities.Json.JSONObject;
import com.visualbusiness.qcloud.config.QcloudConfig;
import com.visualbusiness.qcloud.service.exception.QcloudException;

public abstract class QcloudServiceBase {
	private static Logger logger = LogManager.getLogger(QcloudServiceBase.class);

	protected String qcloudSecretId = QcloudConfig.getQcloudSecretId();
	protected String qcloudSecretKey = QcloudConfig.getQcloudSecretKey();

	protected String getDefaultRegion() {
		return null;
	}

	protected TreeMap<String, Object> getCommonParams() {
		TreeMap<String, Object> params = new TreeMap<String, Object>();
		params.put("SecretId", this.qcloudSecretId);
		params.put("SecretKey", this.qcloudSecretKey);
		params.put("RequestMethod", "POST");

		String defaultRegion = this.getDefaultRegion();
		if (defaultRegion != null && !defaultRegion.isEmpty()) {
			params.put("DefaultRegion", defaultRegion);
		}

		return params;
	}

	public JSONObject call(Base module, String actionName, TreeMap<String, Object> params) throws Exception {
		return this.call(module, actionName, null, params);
	}

	public JSONObject call(Base module, String actionName, TreeMap<String, Object> commonParams,
			TreeMap<String, Object> params) throws Exception {
		if (commonParams == null) {
			commonParams = this.getCommonParams();
		}

		QcloudApiModuleCenter moduleCenter = new QcloudApiModuleCenter(module, commonParams);

		String result = moduleCenter.call(actionName, params);
		JSONObject json = new JSONObject(result);
		
		int code = json.getInt("code");
		if (code != 0) {
			String message = json.getString("message");
			String codeDesc = json.optString("codeDesc");
			throw new QcloudException(code + ":" + message + "," + codeDesc);
		}

		return json;
	}
}
