package com.visualbusiness.pano.news.web.rest;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.alibaba.fastjson.JSONObject;
import com.visualbusiness.pano.news.service.NewsService;
import com.visualbusiness.pano.news.web.common.StatusCommon;
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
import com.visualbusiness.pano.news.model.Album;
import com.visualbusiness.pano.news.model.NewsSearchResult;
import com.visualbusiness.pano.news.model.PanoAlbum;


@RestController
@RequestMapping("/album")
public class AlbumRestController {
	private static Logger logger = LogManager.getLogger(AlbumRestController.class);

	@Autowired
	private NewsService newsService;

	private static String SORT_ITEM_TIME_DESC = "createTime:desc";

	/**
	 * 新建相册。
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/create", method = {RequestMethod.POST})
	public RestResult<PanoAlbum> create(
			@RequestBody Map<String, String> data) {
		
		String albumContent = data.get("albumContent");
		
		if (StringUtils.isEmpty(albumContent)) {
			return RestResult.errorResult("没有数据");
		}
		
		String albumId = UUID.randomUUID().toString().replaceAll("-", "").toUpperCase();
		
		String userName = UserAuth.getCurrentUserName();
		logger.info("用户" + userName + "新建相册,albumId=" + albumId);
		
		PanoAlbum panoAlbum = new PanoAlbum();
		panoAlbum.setAlbumId(albumId);
		panoAlbum.setType(PanoAlbum.PANO_ALBUM_TYPE_NEWS);
		panoAlbum.setVendor(userName);
		panoAlbum.setAlbumContent(albumContent);
		panoAlbum.setCreateUser(userName);
		//创建后为草稿
		panoAlbum.setNewsStatus(StatusCommon.DRAFT);
		panoAlbum.setUpdateUser(userName);

		newsService.saveOrUpdate(panoAlbum);
		
		boolean indexResult = newsService.recreateSearchIndex(albumId);
		if (!indexResult) {
			return RestResult.errorResult("相册保存成功，但是相册数据格式有错误");
		}

		PanoAlbum updatedPanoAlbum = newsService.get(albumId);
		
		return RestResult.successResult(updatedPanoAlbum);
    }
	
	/**
	 * 根据指定panoId的基础数据定义的层级关系，创建默认相册。
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/createDefault", method = {RequestMethod.POST})
	public RestResult<PanoAlbum> createDefault(
			@RequestParam String panoId) {
		
		panoId = panoId.trim();
		if (StringUtils.isEmpty(panoId)) {
			return RestResult.errorResult("panoId参数未指定");
		}
		
		Album album = newsService.findByPanoIdWithFullInfo(panoId);
		
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
		panoAlbum.setType(PanoAlbum.PANO_ALBUM_TYPE_NEWS);
		panoAlbum.setVendor(userName);
		panoAlbum.setAlbumContent(albumContent);
		panoAlbum.setCreateUser(userName);
		panoAlbum.setNewsStatus(StatusCommon.DRAFT);
		panoAlbum.setUpdateUser(userName);

		newsService.saveOrUpdate(panoAlbum);
		
		boolean indexResult = newsService.recreateSearchIndex(albumId);
		if (!indexResult) {
			return RestResult.errorResult("相册保存成功，但是相册数据格式有错误");
		}

		PanoAlbum updatedPanoAlbum = newsService.get(albumId);
		
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
			@RequestParam(defaultValue="false") boolean updateMeta,
			@RequestParam(defaultValue="false") boolean isRelease) {
		
		if (panoAlbum == null) {
			return RestResult.errorResult("没有数据");
		}
		
		String albumId = panoAlbum.getAlbumId();
		
		String userName = UserAuth.getCurrentUserName();
		logger.info("用户" + userName + "更新相册,albumId=" + albumId);
		
		PanoAlbum existPanoAlbum = newsService.get(albumId);
		if (existPanoAlbum == null) {
			return RestResult.errorResult("要更新的相册不存在");
		}
		
		if (existPanoAlbum.getOptVersion() != panoAlbum.getOptVersion()) {
			return RestResult.errorResult("相册已被其他人更新过");
		}
		
		existPanoAlbum.setAlbumContent(panoAlbum.getAlbumContent());
		existPanoAlbum.setUpdateUser(userName);
		if(isRelease) {
			existPanoAlbum.setNewsStatus(StatusCommon.RELEASED);
		}

		newsService.saveOrUpdate(existPanoAlbum);

		final PanoAlbum updatedPanoAlbum = newsService.get(albumId);
		
		boolean indexResult = newsService.recreateSearchIndex(updatedPanoAlbum);
		if (!indexResult) {
			return RestResult.errorResult("相册保存成功，但是相册数据格式有错误");
		}

		if (updateMeta) {
			Runnable r = new Runnable() {
				@Override
				public void run() {
					newsService.updatePanoMetasByAlbum(updatedPanoAlbum);
				}
			};
			
			new Thread(r).start();
		}
		
		return RestResult.successResult(updatedPanoAlbum);
		
    }
	
	/**
	 * 删除相册。
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/delete", method = {RequestMethod.GET})
	public RestResult<PanoAlbum> delete(
			@RequestParam String albumId) {
		
		if (StringUtils.isEmpty(albumId)) {
			return RestResult.errorResult("albumId参数未指定");
		}
		
		String userName = UserAuth.getCurrentUserName();
		logger.info("用户" + userName + "删除相册,albumId=" + albumId);
		
		PanoAlbum panoAlbum = newsService.get(albumId);
		if (panoAlbum == null) {
			return RestResult.errorResult("指定的相册不存在");
		}
		
		if(!StringUtils.equals(panoAlbum.getCreateUser(), userName)) {
			return RestResult.errorResult("只能删除自己创建的相册");
		}
		
		logger.info("删除的相册内容如下：" + panoAlbum.getAlbumContent());

		newsService.delete(albumId);

		newsService.deleteSearchIndex(albumId);

		return RestResult.successResult();
    }
	
	/**
	 * 取得相册。
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/get")
	public RestResult<? extends Object> get(
			@RequestParam String albumId) {

		if (StringUtils.isEmpty(albumId)) {
			return RestResult.errorResult("albumId参数未指定");
		}

		// 默认语言相册
		PanoAlbum panoAlbum = newsService.get(albumId);
		if (panoAlbum == null) {
			return RestResult.errorResult("指定的相册不存在");
		}

		return RestResult.successResult(panoAlbum);
	}

	/**
	 * 复制相册。
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
		
		PanoAlbum panoAlbum = newsService.get(albumId);
		if (panoAlbum == null) {
			return RestResult.errorResult("指定的相册不存在");
		}
		
		String userName = UserAuth.getCurrentUserName();
		logger.info("用户" + userName + "复制相册,albumId=" + albumId);
		
		PanoAlbum panoAlbumCopied = newsService.copy(albumId, albumName, userName);
		
		boolean indexResult = newsService.recreateSearchIndex(panoAlbumCopied.getAlbumId());
		if (!indexResult) {
			return RestResult.errorResult("相册复制成功，但是相册数据格式有错误");
		}
		
		return RestResult.successResult(panoAlbumCopied);
    }
	
	/**
	 * 取得相册内容
	 * 校验相册状态
	 * @return
	 */
	@CrossOrigin(allowCredentials="false")
	@RequestMapping(value="/view/{albumId}", produces="application/json;charset=UTF-8")
	public Object getAlbumContent(
			@PathVariable String albumId) {

		// 默认语言相册
		PanoAlbum panoAlbum = newsService.get(albumId);
		if (panoAlbum == null || panoAlbum.getNewsStatus() != StatusCommon.RELEASED) {
			return RestResult.errorResult("找不到指定的相册");
		}

		String result = "{\"result\":0,\"msg\":\"正常\",\"data\":" + panoAlbum.getAlbumContent() + "}";
		return result;
	}

