package com.visualbusiness.common.rest;

import java.io.InputStreamReader;
import java.net.URI;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.http.Consts;
import org.apache.http.HttpEntity;
import org.apache.http.HttpEntityEnclosingRequest;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class RestRequest<T> {
	private static Logger logger = LogManager.getLogger(RestRequest.class);
	
	private static Gson gson = new Gson();

	private HttpRequestBase method;
	private String uri;
	private Map<String, String> parameters = new HashMap<String, String>();
	private Map<String, String> headers = new HashMap<String, String>();
	private Object entity;

	public RestRequest(HttpRequestBase method, String uri) {
		this(method, uri, null);
	}

	public RestRequest(HttpRequestBase method, String uri, Map<String, String> param) {
		this.method = method;
		this.uri = uri;
		if (param != null) {
			parameters.putAll(param);
		}
	}

	public void addParameter(String name, String value) {
		this.parameters.put(name, value);
	}

	public void addHeader(String name, String value) {
		this.headers.put(name, value);
	}
	
	public void setEntity(Object entity) {
		this.entity = entity;
	}

	public RestResult<T> request() throws RestException {
		try {
			String url = uri + "?";
			for (Entry<String, String> parameter : parameters.entrySet()) {
				url += "&" + URLEncoder.encode(parameter.getKey(), Consts.UTF_8.name()) + "="
						+ URLEncoder.encode(parameter.getValue(), Consts.UTF_8.name());
			}
			method.setURI(new URI(url));

			for (Entry<String, String> header : headers.entrySet()) {
				method.addHeader(header.getKey(), header.getValue());
			}

			if (entity != null && method instanceof HttpEntityEnclosingRequest) {
				((HttpEntityEnclosingRequest) method).setEntity(new StringEntity(gson.toJson(entity), ContentType.APPLICATION_JSON));
			}

			CloseableHttpClient httpclient = HttpClients.createDefault();
			try (CloseableHttpResponse response = httpclient.execute(method)) {
				int statusCode = response.getStatusLine().getStatusCode();
				if (statusCode != HttpStatus.SC_OK) {
					throw new RuntimeException(url + "请求请求错误, HTTP Status=" + statusCode);
				}

				HttpEntity entity = response.getEntity();
				if (entity == null) {
					throw new RuntimeException(url + "请求请求错误, 返回数据为空。");
				}

				RestResult<T> result = gson.fromJson(new InputStreamReader(entity.getContent(), Consts.UTF_8),
						new TypeToken<RestResult<T>>() {
						}.getType());

				return result;
			}
		} catch (Exception e) {
			logger.error(e);
			throw new RestException(e.getMessage());
		}
	}
}
