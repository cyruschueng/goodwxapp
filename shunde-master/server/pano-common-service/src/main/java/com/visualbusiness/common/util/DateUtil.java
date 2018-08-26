package com.visualbusiness.common.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

public class DateUtil {
	private DateUtil() {
	}
	
	public static String convertTimeToDate(String time) {
		long timeLong = NumberUtil.parseLong(time);
		
		return convertTimeToDate(timeLong);
	}
	
	public static String convertTimeToDate(long time) {
		if (time == 0) {
			return null;
		}
		
		DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		return format.format(new Date(time));
	}

	public static String convertTimeToDateTime(String time) {
		long timeLong = NumberUtil.parseLong(time);
		
		return convertTimeToDateTime(timeLong);
	}

	public static String convertTimeToDateTime(long time) {
		if (time == 0) {
			return null;
		}
		
		DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		format.setTimeZone(TimeZone.getTimeZone("Asia/Shanghai"));
		return format.format(new Date(time));
	}
	
	public static String currentDate() {
		return convertTimeToDate(System.currentTimeMillis());
	}

	public static long convertDateToTime(String date) throws Exception {
		SimpleDateFormat format= new SimpleDateFormat("yyyyMMdd");
		return format.parse(date.trim()).getTime();
	}
}
