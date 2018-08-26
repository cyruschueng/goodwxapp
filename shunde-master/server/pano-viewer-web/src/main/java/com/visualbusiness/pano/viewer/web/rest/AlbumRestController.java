package com.visualbusiness.pano.viewer.web.rest;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.logging.SimpleFormatter;

import com.alibaba.fastjson.JSON;
import com.visualbusiness.pano.viewer.model.AlbumSearchCondition;
import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.visualbusiness.common.auth.UserAuth;
import com.visualbusiness.common.model.SearchResult;
import com.visualbusiness.common.web.rest.RestResult;
import com.visualbusiness.pano.viewer.model.Album;
import com.visualbusiness.pano.viewer.model.AlbumSearchResult;
import com.visualbusiness.pano.viewer.model.Pano;
import com.visualbusiness.pano.viewer.model.PanoAlbum;
import com.visualbusiness.pano.viewer.model.PanoAlbumLang;
import com.visualbusiness.pano.viewer.model.PanoWithThumbnails;
import com.visualbusiness.pano.viewer.service.AlbumLangService;
import com.visualbusiness.pano.viewer.service.AlbumService;

@SuppressWarnings("SpringJavaAutowiringInspection")
@RestController
@RequestMapping("/album")
public class AlbumRestController {
	private static Logger logger = LogManager.getLogger(AlbumRestController.class);

	@Autowired
	private AlbumService albumService;

	@Autowired
	private AlbumLangService albumLangService;

	/**
	 * 取得指定全景图所属的相册信息，包括相册内所有内页及全景图的信息。
	 * @param panoId
	 * @return
	 */
	@CrossOrigin(allowCredentials="false")
	@RequestMapping(value={"", "/byPanoId"}, method = {RequestMethod.GET})
	public RestResult<Album<PanoWithThumbnails>> getAlbumByPanoId(
			@RequestParam String panoId) {
		
		panoId = panoId.trim();
		if (StringUtils.isEmpty(panoId)) {
			return RestResult.errorResult("panoId参数未指定");
		}
		try {
			Album<PanoWithThumbnails> data = albumService.findByPanoIdWithFullInfo(panoId);
			return RestResult.successResult(data);
		} catch (Exception e) {
			logger.error("findByPanoIdWithFullInfo Error! "+e.getMessage());
			return RestResult.errorResult("获取相册信息失败");
		}

		

    }
	
