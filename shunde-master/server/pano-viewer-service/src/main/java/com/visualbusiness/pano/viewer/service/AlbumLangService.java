package com.visualbusiness.pano.viewer.service;

import java.util.List;

import com.visualbusiness.pano.viewer.model.Album;
import com.visualbusiness.pano.viewer.model.Pano;
import com.visualbusiness.pano.viewer.model.PanoAlbumLang;

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
