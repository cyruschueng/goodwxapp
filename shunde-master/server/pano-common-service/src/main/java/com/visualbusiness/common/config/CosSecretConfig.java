package com.visualbusiness.common.config;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class CosSecretConfig {
	private static Logger logger = LogManager.getLogger(CosSecretConfig.class);

	public static final String CONFIG_FILE_PATH = "/CosSecret.properties";

	public static final String COS_SECRET_ID = "cosSecretId";
	public static final String COS_SECRET_KEY = "cosSecretKey";

	private static String cosSecretId;
	private static String cosSecretKey;

	
	private CosSecretConfig() {

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

		InputStream configInput = CosSecretConfig.class.getResourceAsStream(CONFIG_FILE_PATH);
		if (configInput != null) {
			try {
				config.load(configInput);
			} catch (IOException e) {
				logger.error(e);
			}

			cosSecretId = config.getProperty(COS_SECRET_ID);
			cosSecretKey = config.getProperty(COS_SECRET_KEY);
		} else {
			logger.debug("没有找到CosSecret配置文件。");
		}
	}
	
	public static String getCosSecretId() {
		return cosSecretId;
	}

	public static String getCosSecretKey() {
		return cosSecretKey;
	}
	
}
