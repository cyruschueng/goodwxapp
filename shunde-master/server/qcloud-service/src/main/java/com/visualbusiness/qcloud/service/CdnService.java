package com.visualbusiness.qcloud.service;

import com.visualbusiness.qcloud.service.exception.QcloudException;

public interface CdnService {
	public int refreshUrl(String... urls) throws QcloudException;
	
	public void refreshDir(String... dirs) throws QcloudException;
}
