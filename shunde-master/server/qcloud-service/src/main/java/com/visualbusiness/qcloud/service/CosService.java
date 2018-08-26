package com.visualbusiness.qcloud.service;

public interface CosService {
	public String getResourceSignature(String fileId, long expiredTime);

	public String getPanoMediasSignature(String fileId, long expiredTime);

	public String getSignature(String bucket, String fileId, long expiredTime);
}