	/**
	 * 取得指定指定一个或多个相册所属的全景图的信息。
	 * @param albumIds
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="getPanos", method = {RequestMethod.GET, RequestMethod.POST})
	public RestResult<List<Pano>> getPanos(
			@RequestParam List<String> albumIds) {
		
		if (albumIds == null || albumIds.size() == 0) {
			return RestResult.errorResult("albumIds参数未指定");
		}
		
		List<Pano> data = albumService.getPanos(albumIds);
		
		return RestResult.successResult(data);
    }
		
	/**
	 * 新建相册。
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/create", method = {RequestMethod.POST})
	public RestResult<PanoAlbum> create(@RequestBody Map<String, String> data) {
		
		String albumContent = data.get("albumContent");
		
		if (StringUtils.isEmpty(albumContent)) {
			return RestResult.errorResult("没有数据");
		}
		
		String albumId = UUID.randomUUID().toString().replaceAll("-", "").toUpperCase();
		
		String userName = UserAuth.getCurrentUserName();
		logger.info("用户" + userName + "新建相册,albumId=" + albumId);
		
		PanoAlbum panoAlbum = new PanoAlbum();
		panoAlbum.setAlbumId(albumId);
		panoAlbum.setAlbumContent(albumContent);
		panoAlbum.setCreateUser(userName);
		
		albumService.saveOrUpdate(panoAlbum);
		
		boolean indexResult = albumService.recreateSearchIndex(albumId);
		if (!indexResult) {
			return RestResult.errorResult("相册保存成功，但是相册数据格式有错误");
		}

		PanoAlbum updatedPanoAlbum = albumService.get(albumId);
		
		return RestResult.successResult(updatedPanoAlbum);
    }
	
	/**
	 * 根据指定panoId的基础数据定义的层级关系，创建默认相册。
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/createDefault", method = {RequestMethod.POST})
	public RestResult<PanoAlbum> createDefault(
			@RequestParam String panoId,
			@RequestParam String albumName) {
		
		panoId = panoId.trim();
		if (StringUtils.isEmpty(panoId)) {
			return RestResult.errorResult("panoId参数未指定");
		}
		albumName = albumName.trim();
		if (StringUtils.isEmpty(albumName)) {
			return RestResult.errorResult("albumName参数未指定");
		}
		
		Album<PanoWithThumbnails> album = albumService.findByPanoIdWithFullInfo(panoId);
		album.setAlbumName(albumName);
		
		if (album == null) {
			return RestResult.errorResult("指定的panoId没有默认相册");
		}
		
		String albumId = UUID.randomUUID().toString().replaceAll("-", "").toUpperCase();
		String userName = UserAuth.getCurrentUserName();
		logger.info("用户" + userName + "新建默认相册,albumId=" + albumId);
		
		Gson gson = new Gson();
		String albumContent = gson.toJson(album);

		PanoAlbum panoAlbum = new PanoAlbum();
		panoAlbum.setAlbumId(albumId);
		panoAlbum.setAlbumContent(albumContent);
		panoAlbum.setCreateUser(userName);
		
		albumService.saveOrUpdate(panoAlbum);
		
		boolean indexResult = albumService.recreateSearchIndex(albumId);
		if (!indexResult) {
			return RestResult.errorResult("相册保存成功，但是相册数据格式有错误");
		}

		PanoAlbum updatedPanoAlbum = albumService.get(albumId);
		
		return RestResult.successResult(updatedPanoAlbum);
    }

	/**
	 * 更新相册。
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/update", method = {RequestMethod.POST})
	public RestResult<? extends Object> update(
			@RequestBody PanoAlbum panoAlbum,
			@RequestParam(required=false) String lang,
			@RequestParam(defaultValue="false") boolean updateMeta) {
		
		if (panoAlbum == null) {
			return RestResult.errorResult("没有数据");
		}
		
		String albumId = panoAlbum.getAlbumId();
		
		String userName = UserAuth.getCurrentUserName();
		logger.info("用户" + userName + "更新相册,albumId=" + albumId + ",lang=" + lang + ",更新内容: " + JSON.toJSON(panoAlbum.getAlbumContent()));

		if (StringUtils.isEmpty(lang)) {
			//默认语言相册
			PanoAlbum existPanoAlbum = albumService.get(albumId);
			if (existPanoAlbum == null) {
				return RestResult.errorResult("要更新的相册不存在");
			}
			
			if (existPanoAlbum.getOptVersion() != panoAlbum.getOptVersion()) {
				return RestResult.errorResult("相册已被其他人更新过");
			}

			existPanoAlbum.setAlbumContent(panoAlbum.getAlbumContent());
			existPanoAlbum.setUpdateUser(userName);

			albumService.saveOrUpdate(existPanoAlbum);
			
			boolean indexResult = albumService.recreateSearchIndex(albumId);
			if (!indexResult) {
				return RestResult.errorResult("相册保存成功，但是相册数据格式有错误");
			}

			final PanoAlbum updatedPanoAlbum = albumService.get(albumId);
			
			if (updateMeta) {
				Runnable r = new Runnable() {
					@Override
					public void run() {
						albumService.updatePanoMetasByAlbum(updatedPanoAlbum);
					}
				};
				
				new Thread(r).start();
			}
			
			return RestResult.successResult(updatedPanoAlbum);
		} else {
			//多语言相册
			PanoAlbumLang existPanoAlbumLang = albumLangService.findByAlbumIdAndLang(albumId, lang);
			if (existPanoAlbumLang == null) {
				return RestResult.errorResult("要更新的相册不存在");
			}
			
			if (existPanoAlbumLang.getOptVersion() != panoAlbum.getOptVersion()) {
				return RestResult.errorResult("相册已被其他人更新过");
			}
			

			existPanoAlbumLang.setAlbumContent(panoAlbum.getAlbumContent());
			existPanoAlbumLang.setUpdateUser(userName);
			
			PanoAlbumLang updatedPanoAlbumLang = albumLangService.saveOrUpdate(existPanoAlbumLang);

			return RestResult.successResult(updatedPanoAlbumLang);
		}
		
    }
	
	/**
	 * 更新相册简介及详情。
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/updateDetailInfo", method = {RequestMethod.POST})
	public RestResult<? extends Object> updateDetailInfo(
			@RequestBody List<Map<String, String>> detailInfos) {
		
		if (detailInfos == null) {
			return RestResult.errorResult("没有数据");
		}
		
		String userName = UserAuth.getCurrentUserName();

		Gson gson = new Gson();
		
		//数据更新
		for (Map<String, String> detailInfo : detailInfos) {
			String albumId = detailInfo.get("albumId");
			String lang = detailInfo.get("lang");
			String albumInfo = detailInfo.get("albumInfo");
			String albumDetail = detailInfo.get("albumDetail");
			String albumName = detailInfo.get("albumName");
			
			logger.info("用户" + userName + "更新相册信息及详情,albumId=" + albumId + ",lang=" + lang);

			if (StringUtils.isEmpty(lang)) {
				//默认语言相册
				PanoAlbum existPanoAlbum = albumService.get(albumId);
				if (existPanoAlbum == null) {
					return RestResult.errorResult("要更新的相册不存在,albumId=" + albumId);
				}
				
				Album<Pano> album = existPanoAlbum.parseAlbum();
				if (albumDetail != null) {
					album.setAlbumDetail(albumDetail);
				}
				if (albumInfo != null) {
					album.setAlbumInfo(albumInfo);
				}
				if(albumName != null) {
					album.setAlbumName(albumName);
				}
				String albumContent = gson.toJson(album);
				
				existPanoAlbum.setAlbumContent(albumContent);
				existPanoAlbum.setUpdateUser(userName);
				
				albumService.saveOrUpdate(existPanoAlbum);
				
				boolean indexResult = albumService.recreateSearchIndex(albumId);
				if (!indexResult) {
					return RestResult.errorResult("相册保存成功，但是相册数据格式有错误");
				}
			} else {
				//多语言相册
				PanoAlbumLang existPanoAlbumLang = albumLangService.findByAlbumIdAndLang(albumId, lang);
				if (existPanoAlbumLang == null) {
					return RestResult.errorResult("要更新的多语言相册不存在,albumId=" + albumId + ",lang=" + lang);
				}
				
				Album<Pano> album = existPanoAlbumLang.parseAlbum();
				if (albumDetail != null) {
					album.setAlbumDetail(albumDetail);
				}
				if (albumInfo != null) {
					album.setAlbumInfo(albumInfo);
				}
				String albumContent = gson.toJson(album);

				existPanoAlbumLang.setAlbumContent(albumContent);
				existPanoAlbumLang.setUpdateUser(userName);
				
				PanoAlbumLang updatedPanoAlbumLang = albumLangService.saveOrUpdate(existPanoAlbumLang);
			}
		}
		
		return RestResult.successResult();
    }
	
	/**
	 * 通过复制默认语言版本的相册来创建指定语言的相册。
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/createLang", method = {RequestMethod.POST})
	public RestResult<PanoAlbumLang> createLang(
			@RequestParam String albumId,
			@RequestParam String lang) {
		
		if (StringUtils.isEmpty(albumId)) {
			return RestResult.errorResult("albumId参数未指定");
		}
		
		if (StringUtils.isEmpty(lang)) {
			return RestResult.errorResult("lang参数未指定");
		}
		
		String userName = UserAuth.getCurrentUserName();
		logger.info("用户" + userName + "创建" + lang + "语言版本的相册,albumId=" + albumId);
		
		PanoAlbum panoAlbum = albumService.get(albumId);
		if (panoAlbum == null) {
			return RestResult.errorResult("指定的相册不存在");
		}
		
		PanoAlbumLang panoAlbumLang = albumLangService.createByPanoAlbum(albumId, lang, userName);
		
		return RestResult.successResult(panoAlbumLang);
    }
	
	/**
	 * 删除相册。
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/delete", method = {RequestMethod.GET})
	public RestResult<PanoAlbum> delete(
			@RequestParam String albumId,
			@RequestParam(required=false) String lang) {
		
		if (StringUtils.isEmpty(albumId)) {
			return RestResult.errorResult("albumId参数未指定");
		}
		
		String userName = UserAuth.getCurrentUserName();
		logger.info("用户" + userName + "删除相册,albumId=" + albumId + ", lang=" + lang);
		
		if (StringUtils.isEmpty(lang)) {
			//默认语言相册
			PanoAlbum panoAlbum = albumService.get(albumId);
			if (panoAlbum == null) {
				return RestResult.errorResult("指定的相册不存在");
			}
			
			if(!StringUtils.equals(panoAlbum.getCreateUser(), userName)) {
				return RestResult.errorResult("只能删除自己创建的相册");
			}
			
			logger.debug("删除的相册内容如下：" + panoAlbum.getAlbumContent());
			
			albumService.delete(albumId);
			
			albumService.deleteSearchIndex(albumId);

			return RestResult.successResult();
		} else {
			//多语言相册
			PanoAlbumLang panoAlbumLang = albumLangService.findByAlbumIdAndLang(albumId, lang);
			if (panoAlbumLang == null) {
				return RestResult.errorResult("指定的相册不存在");
			}
			
			if(!StringUtils.equals(panoAlbumLang.getCreateUser(), userName)) {
				return RestResult.errorResult("只能删除自己创建的相册");
			}
			
			logger.debug("删除的相册内容如下：" + panoAlbumLang.getAlbumContent());
			
			albumLangService.delete(albumId, lang);
			
			return RestResult.successResult();
		}
    }
	
	/**
	 * 取得相册。
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/get")
	public RestResult<? extends Object> get(
			@RequestParam String albumId,
			@RequestParam(required = false) String lang) {

		if (StringUtils.isEmpty(albumId)) {
			return RestResult.errorResult("albumId参数未指定");
		}

		if (StringUtils.isEmpty(lang)) {
			// 默认语言相册
			PanoAlbum panoAlbum = albumService.get(albumId);
			if (panoAlbum == null) {
				return RestResult.errorResult("指定的相册不存在");
			}
			String userName = UserAuth.getCurrentUserName();
			logger.info("用户" + userName + "获取相册,albumId=" + albumId + ",相册内容: " + JSON.toJSON(panoAlbum.getAlbumContent()));


			return RestResult.successResult(panoAlbum);
		} else {
			// 多语言相册
			PanoAlbumLang panoAlbumLang = albumLangService.findByAlbumIdAndLang(albumId, lang);
			if (panoAlbumLang == null) {
				return RestResult.errorResult("指定的相册不存在");
			}
			
			return RestResult.successResult(panoAlbumLang);
		}
	}

	/**
	 * 更新相册。
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/copy", method = {RequestMethod.POST})
	public RestResult<PanoAlbum> copy(
			@RequestParam String albumId,
			@RequestParam String albumName) {
		
		if (StringUtils.isEmpty(albumId)) {
			return RestResult.errorResult("albumId参数未指定");
		}
		
		if (StringUtils.isEmpty(albumName)) {
			return RestResult.errorResult("albumName参数未指定");
		}
		
		PanoAlbum panoAlbum = albumService.get(albumId);
		if (panoAlbum == null) {
			return RestResult.errorResult("指定的相册不存在");
		}
		
		String userName = UserAuth.getCurrentUserName();
		logger.info("用户" + userName + "复制相册,albumId=" + albumId);
		
		PanoAlbum panoAlbumCopied = albumService.copy(albumId, albumName, userName);
		
		boolean indexResult = albumService.recreateSearchIndex(panoAlbumCopied.getAlbumId());
		if (!indexResult) {
			return RestResult.errorResult("相册复制成功，但是相册数据格式有错误");
		}
		
		return RestResult.successResult(panoAlbumCopied);
    }
	
	/**
	 * 取得相册内容。
	 * @return
	 */
	@CrossOrigin(allowCredentials="false")
	@RequestMapping(value="/view/{albumId}")
	public Object getAlbumContent(
			@PathVariable String albumId,
			@RequestParam(required = false) String lang) {

		if (StringUtils.isEmpty(lang)) {
			// 默认语言相册
			PanoAlbum panoAlbum = albumService.get(albumId);
			if (panoAlbum == null) {
				return RestResult.errorResult("找不到指定的相册");
			}
			
			Album<Pano> album = panoAlbum.parseAlbum();
			album = albumService.fillIncludedAlbum(album);

			return RestResult.successResult(album);
		} else {
			// 多语言相册
			PanoAlbumLang panoAlbumLang = albumLangService.findByAlbumIdAndLang(albumId, lang);
			if (panoAlbumLang == null) {
				return RestResult.errorResult("找不到指定的相册");
			}

			Album<Pano> album = panoAlbumLang.parseAlbum();
			album = albumLangService.fillIncludedAlbum(album, lang);

			return RestResult.successResult(album);
		}
	}
	
//	/**
//	 * 取得指定的多个相册的内容。
//	 * @return
//	 */
//	@CrossOrigin(allowCredentials="false")
//	@RequestMapping(value="/viewmulti", method = RequestMethod.POST, produces="application/json;charset=UTF-8")
//	public Object getMultiAlbumContent(
//			@RequestBody List<String> albumIds,
//			@RequestParam(required = false) String lang) {
//
//		if (albumIds.size() == 0) {
//			return RestResult.errorResult("albumIds参数为空");
//		}
//
//		StringBuilder result = new StringBuilder();
//		result.append("{\"result\":0,\"msg\":\"正常\",\"data\":{");
//		
//		if (StringUtils.isEmpty(lang)) {
//			// 默认语言相册
//			List<PanoAlbum> panoAlbums = albumService.findByAlbumIds(albumIds);
//			if (panoAlbums.isEmpty()) {
//				return RestResult.errorResult("指定的相册不存在");
//			}
//			
//			for (PanoAlbum panoAlbum : panoAlbums) {
//				result.append("\"" + panoAlbum.getAlbumId() + "\" : ");
//				result.append(panoAlbum.getAlbumContent());
//				result.append(",");
//			}
//			result.deleteCharAt(result.length() - 1);
//		} else {
//			// 多语言相册
//			List<PanoAlbumLang> panoAlbumLangs = albumLangService.findByAlbumIdsAndLang(albumIds, lang);
//			if (panoAlbumLangs.isEmpty()) {
//				return RestResult.errorResult("指定的相册不存在");
//			}
//			
//			for (PanoAlbumLang panoAlbumLang : panoAlbumLangs) {
//				result.append("\"" + panoAlbumLang.getAlbumId() + "\" : ");
//				result.append(panoAlbumLang.getAlbumContent());
//				result.append(",");
//			}
//			result.deleteCharAt(result.length() - 1);
//		}
//		
//		result.append("}}");
//		
//		return result.toString();
//	}
	
