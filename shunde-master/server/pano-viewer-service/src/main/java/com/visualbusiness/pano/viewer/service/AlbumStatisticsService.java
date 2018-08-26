package com.visualbusiness.pano.viewer.service;

import java.util.List;

import com.visualbusiness.common.model.SearchResult;
import com.visualbusiness.pano.viewer.model.AlbumStatisticsVisit;
import com.visualbusiness.pano.viewer.model.MtaInfo;

public interface AlbumStatisticsService {
	public SearchResult<List<AlbumStatisticsVisit>> searchTodayVisit(String q, int from, int size);
	
	public SearchResult<List<AlbumStatisticsVisit>> searchTodayVisit(String q, String vendor, String type, int from, int size, List<String> sortList);

	public AlbumStatisticsVisit getHistoryVisit(String albumId, String fromDate, String toDate);
	
	public MtaInfo getMtaInfoByAlbumId(String albumId);
	
	public MtaInfo getMtaInfo(String albumId, String vendor);
	
	public MtaInfo getMtaInfo(String vendor);
}
