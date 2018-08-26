package com.visualbusiness.pano.news.dao;

import com.visualbusiness.pano.news.model.PanoAlbum;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface PanoNewsDao extends PagingAndSortingRepository<PanoAlbum, String> {
	List<PanoAlbum> findByAlbumIdIn(List<String> albumIds);
	PanoAlbum findByAlbumIdAndNewsStatus(String albumId, Integer newsStatus);
}
