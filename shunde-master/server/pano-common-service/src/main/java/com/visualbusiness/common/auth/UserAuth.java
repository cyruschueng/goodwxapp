package com.visualbusiness.common.auth;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.apache.http.Consts;
import org.apache.http.HttpEntity;
import org.apache.http.HttpStatus;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.shiro.SecurityUtils;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.visualbusiness.common.config.SystemConfig;
import com.visualbusiness.common.redis.ObjectRedis;
import com.visualbusiness.common.redis.Redis;

public class UserAuth {
	private static final int BUFFER_SIZE = 1024;
	private static Logger logger = LogManager.getLogger(UserAuth.class);
	
	private static final String LUNA_USERNAME_LOGIN_URL = SystemConfig.getLunaUsernameLoginUrl();
	private static final String LUNA_TOKEN_LOGIN_URL = SystemConfig.getLunaTokenLoginUrl();

	// TODO:
	private static final String VIZEN_ACCESS_TOKEN_URL = SystemConfig.getLunaTokenLoginUrl();

	private static final String USER_INFO_PREFIX = "pano:user-info:";
	private static final int USER_INFO_EXPIRE_TIME = 60 * 60 * 24; // 秒

	public static UserInfo lunaUserNameLogin(String userName, String password) {
		Gson gson = new Gson();

		List<NameValuePair> param = new ArrayList<NameValuePair>();
		param.add(new BasicNameValuePair("luna_name", userName));
		param.add(new BasicNameValuePair("password", password));

		String url = LUNA_USERNAME_LOGIN_URL;
		HttpPost httpPost = new HttpPost(url);
		try {
			httpPost.setEntity(new UrlEncodedFormEntity(param, Consts.UTF_8.name()));;
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			logger.error(e);
			return null;
		}

		CloseableHttpClient httpclient = HttpClients.createDefault();
 		try (CloseableHttpResponse response = httpclient.execute(httpPost)) {
			int statusCode = response.getStatusLine().getStatusCode();
			if (statusCode != HttpStatus.SC_OK) {
				return null;
			}

			HttpEntity entity = response.getEntity();
			if (entity == null) {
				return null;
			}

			LunaRestResult<LunaUserInfo> result = gson.fromJson(new InputStreamReader(entity.getContent(), Consts.UTF_8.name()),
					new TypeToken<LunaRestResult<LunaUserInfo>>() {
					}.getType());

			if ("0".equals(result.getCode())) {
				LunaUserInfo lunaUserInfo = result.getData();
				UserInfo userInfo = convertToUserInfo(lunaUserInfo);
				cacheUserInfo(userInfo);
				return userInfo;
			} else {
				logger.info("用户认证失败：username=" + userName + "，" + result.getMsg());
				return null;
			}

		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return null;
		}
	}

	public static UserInfo lunaTokenLogin(String token, String uniqueId) {
		Gson gson = new Gson();

		String url = LUNA_TOKEN_LOGIN_URL + "?token=" + token + "&unique_id=" + uniqueId;
		HttpGet httpGet = new HttpGet(url);

		logger.info("lunaTokenLogin ######## " + url);
		CloseableHttpClient httpclient = HttpClients.createDefault();
		try (CloseableHttpResponse response = httpclient.execute(httpGet)) {
			int statusCode = response.getStatusLine().getStatusCode();
			if (statusCode != HttpStatus.SC_OK) {
				return null;
			}

			HttpEntity entity = response.getEntity();
			if (entity == null) {
				return null;
			}

			InputStreamReader is = new InputStreamReader(entity.getContent(), Consts.UTF_8.name());
			BufferedReader reader = new BufferedReader(is);

			char[] b = new char[BUFFER_SIZE];
			int len;
			StringBuilder sb = new StringBuilder();

			while ((len = reader.read(b, 0, BUFFER_SIZE)) != -1) {
				sb.append(new String(b, 0, len));
			}
			System.out.println(sb);

			logger.info("lunaTokenLogin  sb ######## " + sb);
			LunaRestResult<LunaUserInfo> result = gson.fromJson(sb.toString(), new TypeToken<LunaRestResult<LunaUserInfo>>() {
			}.getType());

			if ("0".equals(result.getCode())) {
				LunaUserInfo lunaUserInfo = result.getData();
				UserInfo userInfo = convertToUserInfo(lunaUserInfo);
				cacheUserInfo(userInfo);

				logger.info("if (\"0\".equals(result.getCode())) ######## " + userInfo.toString());

				return userInfo;
			} else {
				logger.info("用户认证失败：token=" + token + "，" + result.getMsg());
				return null;
			}

		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return null;
		}
	}
	
	private static UserInfo convertToUserInfo(LunaUserInfo lunaUserInfo) {
//		String userToken = UUID.randomUUID().toString().replaceAll("-", "").toUpperCase();

		UserInfo userInfo = new UserInfo();
		userInfo.setUserId(lunaUserInfo.getUniqueId());
//		userInfo.setUserToken(userToken);
		//token 使用uniqueId
		userInfo.setUserToken(lunaUserInfo.getUniqueId());
		userInfo.setUserName(lunaUserInfo.getLunaName());
		userInfo.setName(lunaUserInfo.getNickName());
		Integer roleId = lunaUserInfo.getRoleId();
		if (roleId != null) {
			userInfo.getRoles().add(roleId.toString());
		}

		List<String> panoAuths = lunaUserInfo.getPanoAuth();
		if (panoAuths != null) {
			for (String panoAuth : panoAuths) {
				userInfo.getPermissions().add(panoAuth);
			}
		}
		String vendor = lunaUserInfo.getVendor();
		if(vendor != null) {
			userInfo.setVendor(vendor);
		} else {
			userInfo.setVendor(lunaUserInfo.getLunaName());
		}

		return userInfo;
	}

	public static void cacheAccessToken() {

	}

	public static void cacheUserInfo(UserInfo userInfo) {
		String redisKey = USER_INFO_PREFIX + userInfo.getUserId();
		ObjectRedis.setex(redisKey, USER_INFO_EXPIRE_TIME, userInfo);
	}

	public static UserInfo getUserInfo(String userId) {
		String redisKey = USER_INFO_PREFIX + userId;
		UserInfo userInfo = ObjectRedis.get(redisKey, UserInfo.class);

		if (userInfo != null) {
			Redis.expire(redisKey, USER_INFO_EXPIRE_TIME);
			return userInfo;
		}

		return null;
	}


	public static void deleteCachedUserInfo(String userId) {
		String redisKey = USER_INFO_PREFIX + userId;
		ObjectRedis.del(redisKey);
	}

	public static String getCurrentUserName() {
		Object principal = SecurityUtils.getSubject().getPrincipal();
		return principal == null ? null : principal.toString();
	}
	
	public static UserInfo getCurrentUserInfo() {
		String userId = (String)SecurityUtils.getSubject().getSession().getAttribute(LunaUserRealm.USER_TOKEN_SESSION_KEY);
		return getUserInfo(userId);
	}

}
