package com.visualbusiness.pano.process.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.visualbusiness.pano.process.model.PanoImage;

public interface PanoImageDao extends PagingAndSortingRepository<PanoImage, String> {
	public Page<PanoImage> findByStatusIn(List<Integer> status, Pageable pageable);
}
