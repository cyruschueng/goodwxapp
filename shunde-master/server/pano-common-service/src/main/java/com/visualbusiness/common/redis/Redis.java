package com.visualbusiness.common.redis;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;
import redis.clients.jedis.Protocol;

public class Redis {
	private static Logger logger = LogManager.getLogger(Redis.class);

	public static final String CONFIG_FILE_PATH = "/redis.properties";

	public static final String CONFIG_HOST = "host";
	public static final String CONFIG_PORT = "port";
	public static final String CONFIG_CONNECTION_TIMEOUT = "connectionTimeout";
	public static final String CONFIG_SO_TIMEOUT = "soTimeout";
	public static final String CONFIG_PASSWORD = "password";
	public static final String CONFIG_DATABASE = "database";
	public static final String CONFIG_CLIENT_NAME = "clientName";

	private static JedisPool pool;

	private Redis() {

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
		Properties defaultConfig = new Properties();
		defaultConfig.put(CONFIG_HOST, Protocol.DEFAULT_HOST);
		defaultConfig.put(CONFIG_PORT, String.valueOf(Protocol.DEFAULT_PORT));
		defaultConfig.put(CONFIG_CONNECTION_TIMEOUT, String.valueOf(Protocol.DEFAULT_TIMEOUT));
		defaultConfig.put(CONFIG_SO_TIMEOUT, String.valueOf(Protocol.DEFAULT_TIMEOUT));
		defaultConfig.put(CONFIG_DATABASE, String.valueOf(Protocol.DEFAULT_DATABASE));

		Properties config = new Properties(defaultConfig);

		InputStream configInput = Redis.class.getResourceAsStream(CONFIG_FILE_PATH);
		if (configInput != null) {
			try {
				config.load(configInput);
			} catch (IOException e) {
				logger.error(e);
			}
		} else {
			logger.info("没有找到redis配置文件，使用默认设置。");
		}

		pool = new JedisPool(new JedisPoolConfig(), config.getProperty(CONFIG_HOST), Integer.valueOf(config
				.getProperty(CONFIG_PORT)), Integer.valueOf(config.getProperty(CONFIG_CONNECTION_TIMEOUT)),
				Integer.valueOf(config.getProperty(CONFIG_SO_TIMEOUT)), config.getProperty(CONFIG_PASSWORD),
				Integer.valueOf(config.getProperty(CONFIG_DATABASE)), config.getProperty(CONFIG_CLIENT_NAME));
	}

	public static Long lpush(String key, String... strings) {
		try (Jedis jedis = pool.getResource()) {
			Long ret = jedis.lpush(key, strings);
			return ret;
		}
	}

	public static Long rpush(String key, String... strings) {
		try (Jedis jedis = pool.getResource()) {
			Long ret = jedis.rpush(key, strings);
			return ret;
		}
	}

	public static String rpop(String key) {
		try (Jedis jedis = pool.getResource()) {
			String ret = jedis.rpop(key);
			return ret;
		}
	}

	public static Long hset(String key, String field, String value) {
		try (Jedis jedis = pool.getResource()) {
			Long ret = jedis.hset(key, field, value);
			return ret;
		}
	}
	
	public static String hget(String key, String field) {
		try (Jedis jedis = pool.getResource()) {
			String ret = jedis.hget(key, field);
			return ret;
		}
	}
	
	public static Long hincrBy(String key, String field, Long value) {
		try (Jedis jedis = pool.getResource()) {
			Long ret = jedis.hincrBy(key, field, value);
			return ret;
		}
	}
	
	public static Long hdel(String key, String... fields) {
		try (Jedis jedis = pool.getResource()) {
			Long ret = jedis.hdel(key, fields);
			return ret;
		}
	}
	
	public static String get(String key) {
		try (Jedis jedis = pool.getResource()) {
			String ret = jedis.get(key);
			return ret;
		}
	}

	public static String set(String key, String value) {
		try (Jedis jedis = pool.getResource()) {
			String ret = jedis.set(key, value);
			return ret;
		}
	}

	public static String setex(String key, int seconds, String value) {
		try (Jedis jedis = pool.getResource()) {
			String ret = jedis.setex(key, seconds, value);
			return ret;
		}
	}
	
	public static Long expire(String key, int seconds) {
		try (Jedis jedis = pool.getResource()) {
			Long ret = jedis.expire(key, seconds);
			return ret;
		}
	}

	public static long del(String key) {
		try (Jedis jedis = pool.getResource()) {
			long ret = jedis.del(key);
			return ret;
		}
	}
}
