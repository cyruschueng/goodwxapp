package com.visualbusiness.pano.process.service.impl;

import com.visualbusiness.pano.process.dao.PanoMetaDao;
import com.visualbusiness.pano.process.model.PanoMeta;
import com.visualbusiness.pano.process.service.PanoMetaService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("panoMetaService")
public class PanoMetaServiceImpl implements PanoMetaService {
	private static Logger logger = LogManager.getLogger(PanoMetaServiceImpl.class);

	@Autowired
	private PanoMetaDao panoMetaDao;
	
	@Override
	public List<PanoMeta> findByPanoId(String panoId) {
		return panoMetaDao.findByPanoId(panoId);
	}

	@Override
	public List<PanoMeta> findByPanoIdIn(List<String> panoIdList) {
		return panoMetaDao.findByPanoIdIn(panoIdList);
	}

	@Override
	public PanoMeta findByPanoIdAndMetaName(String panoId, String metaName) {
		return panoMetaDao.findByPanoIdAndMetaName(panoId, metaName);
	}

	@Override
	public List<PanoMeta> findByMetaNameAndMetaValue(String metaName, String metaValue) {
		return panoMetaDao.findByMetaNameAndMetaValue(metaName, metaValue);
	}
}
