package com.visualbusiness.common.config;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SystemConfig {
	private static Logger logger = LoggerFactory.getLogger(SystemConfig.class);

	public static final String CONFIG_FILE_PATH = "/SystemConfig.properties";

	public static final String COS_RESOURCES_BUCKET_NAME = "cosResourcesBucketName";
	public static final String COS_TILES_BUCKET_NAME = "cosTilesBucketName";
	public static final String COS_PANO_MEDIAS_BUCKET_NAME = "cosPanoMediasBucketName";
	public static final String COS_APP_ID = "cosAppId";
	public static final String COS_TILES_URL = "cosTilesUrl";
	public static final String PROCESS_SERVER_URL = "processServerUrl";
	public static final String ENGINE_SERVER_URL = "engineServerUrl";
	public static final String VIEWER_SERVER_URL = "viewerServerUrl";
	public static final String LUNA_TOKEN_LOGIN_URL = "lunaTokenLoginUrl";
	public static final String LUNA_USERNAME_LOGIN_URL = "lunaUsernameLoginUrl";

	public static final String CMQ_SECRET_ID = "cmqSecretId";
	public static final String CMQ_SECRET_KEY = "cmqSecretKey";
	public static final String CMQ_ENDPOINT = "cmqEndpoint";

	public static final String PANO_STITCH_QUEUE = "panoStitchQueue";
	public static final String PANO_PROCESS_QUEUE = "panoProcessQueue";

	public static final String PANO_PROCESS_CALL_BACK = "panoProcessCallBack";
	
	private static String cosResourcesBucketName;
	private static String cosTilesBucketName;
	private static String cosPanoMediasBucketName;
	private static int cosAppId;
	private static String cosTilesUrl;
	private static String processServerUrl;
	private static String engineServerUrl;
	private static String viewerServerUrl;
	private static String lunaTokenLoginUrl;
	private static String lunaUsernameLoginUrl;

	private static String cmqSecretId;
	private static String cmqSecretKey;
	private static String cmqEndpoint;

	private static String panoStitchQueue;
	private static String panoProcessQueue;

	private static String panoProcessCallBack;

	private SystemConfig() {

	}

	static {
		try {
			load();
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			throw e;
		}
	}

	private static void load() {
		Properties config = new Properties();

		InputStream configInput = SystemConfig.class.getResourceAsStream(CONFIG_FILE_PATH);
		if (configInput != null) {
			try {
				config.load(configInput);
			} catch (IOException e) {
				logger.error(e.getMessage(), e);
			}
		} else {
			logger.error("没有找到SystemConfig配置文件。");
			throw new RuntimeException("没有找到SystemConfig配置文件。");
		}

		cosResourcesBucketName = config.getProperty(COS_RESOURCES_BUCKET_NAME);
		cosTilesBucketName = config.getProperty(COS_TILES_BUCKET_NAME);
		cosPanoMediasBucketName = config.getProperty(COS_PANO_MEDIAS_BUCKET_NAME);
		cosAppId = Integer.parseInt(config.getProperty(COS_APP_ID));
		cosTilesUrl = config.getProperty(COS_TILES_URL);
		processServerUrl = config.getProperty(PROCESS_SERVER_URL);
		engineServerUrl = config.getProperty(ENGINE_SERVER_URL);
		viewerServerUrl = config.getProperty(VIEWER_SERVER_URL);
		lunaTokenLoginUrl = config.getProperty(LUNA_TOKEN_LOGIN_URL);
		lunaUsernameLoginUrl = config.getProperty(LUNA_USERNAME_LOGIN_URL);

		cmqSecretId = config.getProperty(CMQ_SECRET_ID);
		cmqSecretKey = config.getProperty(CMQ_SECRET_KEY);
		cmqEndpoint = config.getProperty(CMQ_ENDPOINT);

		panoStitchQueue = config.getProperty(PANO_STITCH_QUEUE);
		panoProcessQueue = config.getProperty(PANO_PROCESS_QUEUE);

		panoProcessCallBack = config.getProperty(PANO_PROCESS_CALL_BACK);
	}
	
	//COS相关配置
	public static String getCosResourcesBucketName() {
		return cosResourcesBucketName;
	}

	public static String getCosTilesBucketName() {
		return cosTilesBucketName;
	}

	public static String getCosPanoMediasBucketName() {
		return cosPanoMediasBucketName;
	}

	public static int getCosAppId() {
		return cosAppId;
	}

	public static String getCosResourcesUrl() {
		return "http://" + getCosResourcesBucketName() + "-" + getCosAppId() + ".cos.myqcloud.com/";
	}
	
	public static String getCosResourcesInnerUrl() {
		return "http://" + getCosResourcesBucketName() + "-" + getCosAppId() + ".innercos.myqcloud.com/";
	}
	
	public static String getCosTilesUrl() {
		return cosTilesUrl;
	}

	public static String getProcessServerUrl() {
		return processServerUrl;
	}

	public static String getEngineServerUrl() {
		return engineServerUrl;
	}

	public static String getViewerServerUrl() {
		return viewerServerUrl;
	}
	
	public static String getLunaTokenLoginUrl() {
		return lunaTokenLoginUrl;
	}

	public static String getLunaUsernameLoginUrl() {
		return lunaUsernameLoginUrl;
	}


	public static String getCmqSecretId() {
		return cmqSecretId;
	}

	public static String getCmqSecretKey() {
		return cmqSecretKey;
	}

	public static String getCmqEndpoint() {
		return cmqEndpoint;
	}

	public static String getPanoStitchQueue() {
		return panoStitchQueue;
	}

	public static String getPanoProcessQueue() {
		return panoProcessQueue;
	}

	public static String getPanoProcessCallBack() {
		return panoProcessCallBack;
	}
}
