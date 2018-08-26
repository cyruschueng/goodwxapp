package com.vizen.sd.utils;

import java.util.UUID;

public class UUIDUtil {
	
	public static String getUUIDStr() {
		return UUID.randomUUID().toString().replace("-", "");
	}
}
