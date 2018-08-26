package com.visualbusiness.pano.process.web.rest;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.alibaba.fastjson.JSONObject;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.visualbusiness.common.config.SystemConfig;
import com.visualbusiness.common.model.SearchResult;
import com.visualbusiness.common.util.DateUtil;
import com.visualbusiness.common.web.rest.RestResult;
import com.visualbusiness.pano.process.model.PanoImage;
import com.visualbusiness.pano.process.model.PanoImageDigest;
import com.visualbusiness.pano.process.model.PanoMeta;
import com.visualbusiness.pano.process.service.PanoImageDigestService;
import com.visualbusiness.pano.process.service.PanoImageService;
import com.visualbusiness.pano.process.service.PanoMetaService;

@RestController
@RequestMapping("/pano")
public class PanoRestController {
	private static Logger logger = LogManager.getLogger(PanoRestController.class);

	@Autowired
	private PanoImageService panoImageService;
	
	@Autowired
	private PanoMetaService panoMetaService;
	
	@Autowired
	private PanoImageDigestService panoImageDigestService;
	
	private Gson gson = new Gson();
	
	private static final Map<String, List<Integer>> STATUS_MAP = new HashMap<String, List<Integer>>();
	
	static {
		
		STATUS_MAP.put("0", Arrays.asList(PanoImage.STATUS_PRIMITIVE_UPLOAD_UNFINISHED, PanoImage.STATUS_PRIMITIVE_UPLOAD_FINISHED));
		STATUS_MAP.put("1", Arrays.asList(PanoImage.STATUS_PRIMITIVE_DOWNLOAD_FINISHED, PanoImage.STATUS_STITCH_FINISHED, PanoImage.STATUS_SPLIT_FINISHED));
		STATUS_MAP.put("2", Arrays.asList(PanoImage.STATUS_TILE_UPLOAD_FINISHED, PanoImage.STATUS_STITCH_UPLOAD_FINISHED));
		STATUS_MAP.put("3", Arrays.asList(PanoImage.STATUS_ERROR));
	}

