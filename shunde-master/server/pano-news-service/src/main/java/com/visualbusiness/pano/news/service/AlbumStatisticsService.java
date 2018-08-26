package com.visualbusiness.pano.news.service;

import com.visualbusiness.common.model.SearchResult;
import com.visualbusiness.pano.news.model.AlbumStatisticsVisit;
import com.visualbusiness.pano.news.model.MtaInfo;

import java.util.List;

public interface AlbumStatisticsService {
	public SearchResult<List<AlbumStatisticsVisit>> searchTodayVisit(String q, int from, int size);
	
	public SearchResult<List<AlbumStatisticsVisit>> searchTodayVisit(String q, String vendor, String type, int from, int size, List<String> sortList);

	public AlbumStatisticsVisit getHistoryVisit(String albumId, String fromDate, String toDate);
	
	public MtaInfo getMtaInfoByAlbumId(String albumId);
	
	public MtaInfo getMtaInfo(String albumId, String vendor);
	
	public MtaInfo getMtaInfo(String vendor);
}