	/**
	 * 查询相册。
	 * @param q
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/search", method = {RequestMethod.GET})
	public RestResult<Map<String, Object>> search(
			@RequestParam(defaultValue = "") String q,
			@RequestParam(defaultValue = "0") int from,
			@RequestParam(defaultValue = "1") int fromPage,
			@RequestParam(defaultValue = "10") int size,
			@RequestParam(defaultValue = "false") boolean createUser,
			@RequestParam(required = false, defaultValue = "") String fromDate,
			@RequestParam(required = false, defaultValue = "") String toDate,
			@RequestParam(required = false, defaultValue = "") String tip,
			@RequestParam(required = false, defaultValue = "-1") int status
			) throws ParseException {
		
		q = q.trim();
		if (StringUtils.isEmpty(q)) {
			q = null;
		}
		if (from < 0) {
			from = 0;
		} else {
			from = (fromPage - 1) * size;
		}
		if (from < 0) {
			from = 0;
		}

		AlbumSearchCondition condition = new AlbumSearchCondition();
		// 起始位置
		condition.setFrom(from);
		// 检索件数
		condition.setSize(size);
		// 是否只检索特定用户数据
		if (createUser) {
			String userName = UserAuth.getCurrentUserName();
			condition.setUserName(userName);
		}
		if (!StringUtils.isBlank(tip)) {
			condition.setTip(tip);
		}

		if (status != -1) {
			condition.setStatus(status);
		}

		// 检索关键字
		condition.setQ(q);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		if (!StringUtils.isBlank(fromDate)) {
			Date date = sdf.parse(fromDate);
			condition.setFromDate(date);
		}
		if (!StringUtils.isBlank(toDate)) {
			Date date = sdf.parse(toDate);
			condition.setToDate(date);
		}

		List<String> sortOrders = new ArrayList<>(1);
		sortOrders.add("updateTime:desc");

		// 顺德需求：按照修改日期降序
		condition.setSortList(sortOrders);

		SearchResult<List<AlbumSearchResult>> searchResult = albumService.search(condition);

		Map<String, Object> data = new HashMap<String, Object>();
		data.put("total", searchResult.getTotal());
		data.put("totalPage", (long)Math.ceil(searchResult.getTotal() / (double)size));
		if (searchResult.getAggs() != null) {
			data.put("tipsSet", searchResult.getAggs());
		}
		data.put("searchResult", searchResult.getResult());
		
		return RestResult.successResult(data);
    }

	/**
	 * 重建指定的相册或者全部相册的搜索索引。
	 * @param albumId
	 * @param magic
	 * @return
	 */
	@RequestMapping(value="/recreateSearchIndex", method = {RequestMethod.PUT, RequestMethod.GET}) //TODO GET方法只在测试时使用
	public RestResult<Object> recreateSearchIndex(
			@RequestParam(required= false) String albumId,
			@RequestParam(required= false) String magic) {
		
		String userName = UserAuth.getCurrentUserName();
		logger.info("用户" + userName + "重建相册的搜索索引，albumId=" + albumId);

		boolean success = false;
		if (StringUtils.isEmpty(albumId)) {
			if (StringUtils.isEmpty(magic) || !"admin".equals(magic)) {
				logger.warn("非管理员执行的重建所有相册索引");
				success = false;
			} else {
				success = albumService.recreateSearchIndex();
			}
		} else {
			success = albumService.recreateSearchIndex(albumId);
		}
		
		if (success) {
			return RestResult.successResult();
		} else {
			return RestResult.errorResult();
		}
    }
	
	/**
	 * 修改相册所属供应商
	 * @param albumId
	 * @param vendor
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/changeVendor", method = {RequestMethod.PUT, RequestMethod.GET})
	public RestResult<Map<String, String>> changeVendor(
			@RequestParam String albumId,
			@RequestParam String vendor,
			@RequestParam(required = false) String type) {
		
		if (StringUtils.isEmpty(albumId)) {
			return RestResult.errorResult("albumId参数未指定");
		}
		if (StringUtils.isEmpty(vendor)) {
			return RestResult.errorResult("vendor参数未指定");
		}

		String userName = UserAuth.getCurrentUserName();

		PanoAlbum panoAlbum = albumService.get(albumId);
		if (panoAlbum == null) {
			return RestResult.errorResult("指定的相册不存在");
		}
		
		panoAlbum.setVendor(vendor);
		panoAlbum.setType(type);
		panoAlbum.setUpdateUser(userName);
		
		albumService.saveOrUpdate(panoAlbum);
		
		albumService.recreateSearchIndex(albumId);
		
		return RestResult.successResult();
    }

}
