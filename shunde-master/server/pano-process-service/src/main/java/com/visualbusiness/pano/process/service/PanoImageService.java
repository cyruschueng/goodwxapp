package com.visualbusiness.pano.process.service;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.visualbusiness.common.model.SearchResult;
import com.visualbusiness.pano.process.model.PanoImage;

public interface PanoImageService {
    public PanoImage get(String panoId);
    
    public Iterable<PanoImage> findAll();
}
