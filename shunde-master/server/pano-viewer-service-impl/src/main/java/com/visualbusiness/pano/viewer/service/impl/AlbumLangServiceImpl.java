package com.visualbusiness.pano.viewer.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.visualbusiness.pano.viewer.dao.PanoAlbumLangDao;
import com.visualbusiness.pano.viewer.model.Album;
import com.visualbusiness.pano.viewer.model.Pano;
import com.visualbusiness.pano.viewer.model.PanoAlbum;
import com.visualbusiness.pano.viewer.model.PanoAlbumLang;
import com.visualbusiness.pano.viewer.service.AlbumLangService;
import com.visualbusiness.pano.viewer.service.AlbumService;

@Service("albumLangService")
public class AlbumLangServiceImpl implements AlbumLangService {
	private static Logger logger = LogManager.getLogger(AlbumLangServiceImpl.class);

	@Autowired
	private PanoAlbumLangDao panoAlbumLangDao;
	
	@Autowired
	private AlbumService albumService;

	@Override
	public PanoAlbumLang findByAlbumIdAndLang(String albumId, String lang) {
		return panoAlbumLangDao.findByAlbumIdAndLang(albumId, lang);
	}
	
	@Override
	public List<PanoAlbumLang> findByAlbumId(String albumId) {
		return panoAlbumLangDao.findByAlbumId(albumId);
	}

	@Override
	public List<PanoAlbumLang> findByAlbumIds(List<String> albumIds) {
		return panoAlbumLangDao.findByAlbumIdIn(albumIds);
	}

	@Override
	public List<PanoAlbumLang> findByAlbumIdsAndLang(List<String> albumIds, String lang) {
		return panoAlbumLangDao.findByAlbumIdInAndLang(albumIds, lang);
	}

	@Transactional
	@Override
	public PanoAlbumLang createByPanoAlbum(String albumId, String lang, String createUser) {
		PanoAlbum panoAlbum = albumService.get(albumId);
		if (panoAlbum == null) {
			throw new RuntimeException("指定的相册不存在");
		}
		PanoAlbumLang panoAlbumLang = panoAlbumLangDao.findByAlbumIdAndLang(albumId, lang);
		if (panoAlbumLang != null) {
			throw new RuntimeException("要创建的多语言相册已经存在");
		}
		
		panoAlbumLang = new PanoAlbumLang();
		panoAlbumLang.setAlbumId(albumId);
		panoAlbumLang.setLang(lang);
		panoAlbumLang.setAlbumContent(panoAlbum.getAlbumContent());
		panoAlbumLang.setCreateUser(createUser);
		
		return this.saveOrUpdate(panoAlbumLang);
	}

	@Transactional
	@Override
	public PanoAlbumLang saveOrUpdate(PanoAlbumLang panoAlbumLang) {
		return panoAlbumLangDao.save(panoAlbumLang);
	}

	@Transactional
	@Override
	public void delete(String albumId, String lang) {
		PanoAlbumLang panoAlbumLang = panoAlbumLangDao.findByAlbumIdAndLang(albumId, lang);
		if (panoAlbumLang == null) {
			throw new RuntimeException("要删除的多语言相册不存在");
		}
		
		panoAlbumLangDao.delete(panoAlbumLang);
	}

	@Transactional
	@Override
	public void deleteByAlbumId(String albumId) {
		panoAlbumLangDao.deleteByAlbumId(albumId);
	}

	@Override
	public Album<Pano> fillIncludedAlbum(Album<Pano> album, String lang) {
		List<String> albumIncludedIds = album.extractAlbumIncludedIds();
		if (albumIncludedIds.isEmpty()) {
			return album;
		}
		
		List<PanoAlbumLang> includeAlbumLangs = findByAlbumIdsAndLang(albumIncludedIds, lang);
		Map<String, Album<Pano>> includeAlbumMap = new HashMap<String, Album<Pano>>();
		for (PanoAlbumLang includeAlbumLang : includeAlbumLangs) {
			includeAlbumMap.put(includeAlbumLang.getAlbumId(), includeAlbumLang.parseAlbum());
		}
		
		album.replaceIncludeAlbum(includeAlbumMap);
		return album;
	}

}
