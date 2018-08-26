package com.visualbusiness.pano.news.web.rest;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.visualbusiness.pano.news.model.MtaInfo;
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
import com.visualbusiness.common.util.DateUtil;
import com.visualbusiness.common.web.rest.RestResult;
import com.visualbusiness.pano.news.model.AlbumStatisticsVisit;
import com.visualbusiness.pano.news.model.PanoAlbum;
import com.visualbusiness.pano.news.service.AlbumStatisticsService;

@RestController
@RequestMapping("/album/statist")
public class AlbumStatisticsRestController {
	private static Logger logger = LogManager.getLogger(AlbumStatisticsRestController.class);
	
	@Autowired
	private AlbumStatisticsService albumStatisticsService;
	
	/**
	 * 查询相册当天的访问数据。
	 * @param q
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/searchTodayVisit", method = {RequestMethod.GET})
	public RestResult<Map<String, Object>> searchTodayVisit(
			@RequestParam(required=false) String q,
			@RequestParam(defaultValue = "0") int from,
			@RequestParam(defaultValue = "1") int fromPage,
			@RequestParam(defaultValue = "10") int size,
			@RequestParam(required= false) List<String> sort) {
		
		if (sort == null || sort.size() == 0) {
			sort = Arrays.asList("createTime:desc");
		}

		if (from == 0) {
			from = (fromPage - 1) * size;
		}
		
		String userName = UserAuth.getCurrentUserName();
		String type = PanoAlbum.PANO_ALBUM_TYPE_NEWS;
		SearchResult<List<AlbumStatisticsVisit>> searchResult = albumStatisticsService.searchTodayVisit(q, userName, type, from, size, sort);
		
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("total", searchResult.getTotal());
		data.put("totalPage", (long)Math.ceil(searchResult.getTotal() / (double)size));
		data.put("searchResult", searchResult.getResult());
		
		return RestResult.successResult(data);
    }
	
	/**
	 * 取得指定相册指定期间的访问数据。
	 * @return
	 */
	@CrossOrigin
	@RequestMapping(value="/getVisit", method = {RequestMethod.GET})
	public RestResult<? extends Object> getVisit(
			@RequestParam String albumId,
			@RequestParam(required=false) String fromDate,
			@RequestParam(required=false) String toDate) {

		if (StringUtils.isEmpty(albumId)) {
			return RestResult.errorResult("albumId参数未指定");
		}
		
		if (StringUtils.isEmpty(toDate)) {
			toDate = DateUtil.currentDate();
		}

		if (StringUtils.isEmpty(fromDate)) {
			int idx = toDate.lastIndexOf("-");
			fromDate = toDate.substring(0, idx + 1) + "01";
		}

		AlbumStatisticsVisit albumStatisticsVisit = albumStatisticsService.getHistoryVisit(albumId, fromDate, toDate);
		if (albumStatisticsVisit == null) {
			return RestResult.errorResult("指定的相册不存在");
		}

		return RestResult.successResult(albumStatisticsVisit);
	}

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