	/**
	 * 预览相册
	 * 校验用户与权限
	 * @return
	 */
	@CrossOrigin(allowCredentials="false")
	@RequestMapping(value="/preView/{albumId}", produces="application/json;charset=UTF-8")
	public Object AlbumPreView(
			@PathVariable String albumId) {
		String vendor = UserAuth.getCurrentUserName();
		// 默认语言相册
		PanoAlbum panoAlbum = newsService.get(albumId);
		if (panoAlbum == null || panoAlbum.getNewsStatus() == StatusCommon.DELETED || panoAlbum.getNewsStatus() == StatusCommon.RETRACTION) {
			return RestResult.errorResult("找不到指定的相册");
		}


		String result = "{\"result\":0,\"msg\":\"正常\",\"data\":" + panoAlbum.getAlbumContent() + "}";
		return result;
	}

    /**
     * 新查询相册
     * @param q
     * @param from
     * @param fromPage
     * @param size
     * @param fromTime
     * @param toTime
     * @param esType
     * @return
     */
    @CrossOrigin
    @RequestMapping(value = "/search", method = {RequestMethod.GET})
    public RestResult<Map<String, Object>> search(@RequestParam(required= false) String q,
                                                  @RequestParam(defaultValue = "0") int from,
                                                  @RequestParam(defaultValue = "1") int fromPage,
                                                  @RequestParam(defaultValue = "10") int size,
                                                  @RequestParam(required= false) String fromTime,
                                                  @RequestParam(required= false) String toTime,
												  @RequestParam(defaultValue = "-1") int newsStatus,
                                                  @RequestParam(required= false) String esType) {

        if (from == 0) {
            from = (fromPage - 1) * size;
        }

        String userName = UserAuth.getCurrentUserName();
        JSONObject jsonObject = new JSONObject();
        if (StringUtils.isEmpty(q)) {
            jsonObject.put("sort", SORT_ITEM_TIME_DESC);
        }
        else {
            jsonObject.put("q", q.trim());
        }
        jsonObject.put("vendor", userName);
        jsonObject.put("from", from);
        jsonObject.put("size", size);
        jsonObject.put("esType", esType);

        if(newsStatus != -1) {
        	jsonObject.put("newsStatus", newsStatus);
		}

        SimpleDateFormat sdf= new SimpleDateFormat("yyyyMMdd");
        try {
            if(!StringUtils.isEmpty(fromTime)) {
                jsonObject.put("fromTime", sdf.parse(fromTime.trim()).getTime());

            }
            if(!StringUtils.isEmpty(toTime)) {
                jsonObject.put("toTime", sdf.parse(toTime.trim()).getTime()+ 24*3600*1000L);

            }

        } catch (Exception e) {
            return RestResult.errorResult("解析时间失败");
        }
         SearchResult<List<NewsSearchResult>> searchResult = newsService.search(jsonObject);
        Map<String, Object> data = new HashMap<String, Object>();
        data.put("total", searchResult.getTotal());
        data.put("totalPage", (long)Math.ceil(searchResult.getTotal() / (double)size));
        data.put("searchResult", searchResult.getResult());

        return RestResult.successResult(data);

    }
	
