package com.visualbusiness.qcloud.config;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class QcloudConfig {
	private static Logger logger = LogManager.getLogger(QcloudConfig.class);

	public static final String CONFIG_FILE_PATH = "/QcloudConfig.properties";

	//COS相关配置
	public static final String COS_APP_ID = "cosAppId";
	public static final String COS_SECRET_ID = "cosSecretId";
	public static final String COS_SECRET_KEY = "cosSecretKey";
	public static final String COS_RESOURCES_BUCKET_NAME = "cosResourcesBucketName";
	public static final String COS_TILES_BUCKET_NAME = "cosTilesBucketName";
	public static final String COS_PANO_MEDIAS_BUCKET_NAME = "cosPanoMediasBucketName";

	//QCLOUD相关配置
	public static final String QCLOUD_SECRET_ID = "qcloudSecretId";
	public static final String QCLOUD_SECRET_KEY = "qcloudSecretKey";

	//COS相关配置
	private static int cosAppId;
	private static String cosSecretId;
	private static String cosSecretKey;
	private static String cosResourcesBucketName;
	private static String cosTilesBucketName;
	private static String cosPanoMediasBucketName;

	//QCLOUD相关配置
	private static String qcloudSecretId;
	private static String qcloudSecretKey;

	private QcloudConfig() {
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

		InputStream configInput = QcloudConfig.class.getResourceAsStream(CONFIG_FILE_PATH);
		if (configInput != null) {
			try {
				config.load(configInput);
			} catch (IOException e) {
				logger.error(e);
			}
		} else {
			logger.error("没有找到QcloudConfig配置文件。");
			throw new RuntimeException("没有找到QcloudConfig配置文件。");
		}

		//COS相关配置
		cosAppId = Integer.parseInt(config.getProperty(COS_APP_ID));
		cosSecretId = config.getProperty(COS_SECRET_ID);
		cosSecretKey = config.getProperty(COS_SECRET_KEY);
		cosResourcesBucketName = config.getProperty(COS_RESOURCES_BUCKET_NAME);
		cosTilesBucketName = config.getProperty(COS_TILES_BUCKET_NAME);
		cosPanoMediasBucketName = config.getProperty(COS_PANO_MEDIAS_BUCKET_NAME);

		//QCLOUD相关配置
		qcloudSecretId = config.getProperty(QCLOUD_SECRET_ID);
		qcloudSecretKey = config.getProperty(QCLOUD_SECRET_KEY);
		
	}
	
	//COS相关配置
	public static int getCosAppId() {
		return cosAppId;
	}

	public static String getCosResourcesBucketName() {
		return cosResourcesBucketName;
	}

	public static String getCosTilesBucketName() {
		return cosTilesBucketName;
	}

	public static String getCosPanoMediasBucketName() {
		return cosPanoMediasBucketName;
	}

	public static String getCosSecretId() {
		return cosSecretId;
	}

	public static String getCosSecretKey() {
		return cosSecretKey;
	}

	//QCLOUD相关配置
	public static String getQcloudSecretId() {
		return qcloudSecretId;
	}

	public static String getQcloudSecretKey() {
		return qcloudSecretKey;
	}

}
