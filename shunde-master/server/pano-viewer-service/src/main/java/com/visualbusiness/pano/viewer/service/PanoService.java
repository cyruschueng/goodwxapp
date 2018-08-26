package com.visualbusiness.pano.viewer.service;

import java.util.List;
import java.util.Map;

import com.visualbusiness.common.model.SearchResult;
import com.visualbusiness.pano.viewer.model.PanoWithGroupInfo;
import com.visualbusiness.pano.viewer.model.PanoWithProject;
import com.visualbusiness.pano.viewer.model.PanoWithThumbnails;

public interface PanoService {
    public PanoWithThumbnails findByPanoId(String panoId);

    public PanoWithThumbnails convertToPanoWithThumbnails(PanoWithGroupInfo panoWithGroupInfo);

    public PanoWithThumbnails convertToPanoWithThumbnails(String panoId, Map<String, String> metaMap);
    
    public boolean recreateSearchIndex();
    
	public boolean recreateSearchIndex(String panoId);

	public SearchResult<List<PanoWithProject>> search(String q, int from, int size);

    public SearchResult<List<PanoWithProject>> search(String q, String project, int from, int size);

    public SearchResult<List<PanoWithProject>> search(String q, String project, String vendor, int from, int size, List<String> sortList);

}
