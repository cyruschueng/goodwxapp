package com.visualbusiness.pano.viewer.dao;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.visualbusiness.pano.viewer.model.PanoAlbum;

public interface PanoAlbumDao extends PagingAndSortingRepository<PanoAlbum, String> {
	List<PanoAlbum> findByAlbumIdIn(List<String> albumIds);
}
