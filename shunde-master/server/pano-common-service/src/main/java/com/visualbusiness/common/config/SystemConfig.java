package com.visualbusiness.common.config;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class SystemConfig {
	private static Logger logger = LogManager.getLogger(SystemConfig.class);

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
	public static final String LUNA_API_BASE_URL = "lunaApiBaseUrl";

	public static final String IMMIGRATION_PANODATA_URL = "immigrationPanoDataUrl";

	public static final String VENDOR = "vendor";

	public static final String SECRET = "secret";

	public static final String COMPANY_MEDIA_KEY = "companyMediaKey";

	public static final String AUTO_STITCH_CMD = "autoStitchCmd";

	public static final String PANO_PROCESS_CALL_BACK = "panoProcessCallBack";

	public static final String PANO_MESOS_ZK = "panoMesosZk";


	private static String immigrationPanodataUrl;

	private static String vendor;
	private static String secret;

	public static String getVendor() {
		return vendor;
	}

	public static String getSecret() {
		return secret;
	}

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
	private static String lunaApiBaseUrl;
	private static String companyMediaKey;
	private static String autoStitchCmd;

	private static String panoProcessCallBack;
	private static String panoMesosZk;

	private SystemConfig() {

	}

	static {
		try {
			load();
		} catch (Exception e) {
			logger.error(e);
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
				logger.error(e);
			}
		} else {
			logger.error("没有找到SystemConfig配置文件。");
			throw new RuntimeException("没有找到SystemConfig配置文件。");
		}

		vendor = config.getProperty(VENDOR);
		secret = config.getProperty(SECRET);

		immigrationPanodataUrl = config.getProperty(IMMIGRATION_PANODATA_URL);
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
		lunaApiBaseUrl = config.getProperty(LUNA_API_BASE_URL);
		companyMediaKey = config.getProperty(COMPANY_MEDIA_KEY);
		autoStitchCmd = config.getProperty(AUTO_STITCH_CMD);

		panoProcessCallBack = config.getProperty(PANO_PROCESS_CALL_BACK);
		panoMesosZk = config.getProperty(PANO_MESOS_ZK);
	}

	public static String getImmigrationPanodataUrl() {
		return immigrationPanodataUrl;
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

	public static String getLunaApiBaseUrl() {
		return lunaApiBaseUrl;
	}

	public static String getCompanyMediaKey() {
		return companyMediaKey;
	}

	public static String getAutoStitchCmd() {
		return autoStitchCmd;
	}

	public static String getPanoProcessCallBack() {
		return panoProcessCallBack;
	}

	public static String getPanoMesosZk() {
		return panoMesosZk;
	}
}