	/**
	 * 查询相册。
	 * @param q
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/searchOld", method = {RequestMethod.GET})
	public RestResult<Map<String, Object>> search(
			@RequestParam String q,
			@RequestParam(defaultValue = "0") int from,
			@RequestParam(defaultValue = "1") int fromPage,
			@RequestParam(defaultValue = "10") int size) {
		
		q = q.trim();
		if (StringUtils.isEmpty(q)) {
			return RestResult.errorResult("q参数未指定");
		}
		
		if (from == 0) {
			from = (fromPage - 1) * size;
		}
		
		String userName = UserAuth.getCurrentUserName();
		String type = PanoAlbum.PANO_ALBUM_TYPE_NEWS;
		SearchResult<List<NewsSearchResult>> searchResult = newsService.search(q, userName, type, from, size, null);
		
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("total", searchResult.getTotal());
		data.put("totalPage", (long)Math.ceil(searchResult.getTotal() / (double)size));
		data.put("searchResult", searchResult.getResult());
		
		return RestResult.successResult(data);
    }
	
	/**
	 * 取得所有相册。
	 * @param
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/all", method = {RequestMethod.GET})
	public RestResult<Map<String, Object>> all(
			@RequestParam(defaultValue = "0") int from,
			@RequestParam(defaultValue = "1") int fromPage,
			@RequestParam(defaultValue = "10") int size,
			@RequestParam(required = false) Integer newsStatus,
			@RequestParam(required= false) List<String> sort) {
		
		if (sort == null || sort.size() == 0) {
			sort = Arrays.asList(SORT_ITEM_TIME_DESC);
		}
		
		if (from == 0) {
			from = (fromPage - 1) * size;
		}
		
		String userName = UserAuth.getCurrentUserName();
		String type = PanoAlbum.PANO_ALBUM_TYPE_NEWS;
		SearchResult<List<NewsSearchResult>> searchResult = newsService.search(null, userName, type, newsStatus, from, size, sort);

		Map<String, Object> data = new HashMap<String, Object>();
		data.put("total", searchResult.getTotal());
		data.put("totalPage", (long)Math.ceil(searchResult.getTotal() / (double)size));
		data.put("searchResult", searchResult.getResult());
		
		return RestResult.successResult(data);
    }

	/**
     * 重建指定的相册或者全部相册的搜索索引。
     *
     * @param
     * @return
     */
    @RequestMapping(value = "/recreateSearchIndex", method = {RequestMethod.PUT, RequestMethod.GET}) //TODO GET方法只在测试时使用
    public RestResult<Object> recreateSearchIndex(
            @RequestParam(required = false) String albumId,
            @RequestParam(required = false) String magic) {

        String userName = UserAuth.getCurrentUserName();
        logger.info("用户" + userName + "重建相册的搜索索引，albumId=" + albumId);

        boolean success = false;
        if (StringUtils.isBlank(albumId)) {
            if (StringUtils.isBlank(magic) || !"admin".equals(magic)) {
                logger.warn("非管理员执行的重建所有相册索引");
                success = false;
            } else {
                success = newsService.recreateSearchIndex();
            }
        } else {
            success = newsService.recreateSearchIndex(albumId);
        }

        if (success) {
            return RestResult.successResult();
        } else {
            return RestResult.errorResult();
        }
    }

