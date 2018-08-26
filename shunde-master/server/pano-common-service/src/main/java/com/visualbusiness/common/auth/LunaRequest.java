package com.visualbusiness.common.auth;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import com.visualbusiness.common.rest.RestException;
import com.visualbusiness.common.rest.RestRequest;
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

import java.io.InputStreamReader;
import java.net.URI;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

/**
 * Copyright (C) 2015 - 2017 MICROSCENE Inc., All Rights Reserved.
 *
 * @author: ray@visualbusiness.com
 * @date: 2017-03-15
 */
public class LunaRequest<T> {
    private static Logger logger = LogManager.getLogger(RestRequest.class);

    private static Gson gson = new Gson();

    private HttpRequestBase method;
    private String uri;
    private Map<String, Object> parameters = new HashMap<>();
    private Map<String, String> headers = new HashMap<String, String>();
    private Object entity;

    public LunaRequest(HttpRequestBase method, String uri) {
        this(method, uri, null);
    }

    public LunaRequest(HttpRequestBase method, String uri, Map<String, String> param) {
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

    public LunaRestResult<T> request() throws RestException {
        try {
            String url = uri + "?";
            for (Map.Entry<String, Object> parameter : parameters.entrySet()) {
                url += "&" + URLEncoder.encode(parameter.getKey(), Consts.UTF_8.name()) + "="
                        + URLEncoder.encode(parameter.getValue().toString(), Consts.UTF_8.name());
            }
            method.setURI(new URI(url));

            for (Map.Entry<String, String> header : headers.entrySet()) {
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

                LunaRestResult<T> result = gson.fromJson(new InputStreamReader(entity.getContent(), Consts.UTF_8),
                        new TypeToken<LunaRestResult<T>>() {
                        }.getType());

                return result;
            }
        } catch (Exception e) {
            logger.error(e);
            throw new RestException(e.getMessage());
        }
    }
}