	/**
	 * 按处理状态检索全景图服务。
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/searchByStatus", method = {RequestMethod.GET})
	public RestResult<Map<String, Object>> searchByStatus(
			@RequestParam List<String> status,
			@RequestParam(defaultValue = "1") int fromPage,
			@RequestParam(defaultValue = "10") int size,
			@RequestParam(required= false) List<String> sort) {
		
		if (status == null || status.size() == 0) {
			return RestResult.errorResult("status参数未指定");
		}
		
		if (sort == null || sort.size() == 0) {
			sort = Arrays.asList("createTimeMillis:desc");
		}

		List<Integer> panoImageStatus = new ArrayList<Integer>();
		for (String s : status) {
			List<Integer> mappedStatus = STATUS_MAP.get(s);
			if (mappedStatus == null) {
				return RestResult.errorResult("status参数不正确：" + s);
			}
			panoImageStatus.addAll(mappedStatus);
		}
		
		SearchResult<List<PanoImage>> result = panoImageService.findByStatus(panoImageStatus, fromPage - 1, size, sort);
		
		List<Map<String, String>> searchResult = new ArrayList<Map<String,String>>();
		for (PanoImage panoImage : result.getResult()) {
			Map<String, String> map = new HashMap<String, String>();
			map.put("panoId", panoImage.getPanoId());
			map.put("panoMeta", panoImage.getPanoMeta());
			map.put("vendor", panoImage.getVendor());
			map.put("status", convertPanoImageStatus(panoImage.getStatus()));
			map.put("createDate", DateUtil.convertTimeToDateTime(panoImage.getCreateTimeMillis()));
			map.put("updateDate", DateUtil.convertTimeToDateTime(panoImage.getUpdateTimeMillis()));
			
			searchResult.add(map);
		}
		
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("total", result.getTotal());
		data.put("totalPage", (long)Math.ceil(result.getTotal() / (double)size));
		data.put("searchResult", searchResult);
		
		return RestResult.successResult(data);
    }

	
	/**
	 * 查询指定全景图的处理状态。
	 * @param panoId
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/status", method = {RequestMethod.GET})
	public RestResult<Map<String, String>> status(
			@RequestParam String panoId) {
		
		panoId = panoId.trim();
		if (StringUtils.isEmpty(panoId)) {
			return RestResult.errorResult("panoId参数未指定");
		}
		
		PanoImage panoImage = panoImageService.get(panoId);
		
		if (panoImage == null) {
			return RestResult.errorResult("全景图不存在:" + panoId);
		}
		
		int status = panoImage.getStatus();
		
		Map<String, String> data = new HashMap<String, String>();
		data.put("panoId", panoId);
		if(status >= 100) {
			data.put("status", "1");
		} else {
			data.put("status", convertPanoImageStatus(status));
		}

		if(status >= PanoImage.STATUS_TILE_UPLOAD_FINISHED) {
			data.put("thumbnail", SystemConfig.getCosTilesUrl() + panoImage.getThumbnail());
		}
		
		return RestResult.successResult(data);
    }
	
	private String convertPanoImageStatus(int panoImageStatus) {
		for (Entry<String, List<Integer>> statusMap : STATUS_MAP.entrySet()) {
			if (statusMap.getValue().contains(panoImageStatus)) {
				return statusMap.getKey();
			}
		}
		
		throw new RuntimeException("未识别的全景图状态：" + panoImageStatus);
	}

	/**
	 * 更新指定全景图的处理状态。
	 * @param panoId
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/status", method = {RequestMethod.PUT})
	public RestResult<Map<String, String>> statusUpdate(
			@RequestParam String panoId,
			@RequestParam String status,
			@RequestParam(required=false) String thumbnail) {
		
		panoId = panoId.trim();
		if (StringUtils.isEmpty(panoId)) {
			return RestResult.errorResult("panoId参数未指定");
		}
		
		status = status.trim();
		if (StringUtils.isEmpty(status)) {
			return RestResult.errorResult("status参数未指定");
		}
		
		PanoImage panoImage = panoImageService.get(panoId);
		
		if (panoImage == null) {
			return RestResult.errorResult("全景图不存在:" + panoId);
		}
		
		panoImageService.updateStatus(panoId, status, thumbnail);
		
		return RestResult.successResult();
    }

	/**
	 * 获取指定全景图的元数据。
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/meta/get", method = {RequestMethod.GET})
	public RestResult<Map<String, String>> getMeta(
			@RequestParam String panoId) {
		
		if (StringUtils.isEmpty(panoId)) {
			return RestResult.errorResult("panoId参数未指定");
		}

		PanoImage panoImage = panoImageService.get(panoId);
		
		if (panoImage == null) {
			return RestResult.errorResult("全景图不存在:" + panoId);
		}
		
		List<PanoMeta> panoMetaList = panoMetaService.findByPanoId(panoId);
		
		Map<String, String> data = new HashMap<String, String>();
		
		for (PanoMeta panoMeta : panoMetaList) {
			data.put(panoMeta.getMetaName(), panoMeta.getMetaValue());
		}
		
		return RestResult.successResult(data);
    }

	/**
	 * 保存全景图的元数据。已有数据会被删除。
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/meta/create", method = {RequestMethod.PUT})
	public RestResult<Map<String, String>> createMeta(
			@RequestBody Map<String, Object> data) {
		
		String panoId = (String)data.get("panoId");
		if (StringUtils.isEmpty(panoId)) {
			return RestResult.errorResult("数据中未包含panoId");
		}

		PanoImage panoImage = panoImageService.get(panoId);
		
		if (panoImage == null) {
			return RestResult.errorResult("全景图不存在:" + panoId);
		}
		
		fixMeta(data);
		
		panoMetaService.savePanoMetas(panoId, data);
		
		panoImageService.callRecreateSearchIndex(panoId);
		
		return RestResult.successResult();
    }

	/**
	 * 替换全景图的元数据。已有数据在新数据中不存在会被删除。
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/meta/replace", method = {RequestMethod.PUT})
	public RestResult<Map<String, String>> replaceMeta(
			@RequestParam String panoId,
			@RequestBody Map<String, Object> data) {
		
		if (StringUtils.isEmpty(panoId)) {
			return RestResult.errorResult("panoId参数未指定");
		}

		PanoImage panoImage = panoImageService.get(panoId);
		
		if (panoImage == null) {
			return RestResult.errorResult("全景图不存在:" + panoId);
		}
		
		fixMeta(data);
		
		panoMetaService.replacePanoMetas(panoId, data);
		
		panoImageService.callRecreateSearchIndex(panoId);
		
		return RestResult.successResult();
    }

	/**
	 * 更新全景图的元数据。已有数据在新数据中不存在不会被删除。
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/meta/update", method = {RequestMethod.PUT})
	public RestResult<Map<String, String>> updateMeta(
			@RequestBody Map<String, Object> data) {

		String panoId = (String)data.get("panoId");
		if (StringUtils.isEmpty(panoId)) {
			return RestResult.errorResult("panoId参数未指定");
		}

		PanoImage panoImage = panoImageService.get(panoId);

		if (panoImage == null) {
			return RestResult.errorResult("全景图不存在:" + panoId);
		}

		fixMeta(data);

		panoMetaService.updatePanoMetas(panoId, data);

		panoImageService.callRecreateSearchIndex(panoId);

		return RestResult.successResult();
	}

	/**
	 * 批量更新全景图的元数据。已有数据在新数据中不存在不会被删除。索引重建由调用侧负责。
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/meta/batchUpdate", method = {RequestMethod.PUT})
	public RestResult<Map<String, String>> batchUpdateMeta(
			@RequestBody List<Map<String, Object>> dataList) {
		
		for (Map<String, Object> data : dataList) {
			String panoId = (String)data.get("panoId");
			if (StringUtils.isEmpty(panoId)) {
				return RestResult.errorResult("数据中未包含panoId");
			}

			PanoImage panoImage = panoImageService.get(panoId);
			
			if (panoImage == null) {
				return RestResult.errorResult("全景图不存在:" + panoId);
			}
			
			fixMeta(data);
			
			panoMetaService.updatePanoMetas(panoId, data);
			
			//索引重建由调用侧负责
		}
		
		return RestResult.successResult();
    }
	
	/**
	 * 修改全景图所属供应商
	 * @param panoId
	 * @param vendor
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/changeVendor", method = {RequestMethod.PUT, RequestMethod.GET})
	public RestResult<Map<String, String>> changeVendor(
			@RequestParam String panoId,
			@RequestParam String vendor) {
		
		if (StringUtils.isEmpty(panoId)) {
			return RestResult.errorResult("panoId参数未指定");
		}
		if (StringUtils.isEmpty(vendor)) {
			return RestResult.errorResult("vendor参数未指定");
		}

		PanoImage panoImage = panoImageService.get(panoId);
		
		if (panoImage == null) {
			return RestResult.errorResult("全景图不存在:" + panoId);
		}
		
		panoImage.setVendor(vendor);
		panoImageService.saveOrUpdate(panoImage);
		
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("vendor", vendor);
		panoMetaService.updatePanoMetas(panoId, data);
		
		panoImageService.callRecreateSearchIndex(panoId);
		
		return RestResult.successResult();
    }

	/**
	 * 重新进行全景图处理。
	 * @param panoId
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/reprocess", method = {RequestMethod.PUT, RequestMethod.GET}) //TODO GET只是测试时用的
	public RestResult<JSONObject> reprocess(
			@RequestParam String panoId) {

		panoId = panoId.trim();
		if (StringUtils.isEmpty(panoId)) {
			return RestResult.errorResult("panoId参数未指定");
		}
		
		PanoImage panoImage = panoImageService.get(panoId);

		if (panoImage == null) {
			return RestResult.errorResult("全景图不存在:" + panoId);
		}

        JSONObject result = panoImageService.reprocessPanoImage(panoImage);

		return RestResult.successResult(result);
    }

	/**
	 * 重新进行全景图处理。
	 * @param panoIdList
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/batchReprocess", method = {RequestMethod.PUT, RequestMethod.GET}) //TODO GET只是测试时用的
	public RestResult<List<JSONObject>> batchReprocess(
			@RequestBody List<String> panoIdList) {

		if (StringUtils.isEmpty(panoIdList)) {
			return RestResult.errorResult("panoId参数未指定");
		}

		List<JSONObject> jsonObjectList = panoImageService.batchReprocessPanoImage(panoIdList);

		return RestResult.successResult(jsonObjectList);
	}


	/**
	 *
	 * @param panoId
	 * @param panoMetaPath
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/autoStitch", method = {RequestMethod.POST, RequestMethod.GET}) //TODO GET只是测试时用的
	public RestResult<JSONObject> stitch(
			@RequestParam String panoId,
			@RequestParam String panoMetaPath) {

		panoId = panoId.trim();
		if (StringUtils.isEmpty(panoId)) {
			return RestResult.errorResult("panoId参数未指定");
		}

		panoMetaPath = panoMetaPath.trim();
		if (StringUtils.isEmpty(panoMetaPath)) {
			return RestResult.errorResult("panoMetaPath参数未指定");
		}

		//状态校验
		PanoImage panoImageExist = panoImageService.get(panoId);
		if(panoImageExist != null && panoImageExist.getStatus() != null && !panoImageExist.getStatus().equals(PanoImage.STATUS_ERROR)) {
			return RestResult.errorResult("全景图正在处理或处理成功");
		}

        JSONObject jsonObject;
		try {
			jsonObject = panoImageService.autoStitch(panoId, panoMetaPath);
		} catch (Exception e) {
			return RestResult.errorResult("自动拼接失败" + e.getMessage());
		}

		return RestResult.successResult(jsonObject);
	}

	/**
	 * 批量拼接服务
	 * @param paraMapList
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/batchAutoStitch", method = {RequestMethod.POST, RequestMethod.GET}) //TODO GET只是测试时用的
	public RestResult<List<JSONObject>> batchStitch(
			@RequestBody List<JSONObject> paraMapList) {

		List<JSONObject> result = new ArrayList<>();

		List<String> panoIdList = new ArrayList<>();
		JSONObject processJsonObject = new JSONObject();

		for(JSONObject paraMap : paraMapList) {
			String panoId = paraMap.getString("panoId").trim();
			String panoMetaPath = paraMap.getString("panoMetaPath").trim();

			if(!StringUtils.isEmpty(panoId) && !StringUtils.isEmpty(panoMetaPath)) {
				processJsonObject.put(panoId, panoMetaPath);
				panoIdList.add(panoId);
			} else if(!StringUtils.isEmpty(panoId)) {
                addFailedResult(result, panoId, "参数不完整");
				continue;
			}
		}

		//状态校验
		Iterable<PanoImage> panoImagesExist = panoImageService.findAll(panoIdList);
		for(PanoImage panoImage : panoImagesExist) {
			if(panoImage.getStatus() != null && !panoImage.getStatus().equals(PanoImage.STATUS_ERROR)) {
				processJsonObject.remove(panoImage.getPanoId());
                addFailedResult(result, panoImage.getPanoId(), "全景图正在处理或处理成功");
			}
		}

		if(processJsonObject.isEmpty()) {
			return RestResult.successResult(result);
		}

		try {
			result.addAll(panoImageService.batchAutoStitch(processJsonObject));
		} catch (Exception e) {
			return RestResult.errorResult("自动拼接失败" + e.getMessage());
		}

		return RestResult.successResult(result);
	}



	/**
	 * 进行全景图处理。
	 * @param panoId
	 * @param panoMetaPath
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/process", method = {RequestMethod.POST, RequestMethod.GET}) //TODO GET只是测试时用的
	public RestResult<Map<String, String>> process(
			@RequestParam String panoId,
			@RequestParam String panoMetaPath) {

		panoId = panoId.trim();
		if (StringUtils.isEmpty(panoId)) {
			return RestResult.errorResult("panoId参数未指定");
		}
		
		panoMetaPath = panoMetaPath.trim();
		if (StringUtils.isEmpty(panoMetaPath)) {
			return RestResult.errorResult("panoMetaPath参数未指定");
		}
		
		panoImageService.processPanoImage(panoId, panoMetaPath);
		
		return RestResult.successResult();
    }

	/**
	 * 进行供应商全景图处理。
	 * @param panoId
	 * @param panoMetaPath
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/vendor/process", method = {RequestMethod.POST, RequestMethod.GET}) //TODO GET只是测试时用的
	public RestResult<JSONObject> process(
			@RequestParam String panoId,
			@RequestParam String panoMetaPath,
			@RequestParam String digest,
			@RequestParam String vendor,
			@RequestParam(required=false) boolean ugent) {

		panoId = panoId.trim();
		if (StringUtils.isEmpty(panoId)) {
			return RestResult.errorResult("panoId参数未指定");
		}
		
		panoMetaPath = panoMetaPath.trim();
		if (StringUtils.isEmpty(panoMetaPath)) {
			return RestResult.errorResult("panoMetaPath参数未指定");
		}
		
		vendor = vendor.trim();
		if (StringUtils.isEmpty(vendor)) {
			return RestResult.errorResult("vendor参数未指定");
		}
		
		digest = digest.trim();
		if (StringUtils.isEmpty(digest)) {
			return RestResult.errorResult("digest参数未指定");
		}

		List<PanoImageDigest> panoImageDigests = panoImageDigestService.findByOrginalPhotoDigest(digest);
		if (panoImageDigests.size() > 0) {
			logger.debug(panoId+"图片文件以及被上传过，panos:" + gson.toJson(panoImageDigests.toArray()));
			return RestResult.errorResult("图片文件以及被上传过，panos:" + gson.toJson(panoImageDigests.toArray()));
		}

        //状态校验
        PanoImage panoImageExist = panoImageService.get(panoId);
        if(panoImageExist != null &&
				panoImageExist.getStatus() != null &&
				!panoImageExist.getStatus().equals(PanoImage.STATUS_PRIMITIVE_COS_UPLOAD_INISHED) &&
				!panoImageExist.getStatus().equals(PanoImage.STATUS_ERROR)
				) {
            logger.info("全景图正在处理或处理完成,panoId="+panoId);
            return RestResult.errorResult("全景图正在处理货处理完成");
        }


        JSONObject result = panoImageService.processVendorPanoImage(panoId, panoMetaPath, digest, vendor, ugent);

		return RestResult.successResult(result);
    }

	@CrossOrigin
	@RequestMapping(value="/vendor/batchProcess", method = {RequestMethod.POST, RequestMethod.GET}) //TODO GET只是测试时用的
	public RestResult<List<JSONObject>> process(
			@RequestBody List<JSONObject> paraMapList) {

		List<JSONObject> result = new ArrayList<>();

		List<String> panoIdList = new ArrayList<>();
		JSONObject processJsonObject = new JSONObject();
		for(JSONObject paraMap : paraMapList) {



			String panoId= paraMap.getString("panoId").trim();
			String panoMetaPath= paraMap.getString("panoMetaPath").trim();
			String vendor= paraMap.getString("vendor").trim();
			String digest= paraMap.getString("digest").trim();

			panoId = panoId.trim();
			if (StringUtils.isEmpty(panoId)) {
				continue;
			}

			if (StringUtils.isEmpty(panoMetaPath) || StringUtils.isEmpty(vendor) || StringUtils.isEmpty(digest)) {
                addFailedResult(result, panoId, "参数不完整");
				continue;
			}

			List<PanoImageDigest> panoImageDigestList = panoImageDigestService.findByOrginalPhotoDigest(digest);
			if (panoImageDigestList.size() > 0) {
                addFailedResult(result, panoId, "图片文件以及被上传过，panos:" + gson.toJson(panoImageDigestList.toArray()));
				continue;
			}

			panoIdList.add(panoId);
			processJsonObject.put(panoId, paraMap);
		}

		//状态校验
		Iterable<PanoImage> panoImagesExist = panoImageService.findAll(panoIdList);
		for(PanoImage panoImage : panoImagesExist) {
			if(panoImage.getStatus() != null && !panoImage.getStatus().equals(PanoImage.STATUS_ERROR)) {
				processJsonObject.remove(panoImage.getPanoId());
                addFailedResult(result, panoImage.getPanoId(), "全景图正在处理");
			}
		}


		//调用批量处理函数
		result.addAll(panoImageService.batchProcessVendorPanoImage(processJsonObject.values()));
		return RestResult.successResult(result);
	}

	/**
	 * 进行供应商全景图处理。
	 * @param digest
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/panoIdByDigest")
	public RestResult<List<Map<String, String>>> getPanoIdByDigest(
			@RequestParam String digest) {

		digest = digest.trim();
		if (StringUtils.isEmpty(digest)) {
			return RestResult.errorResult("digest参数未指定");
		}
		
		List<PanoImageDigest> panoImageDigests = panoImageDigestService.findByOrginalPhotoDigest(digest);
		
		List<Map<String, String>> data = new ArrayList<Map<String,String>>();
		for (PanoImageDigest panoImageDigest : panoImageDigests) {
			Map<String, String> item = new HashMap<String, String>();
			item.put("panoId", panoImageDigest.getPanoId());
			data.add(item);
		}

		return RestResult.successResult(data);
    }

	/**
	 * 取得指定全景图的提取码。
	 * @param panoId
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/accessCode")
	public RestResult<Map<String, String>> accessCode(
			@RequestParam String panoId) {

		panoId = panoId.trim();
		if (StringUtils.isEmpty(panoId)) {
			return RestResult.errorResult("panoId参数未指定");
		}
		
		String accessCode = panoImageService.createAccessCode(panoId);
		
		Map<String, String> data = new HashMap<String, String>();
		data.put("panoId", panoId);
		data.put("accessCode", accessCode);
		
		return RestResult.successResult(data);
    }

	/**
	 * 取得全景图显示引擎网址。
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/viewerUrl")
	public RestResult<Map<String, String>> viewerUrl() {
		
		Map<String, String> data = new HashMap<String, String>();
		data.put("url", SystemConfig.getEngineServerUrl() + "vbpano/PanoViewer.html");
		
		return RestResult.successResult(data);
    }

    private void addFailedResult(List<JSONObject> jsonObjectList, String panoId, String msg) {
	    JSONObject jsonObject = new JSONObject();
        jsonObject.put("panoId", panoId);
        jsonObject.put("waitingTime", "-1");
        jsonObject.put("msg", msg);

    }
	
	
	//元数据修正处理
	private void fixMeta(Map<String, Object> data) {
		data.remove("panoId");
		data.remove("photos");
		data.remove("thumbnailUrl");
		data.remove("captureDate");
		
		if (data.containsKey("markers")) {
			Object markers = data.get("markers");
			if (!(markers instanceof String)) {
				data.put("markers",gson.toJson(markers));
			}
		}
		
		if (data.containsKey("dayNight")) {
			data.put("dayNight",  convertDayNightValue(data.get("dayNight").toString()));
		}

		if (data.containsKey("season")) {
			data.put("season",  convertSeasonValue(data.get("season").toString()));
		}

		if (data.containsKey("viewAngle")) {
			data.put("viewAngle",  convertViewAngleValue(data.get("viewAngle").toString()));
		}

		if (data.containsKey("deviceType")) {
			data.put("deviceType",  convertDeviceTypeValue(data.get("deviceType").toString()));
		}
	}
	
	private static final String[][] DAY_NIGHT_NAME_VALUES = {{"日景", "1"}, {"夜景", "2"}};
	private String convertDayNightValue(String name) {
		return convertValue(name, DAY_NIGHT_NAME_VALUES);
	}
	
	private static final String[][] SEASON_NAME_VALUES = {{"春", "1"}, {"夏", "2"}, {"秋", "3"}, {"冬", "4"}};
	private String convertSeasonValue(String name) {
		return convertValue(name, SEASON_NAME_VALUES);
	}
	
	private static final String[][] VIEW_ANGLE_NAME_VALUES = {{"平视", "1"}, {"俯视", "2"}, {"仰视", "3"}, {"其他", "4"}, {"视角一", "4"}, {"视角二", "5"}, {"视角三", "6"}};
	private String convertViewAngleValue(String name) {
		return convertValue(name, VIEW_ANGLE_NAME_VALUES);
	}
	
	private static final String[][] DEVICE_TYPE_NAME_VALUES = {{"采集车", "1"}, {"手持相机", "2"}, {"VBPano", "3"}, {"无人机", "4"}, {"高杆", "5"}, {"VR", "6"}, {"其他", "7"}};
	private String convertDeviceTypeValue(String name) {
		return convertValue(name, DEVICE_TYPE_NAME_VALUES);
	}
	
	private String convertValue(String name, String[][] nameValues) {
		for (String[] nameValue : nameValues) {
			if (nameValue[0].equals(name)) {
				return nameValue[1];
			}
		}
		
		return name;
	}
}