	@CrossOrigin
    @RequestMapping(value = "/changeStatus", method = RequestMethod.POST)
    public RestResult<Object> changeStatus(
            @RequestParam String albumId,
            @RequestParam(defaultValue = "-1") int curState,
            @RequestParam(defaultValue = "-1") int newState) {
        if (StringUtils.isBlank(albumId)) {
            return RestResult.errorResult("albumId参数未指定");
        }
        if (curState == -1) {
            return RestResult.errorResult("curState参数未指定");
        }
        if (newState == -1) {
            return RestResult.errorResult("newState参数未指定");
        }

        String userName = UserAuth.getCurrentUserName();
        PanoAlbum panoAlbum = newsService.get(albumId);
        if (panoAlbum == null) {
            return RestResult.errorResult("指定的稿件不存在");
        }
        if (curState != panoAlbum.getNewsStatus()) {
            return RestResult.errorResult("数据已过期，请刷新页面");
        }

        if (!StringUtils.equals(panoAlbum.getVendor(), userName)) {
            return RestResult.errorResult("只能删除所在媒体下的稿件");
        }
        if (!StatusCommon.checkStatusChange(curState, newState)) {
            return RestResult.errorResult("操作不允许");
        }

        panoAlbum.setNewsStatus(newState);
        panoAlbum.setUpdateUser(userName);
        logger.info(newState + "操作的稿件内容如下：" + panoAlbum.getAlbumContent());

        newsService.saveOrUpdate(panoAlbum);
        newsService.recreateSearchIndex(albumId);

        return RestResult.successResult();
    }


}
