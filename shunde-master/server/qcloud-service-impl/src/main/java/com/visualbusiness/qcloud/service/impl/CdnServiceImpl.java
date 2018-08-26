package com.visualbusiness.qcloud.service.impl;

import java.util.TreeMap;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.qcloud.QcloudApiModuleCenter;
import com.qcloud.Module.Cdn;
import com.qcloud.Utilities.Json.JSONObject;
import com.qcloud.cosapi.sign.Sign;
import com.visualbusiness.qcloud.config.QcloudConfig;
import com.visualbusiness.qcloud.service.CdnService;
import com.visualbusiness.qcloud.service.CosService;
import com.visualbusiness.qcloud.service.exception.QcloudException;

@Service("cdnService")
public class CdnServiceImpl extends QcloudServiceBase implements CdnService {
	private static Logger logger = LogManager.getLogger(CdnServiceImpl.class);
	
	private String qcloudSecretId = QcloudConfig.getQcloudSecretId();
	private String qcloudSecretKey = QcloudConfig.getQcloudSecretKey();

	@Override
	protected String getDefaultRegion() {
		return "sh"; //FIXME 实际上CDN不需要这个参数，但是没这个参数运行会出错
	}


	@Override
	public void refreshDir(String... dirs) throws QcloudException {
	    TreeMap<String, Object> params = new TreeMap<String, Object>();
	    for (int i = 0; i < dirs.length; i++) {
		    params.put("dirs." + i, dirs[i]);
		}

	    try {
	        JSONObject json = this.call(new Cdn(), "RefreshCdnDir", params);
	    } catch (Exception e) {
	        throw new QcloudException(e);
	    }
	};
	
	@Override
	public int refreshUrl(String... urls)  throws QcloudException {
	    TreeMap<String, Object> params = new TreeMap<String, Object>();
	    for (int i = 0; i < urls.length; i++) {
		    params.put("urls." + i, urls[i]);
		}

	    try {
	        JSONObject json = this.call(new Cdn(), "RefreshCdnUrl", params);
	        JSONObject data = json.getJSONObject("data");
	        int count = data.getInt("count");
	        return count;
	    } catch (Exception e) {
	        throw new QcloudException(e);
	    }
	}
	
}
