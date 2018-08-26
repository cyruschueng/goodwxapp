/*
 * Copyright (c)  $year - $year Microscene Inc., All Rights Reserved.
 *
 * @author: mark@vizen.cn
 * @Date: 2018.
 */

package com.visualbusiness.pano.process.service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.github.kevinsawicki.http.HttpRequest;
import com.visualbusiness.common.config.SystemConfig;
import com.visualbusiness.common.util.SignUtil;
import com.visualbusiness.pano.process.dao.PanoImageDao;
import com.visualbusiness.pano.process.dao.PanoMetaDao;
import com.visualbusiness.pano.process.model.PanoImage;
import com.visualbusiness.pano.process.model.PanoMeta;
import com.visualbusiness.pano.process.service.ImmigrationService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

@Service("immigrationService")
public class ImmigrationServiceImpl implements ImmigrationService {
	private static Logger logger = LogManager.getLogger(ImmigrationServiceImpl.class);
	private static final String immigrationPanodataUrl = SystemConfig.getImmigrationPanodataUrl();

	@Autowired
	private PanoMetaDao panoMetaDao;

	@Autowired
	private PanoImageDao panoImageDao;

	private static final String vendor = SystemConfig.getVendor();
	private static final String secret = SystemConfig.getSecret();

	@Transactional(rollbackFor=Exception.class)
	@Override
	public int immigratePanoMetaImage(long time) {
		PanoMeta panoMeta = null;

		int panoBlock = 100;
		int offset = 0;

		Set<String> deletedMetaPanoId = new HashSet<>();
		do {
			// 签名计算
			Map<String, String> signParams = new TreeMap<>();
			signParams.put("time", String.valueOf(time));
			signParams.put("vendor", vendor);
			signParams.put("secret", secret);
			String sign = SignUtil.sign(signParams);

			// 获取panoid列表
			Map<String, String> data = new HashMap<>();
			data.put("time", String.valueOf(time));
			data.put("vendor", vendor);
			data.put("offset", String.valueOf(offset));
			data.put("limit", String.valueOf(panoBlock));
			data.put("sign", sign);

			HttpRequest request = HttpRequest.post(immigrationPanodataUrl+"pano/list-id").form(data);
			if (request.code() != 200) {
				String errMsg = String.format("对接系统状态码出错:%s", request.code());
				logger.error(errMsg);
				throw new RuntimeException(errMsg);
			}
			String body = request.body();
			logger.info(String.format("系统对接响应结果：%s", body));
			JSONObject jsonResult = JSONObject.parseObject(body);
			int code = jsonResult.getInteger("code");
			if (code != 0) {
				logger.error(jsonResult.getString("msg"));
				throw new RuntimeException("接口信息有误.");
			}

			// 已经没有数据了
			JSONArray panoIds = jsonResult.getJSONArray("data");
			if (panoIds.size() == 0) {
				break;
			}

			// 处理meta数据(block)
			// 签名计算
			signParams.clear();
			signParams.put("vendor", vendor);
			signParams.put("secret", secret);
			sign = SignUtil.sign(signParams);
			List<String> params = new ArrayList<>();
			for (int i = 0; i < panoIds.size(); i++) {
				params.add(panoIds.getString(i));
			}
			// form data 数据
			Map<String, Object> block = new HashMap<>();
			block.put("panoIds", params);
			block.put("vendor", vendor);
			block.put("sign", sign);
			request = HttpRequest.post(immigrationPanodataUrl+"pano/list-meta").form(block);
			if (request.code() != 200) {
				String errMsg = String.format("对接系统状态码出错:%s", request.code());
				logger.error(errMsg);
				throw new RuntimeException(errMsg);
			}

			body = request.body();
			logger.info(String.format("系统对接响应结果：%s", body));
			jsonResult = JSONObject.parseObject(body);
			code = jsonResult.getInteger("code");
			if (code != 0) {
				logger.error(jsonResult.getString("msg"));
				throw new RuntimeException("接口信息有误.");
			}

			// 更新pano meta 信息
			JSONArray panoMetas = jsonResult.getJSONArray("data");
			for (int j = 0; j < panoMetas.size(); j++) {
				panoMeta = JSONObject.toJavaObject(panoMetas.getJSONObject(j), PanoMeta.class);
				if (!deletedMetaPanoId.contains(panoMeta.getPanoId())) {
					try {
						panoMetaDao.deletePanoMetaByPanoIdEquals(panoMeta.getPanoId());
						deletedMetaPanoId.add(panoMeta.getPanoId());
					} catch (Exception e) {
						// do nothing
						e.printStackTrace();
					}
				}
				panoMetaDao.save(panoMeta);
			}

			// 处理image数据(block)
			// 签名计算
			signParams.clear();
			signParams.put("vendor", vendor);
			signParams.put("secret", secret);
			sign = SignUtil.sign(signParams);

			// form data 数据
			block.clear();
			block.put("panoIds", params);
			block.put("vendor", vendor);
			block.put("sign", sign);

			// 获取相应的pano image信息
			request = HttpRequest.post(immigrationPanodataUrl+"pano/list-image").form(block);
			if (request.code() != 200) {
				String errMsg = String.format("对接系统状态码出错:%s", request.code());
				logger.error(errMsg);
				throw new RuntimeException(errMsg);
			}

			body = request.body();
			logger.info(String.format("系统对接响应结果：%s", body));
			jsonResult = JSONObject.parseObject(body);
			code = jsonResult.getInteger("code");
			if (code != 0) {
				logger.error(jsonResult.getString("msg"));
				throw new RuntimeException("接口信息有误.");
			}

			// 更新pano image信息
			JSONArray panoImages = jsonResult.getJSONArray("data");
			for (int i = 0; i < panoImages.size(); i++) {
				System.out.println(panoImages.getJSONObject(i));
				PanoImage panoImage = JSONObject.toJavaObject(panoImages.getJSONObject(i), PanoImage.class);
				panoImageDao.save(panoImage);
			}

			offset += panoIds.size();
		} while(true);

		return offset;
	}

}
