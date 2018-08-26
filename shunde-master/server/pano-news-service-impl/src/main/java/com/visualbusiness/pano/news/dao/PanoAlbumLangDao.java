package com.visualbusiness.pano.news.dao;

import com.visualbusiness.pano.news.model.PanoAlbumLang;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface PanoAlbumLangDao extends PagingAndSortingRepository<PanoAlbumLang, Integer> {
	List<PanoAlbumLang> findByAlbumId(String albumId);
	
	List<PanoAlbumLang> findByAlbumIdIn(List<String> albumIds);

	List<PanoAlbumLang> findByAlbumIdInAndLang(List<String> albumIds, String lang);

	PanoAlbumLang findByAlbumIdAndLang(String albumId, String lang);

	void deleteByAlbumId(String albumId);

}
