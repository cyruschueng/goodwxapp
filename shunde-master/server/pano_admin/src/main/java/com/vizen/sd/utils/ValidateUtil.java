package com.vizen.sd.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;

import org.apache.commons.lang.StringUtils;

import com.vizen.framework.exception.base.MyBaseException;

public class ValidateUtil {

	/**
	 * 判断对象是否为空，是则抛出Bussiness异常
	 * 
	 * @param object
	 * @param message
	 */
	public static void notNull(Object object, String message) {
		if (object == null) {
			throw new MyBaseException(message);
		}
	}

	/**
	 * 判断是否为空字符串，是则抛出Bussiness异常(包括null, "")
	 * 
	 * @param str
	 * @param message
	 */
	public static void notEmpty(String str, String message) {
		if (str == null || str == "") {
			throw new MyBaseException(message);
		}
	}

	/**
	 * 判断是否为空字符串，是则抛出Bussiness异常(包括null, "", " ")
	 * 
	 * @param str
	 * @param message
	 */
	public static void isNotBlank(String str, String message) {
		if (StringUtils.isBlank(str)) {
			throw new MyBaseException(message);
		}
	}

	/**
	 * 判断集合是否为空，是则抛出Bussiness异常
	 * 
	 * @param object
	 * @param message
	 */
	public static void notEmpty(Collection<?> object, String message) {
		if (object == null || object.isEmpty()) {
			throw new MyBaseException(message);
		}
	}

	/**
	 * 判断集合是否为true，否则抛出Bussiness异常
	 * 
	 * @param expression
	 * @param message
	 */
	public static void isTrue(boolean expression, String message) {
		if (!expression) {
			throw new MyBaseException(message);
		}
	}

	/**
	 * 判断集合是否不为true，否则抛出Bussiness异常
	 * 
	 * @param expression
	 * @param message
	 */
	public static void isNotTrue(boolean expression, String message) {
		if (expression) {
			throw new MyBaseException(message);
		}
	}

	/**
	 * 判断日期是否是正确的格式，否则抛出Bussiness异常
	 * 
	 * @param date
	 * @param format
	 * @param message
	 */
	public static Date isDate(String date, String format, String message) {
		if (date == null || date == "") {
			throw new MyBaseException(message);
		}

		try {
			Date d = new SimpleDateFormat(format).parse(date);

			if (d == null) {
				throw new MyBaseException(message);
			}

			return d;
		} catch (ParseException e) {
			throw new MyBaseException(message);
		}
	}

	/**
	 * 判断是否小于指定数字，否则抛出Bussiness异常
	 * 
	 * @param theNum
	 * @param diff
	 * @param message
	 */
	public static void lt(Integer theNum, Integer diff, String message) {
		if (theNum == null || diff == null) {
			throw new MyBaseException(message);
		}

		if (theNum >= diff) {
			throw new MyBaseException(message);
		}
	}

	/**
	 * 判断是否小于指定数字，否则抛出Bussiness异常
	 * 
	 * @param theNum
	 * @param diff
	 * @param message
	 */
	public static void le(Integer theNum, Integer diff, String message) {
		if (theNum == null || diff == null) {
			throw new MyBaseException(message);
		}

		if (theNum > diff) {
			throw new MyBaseException(message);
		}
	}

	/**
	 * 判断是否大于指定数字，否则抛出Bussiness异常
	 * 
	 * @param theNum
	 * @param diff
	 * @param message
	 */
	public static void gt(Integer theNum, Integer diff, String message) {
		if (theNum == null || diff == null) {
			throw new MyBaseException(message);
		}

		if (theNum <= diff) {
			throw new MyBaseException(message);
		}
	}

	/**
	 * 判断是否大于等于指定数字，否则抛出Bussiness异常
	 * 
	 * @param theNum
	 * @param diff
	 * @param message
	 */
	public static void ge(Integer theNum, Integer diff, String message) {
		if (theNum == null || diff == null) {
			throw new MyBaseException(message);
		}

		if (theNum < diff) {
			throw new MyBaseException(message);
		}
	}

}
