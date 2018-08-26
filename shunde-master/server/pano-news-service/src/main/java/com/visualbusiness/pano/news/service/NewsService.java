package com.visualbusiness.pano.news.service;

import com.alibaba.fastjson.JSONObject;
import com.visualbusiness.common.model.SearchResult;
import com.visualbusiness.pano.news.model.*;

import java.util.List;

public interface NewsService {
    public Album<PanoWithThumbnails> findByPanoIdWithFullInfo(String panoId);

    public PanoAlbum get(String albumId);

	public PanoAlbum findByAlbumIdAndNewsStatus(String albumId, Integer newsStatus);

    public PanoAlbum saveOrUpdate(PanoAlbum panoAlbum);

	public void updatePanoMetasByAlbum(PanoAlbum panoAlbum);
	
    public void delete(String albumId);

    public PanoAlbum copy(String albumId, String albumName, String createUser);
    
    public boolean recreateSearchIndex();
    
	public boolean recreateSearchIndex(String albumId);

	public boolean recreateSearchIndex(PanoAlbum panoAlbum);

	public boolean deleteSearchIndex(String albumId);

	public List<PanoAlbum> findByAlbumIds(List<String> albumIds);

	public SearchResult<List<NewsSearchResult>> search(JSONObject jsonObject);

	public SearchResult<List<NewsSearchResult>> search(String q, int from, int size);
	
	public SearchResult<List<NewsSearchResult>> search(String q, String vendor, String type, int from, int size, List<String> sortList);

	public SearchResult<List<NewsSearchResult>> search(String q, String vendor, String type, Integer newsStatus, int from, int size, List<String> sortList);

	public SearchResult<List<NewsSearchResult>> searchByAlbumNameVendor(String albumName, String vendor);

	public List<Pano> getPanos(List<String> albumIds);
	
	public Album<Pano> fillIncludedAlbum(Album<Pano> album);
	
}
