package com.visualbusiness.pano.viewer.dao;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.visualbusiness.pano.viewer.model.PanoAlbumLang;

public interface PanoAlbumLangDao extends PagingAndSortingRepository<PanoAlbumLang, Integer> {
	List<PanoAlbumLang> findByAlbumId(String albumId);
	
	List<PanoAlbumLang> findByAlbumIdIn(List<String> albumIds);

	List<PanoAlbumLang> findByAlbumIdInAndLang(List<String> albumIds, String lang);

	PanoAlbumLang findByAlbumIdAndLang(String albumId, String lang);

	void deleteByAlbumId(String albumId);

}
