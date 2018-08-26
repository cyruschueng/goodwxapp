package com.visualbusiness.qcloud.service.impl;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.qcloud.cosapi.sign.Sign;
import com.visualbusiness.qcloud.config.QcloudConfig;
import com.visualbusiness.qcloud.service.CosService;

@Service("cosService")
public class CosServiceImpl implements CosService {
	private static Logger logger = LogManager.getLogger(CosServiceImpl.class);
	
	private int appId = QcloudConfig.getCosAppId();
	private String secretId = QcloudConfig.getCosSecretId();
	private String secretKey = QcloudConfig.getCosSecretKey();

	private String resourceBucket = QcloudConfig.getCosResourcesBucketName();
	private String panoMediasBucket = QcloudConfig.getCosPanoMediasBucketName();
	
	@Override
	public String getResourceSignature(String fileId, long expiredTime) {
		return this.getSignature(resourceBucket, fileId, expiredTime);
	}

	@Override
	public String getPanoMediasSignature(String fileId, long expiredTime) {
		return this.getSignature(panoMediasBucket, fileId, expiredTime);
	}

	@Override
	public String getSignature(String bucket, String fileId, long expiredTime) {
		if (StringUtils.isEmpty(secretId) || StringUtils.isEmpty(secretKey)) {
			logger.error("COS secretId、secretKey未设置。");
			return null;
		}
		
		if (expiredTime == 0) {
			return Sign.appSignatureOnce(appId, secretId, secretKey, fileId, bucket);
		} else if (fileId == null || fileId.trim().isEmpty()) {
			return Sign.appSignature(appId, secretId, secretKey, expiredTime, bucket);
		} else {
			return Sign.appSignatureSingle(appId, secretId, secretKey, expiredTime, fileId, bucket);
		}
	}
}
