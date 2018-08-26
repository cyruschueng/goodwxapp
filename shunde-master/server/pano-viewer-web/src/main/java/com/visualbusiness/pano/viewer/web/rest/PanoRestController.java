package com.visualbusiness.pano.viewer.web.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.visualbusiness.pano.process.service.ImmigrationService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.visualbusiness.common.auth.UserAuth;
import com.visualbusiness.common.model.SearchResult;
import com.visualbusiness.common.web.rest.RestResult;
import com.visualbusiness.pano.viewer.model.Pano;
import com.visualbusiness.pano.viewer.model.PanoWithProject;
import com.visualbusiness.pano.viewer.service.PanoService;

@RestController
@RequestMapping("/pano")
public class PanoRestController {
	private static Logger logger = LogManager.getLogger(PanoRestController.class);

	@Autowired
	private PanoService panoService;
	@Autowired
	private ImmigrationService immigrationService;

	/**
	 * 取得指定全景图的信息。
	 * @param panoId
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value={"", "getByPanoId"}, method = {RequestMethod.GET})
	public RestResult<Pano> get(
			@RequestParam String panoId) {
		
		panoId = panoId.trim();
		if (StringUtils.isEmpty(panoId)) {
			return RestResult.errorResult("panoId参数未指定");
		}
		
		Pano data = panoService.findByPanoId(panoId);
		
		return RestResult.successResult(data);
    }

	/**
	 * 取得指定全景图的信息。
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value={"immigrate"}, method = {RequestMethod.GET})
	public Object immigratePanoMetaImage(@RequestParam(value = "time", defaultValue = "-1") long time) {
		int count = immigrationService.immigratePanoMetaImage(time);
		JSONObject data = new JSONObject();
		data.put("code", 0);
		data.put("msg", "success");
		data.put("count", count);
		return data;
	}

	/**
	 * 查询全景图。
	 * @param q
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/search", method = {RequestMethod.GET})
	public RestResult<Map<String, Object>> search(
			@RequestParam String q,
			@RequestParam(required= false) String project,
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
		
		SearchResult<List<PanoWithProject>> searchResult = panoService.search(q, project, from, size);
		
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("total", searchResult.getTotal());
		data.put("totalPage", (long)Math.ceil(searchResult.getTotal() / (double)size));
		data.put("searchResult", searchResult.getResult());
		
		return RestResult.successResult(data);
    }
		
	/**
	 * 重建指定的全景图或者全部全景图的搜索索引。
	 * @param panoId
	 * @return
	 */
	@RequestMapping(value="/recreateSearchIndex", method = {RequestMethod.PUT, RequestMethod.GET}) //TODO GET方法只在测试时使用
	public RestResult<Object> recreateSearchIndex(
			@RequestParam(required= false) String panoId,
			@RequestParam(required= false) String magic) {
		
		String userName = UserAuth.getCurrentUserName();
		logger.info("用户" + userName + "重建全景图的搜索索引，panoId=" + panoId);
		
		boolean success = false;
		if (StringUtils.isEmpty(panoId)) {
			if (StringUtils.isEmpty(magic) || !"admin".equals(magic)) {
				logger.warn("非管理员执行的重建所有全景图索引");
				success = false;
			} else {
				success = panoService.recreateSearchIndex();
			}
		} else {
			success = panoService.recreateSearchIndex(panoId);
		}
		
		if (success) {
			return RestResult.successResult();
		} else {
			return RestResult.errorResult();
		}
    }
	
	
}
