package com.visualbusiness.pano.viewer.service;

import java.util.List;

import com.visualbusiness.common.model.SearchResult;
import com.visualbusiness.pano.viewer.model.Album;
import com.visualbusiness.pano.viewer.model.AlbumSearchCondition;
import com.visualbusiness.pano.viewer.model.AlbumSearchResult;
import com.visualbusiness.pano.viewer.model.Pano;
import com.visualbusiness.pano.viewer.model.PanoAlbum;
import com.visualbusiness.pano.viewer.model.PanoWithThumbnails;

public interface AlbumService {
    public Album<PanoWithThumbnails> findByPanoIdWithFullInfoOld(String panoId);

	public Album<PanoWithThumbnails> findByPanoIdWithFullInfo(String panoId);

    public PanoAlbum get(String albumId);
    
    public PanoAlbum saveOrUpdate(PanoAlbum panoAlbum);
     
	public void updatePanoMetasByAlbum(PanoAlbum panoAlbum);
	
    public void delete(String albumId);

    public PanoAlbum copy(String albumId, String albumName, String createUser);
    
    public boolean recreateSearchIndex();
    
	public boolean recreateSearchIndex(String albumId);

	public boolean deleteSearchIndex(String albumId);
	
	public List<PanoAlbum> findByAlbumIds(List<String> albumIds);

//	public SearchResult<List<AlbumSearchResult>> search(String q, int from, int size);
	
//	public SearchResult<List<AlbumSearchResult>> search(String q, String vendor, String type, int from, int size, List<String> sortList);
	public SearchResult<List<AlbumSearchResult>> search(AlbumSearchCondition albumSearchCondition);

	public SearchResult<List<AlbumSearchResult>> searchByAlbumNameVendor(String albumName, String vendor);

	public List<Pano> getPanos(List<String> albumIds);
	
	public Album<Pano> fillIncludedAlbum(Album<Pano> album);
	
}
