package com.visualbusiness.pano.news.service;

import com.alibaba.fastjson.JSONObject;
import com.visualbusiness.common.model.SearchResult;
import com.visualbusiness.pano.news.model.DeviceInfo;
import com.visualbusiness.pano.news.model.PanoWithGroupInfo;
import com.visualbusiness.pano.news.model.PanoWithProject;
import com.visualbusiness.pano.news.model.PanoWithThumbnails;

import java.util.List;

public interface PanoService {
    public PanoWithThumbnails findByPanoId(String panoId);

    public List<DeviceInfo> getDeviceInfoByVendor(String vendor);

    public PanoWithThumbnails convertToPanoWithThumbnails(PanoWithGroupInfo panoWithGroupInfo);
    
    public boolean recreateSearchIndex();
    
	public boolean recreateSearchIndex(String panoId);

    public SearchResult<List<PanoWithProject>> search(JSONObject jsonObject);

	public SearchResult<List<PanoWithProject>> search(String q, int from, int size);

    public SearchResult<List<PanoWithProject>> search(String q, String project, int from, int size);

    public SearchResult<List<PanoWithProject>> search(String q, String project, String vendor, int from, int size, List<String> sortList);

    public SearchResult<List<PanoWithProject>> search(String q, String project, String vendor, int from, int size, List<String> sortList, String fromTime, String toTime);


}
