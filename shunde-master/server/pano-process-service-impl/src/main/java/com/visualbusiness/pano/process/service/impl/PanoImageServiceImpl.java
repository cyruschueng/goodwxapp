package com.visualbusiness.pano.process.service.impl;

import com.visualbusiness.pano.process.dao.PanoImageDao;
import com.visualbusiness.pano.process.model.PanoImage;
import com.visualbusiness.pano.process.service.PanoImageService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("panoImageService")
public class PanoImageServiceImpl implements PanoImageService {
    private static Logger logger = LogManager.getLogger(PanoImageServiceImpl.class);

    @Autowired
    private PanoImageDao panoImageDao;

    @Override
    public PanoImage get(String panoId) {
        return panoImageDao.findOne(panoId);
    }
    @Override
    public Iterable<PanoImage> findAll() {
        return panoImageDao.findAll();
    }
}
