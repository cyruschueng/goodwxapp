package com.visualbusiness.common.redis;

import com.google.gson.Gson;

public class ObjectRedis {
	private static Gson gson = new Gson();
	
	public static void setex(String key, int second, Object value) {
		String str = gson.toJson(value);
		Redis.setex(key, second, str);
	}

	public static<T> T get(String key, Class<T> classOfT) {
		String str = Redis.get(key);
		return gson.fromJson(str, classOfT);
	}

	public static void del(String key) {
		Redis.del(key);
	}

}
