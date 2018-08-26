package com.visualbusiness.common.util;

public class NumberUtil {
	private NumberUtil() {
	}
	
	public static double parseDouble(String s) {
		return parseDouble(s, 0);
	}
	
	public static double parseDouble(String s, double defaultVal) {
		try {
			double val = Double.parseDouble(s);
			return val;
		} catch (Exception e) {
			return defaultVal;
		}
	}
	
	public static long parseLong(String s) {
		return parseLong(s, 0);
	}
	
	public static long parseLong(String s, long defaultVal) {
		try {
			long val = Long.parseLong(s);
			return val;
		} catch (Exception e) {
			return defaultVal;
		}
	}
	
}
