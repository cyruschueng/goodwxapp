package com.visualbusiness.pano.viewer.web.rest;

import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.visualbusiness.common.web.rest.RestResult;
import com.visualbusiness.pano.viewer.model.MtaInfo;
import com.visualbusiness.pano.viewer.service.AlbumStatisticsService;

@RestController
@RequestMapping("/album/statist")
public class AlbumStatisticsRestController {
	private static Logger logger = LogManager.getLogger(AlbumStatisticsRestController.class);
	
	@Autowired
	private AlbumStatisticsService albumStatisticsService;
	
	/**
	 * 取得指定相册的MTA ID。
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/getMtaIds", method = {RequestMethod.GET})
	public RestResult<? extends Object> getVisit(
			@RequestParam String albumId) {

		if (StringUtils.isEmpty(albumId)) {
			return RestResult.errorResult("albumId参数未指定");
		}
		
		MtaInfo mtaInfo = albumStatisticsService.getMtaInfoByAlbumId(albumId);
		
		Map<String, String> data = new HashMap<String, String>();
		data.put("sid", mtaInfo.getSid());
		data.put("cid", mtaInfo.getCid());

		return RestResult.successResult(data);
	}
	
}
