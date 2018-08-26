package com.visualbusiness.pano.news.service;

import com.visualbusiness.pano.news.model.Album;
import com.visualbusiness.pano.news.model.Pano;
import com.visualbusiness.pano.news.model.PanoAlbumLang;

import java.util.List;

public interface AlbumLangService {
	public PanoAlbumLang findByAlbumIdAndLang(String albumId, String lang);

	public List<PanoAlbumLang> findByAlbumId(String albumId);

	public List<PanoAlbumLang> findByAlbumIds(List<String> albumIds);
	
	public List<PanoAlbumLang> findByAlbumIdsAndLang(List<String> albumIds, String lang);

	public PanoAlbumLang createByPanoAlbum(String albumId, String lang, String createUser);
	
    public PanoAlbumLang saveOrUpdate(PanoAlbumLang panoAlbumLang);
     
    public void delete(String albumId, String lang);

    public void deleteByAlbumId(String albumId);

    public Album<Pano> fillIncludedAlbum(Album<Pano> album, String lang);
}
