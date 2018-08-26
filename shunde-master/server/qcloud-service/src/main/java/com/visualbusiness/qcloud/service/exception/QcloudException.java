package com.visualbusiness.qcloud.service.exception;

public class QcloudException extends Exception {
	public QcloudException() {
	}

	public QcloudException(String message) {
		super(message);
	}

	public QcloudException(Throwable cause) {
		super(cause);
	}

	public QcloudException(String message, Throwable cause) {
		super(message, cause);
	}

}
