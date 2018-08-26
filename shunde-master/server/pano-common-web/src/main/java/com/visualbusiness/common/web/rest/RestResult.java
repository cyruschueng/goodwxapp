package com.visualbusiness.common.web.rest;

public class RestResult<T> {
	public static final int RESULT_SUCCESS = 0;
	public static final int RESULT_ERROR = 1;
	public static final int RESULT_NEED_LOGIN = 2;
	public static final int RESULT_PERMISSION_DENIED = 3;
	
	public static final String MSG_SUCCESS = "正常";
	public static final String MSG_ERROR = "错误";
	public static final String MSG_NEED_LOGIN = "未登录或登录超时";
	public static final String MSG_PERMISSION_DENIED = "权限不足";
	
	private int result;
	private String msg;
	private T data;
	
	public static <D> RestResult<D> successResult(D data) {
		return new RestResult(RESULT_SUCCESS, MSG_SUCCESS, data);
	}

	public static <D> RestResult<D> successResult() {
		return new RestResult(RESULT_SUCCESS, MSG_SUCCESS, null);
	}

	public static <D> RestResult<D> errorResult(String msg, D data) {
		return new RestResult(RESULT_ERROR, msg, data);
	}

	public static <D> RestResult<D> errorResult(String msg) {
		return new RestResult(RESULT_ERROR, msg, null);
	}

	public static <D> RestResult<D> errorResult() {
		return new RestResult(RESULT_ERROR, MSG_ERROR, null);
	}

	public static <D> RestResult<D> needLoginResult() {
		return new RestResult(RESULT_NEED_LOGIN, MSG_NEED_LOGIN, null);
	}

	public static <D> RestResult<D> permissionDeniedResult() {
		return new RestResult(RESULT_PERMISSION_DENIED, MSG_PERMISSION_DENIED, null);
	}

	public RestResult(int result, String msg, T data) {
		this.result = result;
		this.msg = msg;
		this.data = data;
	}

	public int getResult() {
		return result;
	}
	
	public String getMsg() {
		return msg;
	}
	
	public T getData() {
		return data;
	}
	
}
