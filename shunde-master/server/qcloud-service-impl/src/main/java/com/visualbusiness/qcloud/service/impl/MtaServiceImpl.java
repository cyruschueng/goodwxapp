package com.visualbusiness.qcloud.service.impl;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.TreeMap;

import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.qcloud.Common.Request;
import com.qcloud.Utilities.MD5;
import com.qcloud.Utilities.Json.JSONObject;
import com.visualbusiness.qcloud.config.QcloudConfig;
import com.visualbusiness.qcloud.model.MtaVisit;
import com.visualbusiness.qcloud.service.MtaService;
import com.visualbusiness.qcloud.service.exception.QcloudException;

@Service("mtaService")
public class MtaServiceImpl implements MtaService {
	private static Logger logger = LogManager.getLogger(MtaServiceImpl.class);

	private static final String URL_BASE = "http://mta.qq.com/h5/api/";

	private Gson gson = new Gson();

	@Override
	public Map<String, Map<String, MtaVisit>> ctrCustom(String mtaSecretId, String mtaSecretKey, String startDate,
			String endDate, String... custom) throws QcloudException {
		String url = URL_BASE + "ctr_custom";

		Map<String, String> params = new HashMap<String, String>();
		params.put("custom", StringUtils.join(custom, ","));
		params.put("start_date", startDate);
		params.put("end_date", endDate);
		params.put("idx", "pv,uv,vv,iv");

		Map<String, Object> requestParams = getRequestParams(params, mtaSecretId, mtaSecretKey);

		try {
			JSONObject json = this.call(url, requestParams);
			Object data = json.get("data");
			String dataString = "{}"; //SB腾讯数据为空时data竟然不是对象而是数组
			if (data instanceof JSONObject) {
				dataString = data.toString();
			}

			Type type = new TypeToken<Map<String, LinkedHashMap<String, MtaVisit>>>() {
			}.getType();
			Map<String, Map<String, MtaVisit>> result = gson.fromJson(dataString, type);
			
			return result;
		} catch (Exception e) {
			throw new QcloudException(e);
		}
	}

	private JSONObject call(String url, Map<String, Object> params) throws Exception {
		String result = Request.sendRequest(url, params, "POST", null);
		JSONObject json = new JSONObject(result);

		int code = json.getInt("code");
		if (code != 0) {
			String message = json.getString("message");
			String codeDesc = json.optString("codeDesc");
			throw new QcloudException(code + ":" + message + "," + codeDesc);
		}

		return json;
	}

	private Map<String, Object> getRequestParams(Map<String, String> params, String mtaSecretId, String mtaSecretKey) {
		Map<String, Object> requestParams = new TreeMap<String, Object>();
		requestParams.putAll(params);

		requestParams.put("app_id", mtaSecretId);

		String sign = sign(requestParams, mtaSecretKey);
		requestParams.put("sign", sign);

		return requestParams;
	}

	private String sign(Map<String, Object> params, String mtaSecretKey) {
		StringBuilder sb = new StringBuilder();
		sb.append(mtaSecretKey);
		for (Map.Entry<String, Object> entry : params.entrySet()) {
			sb.append(entry.getKey()).append("=").append(entry.getValue());
		}

		String md5 = MD5.stringToMD5(sb.toString());
		return md5;
	}

}
