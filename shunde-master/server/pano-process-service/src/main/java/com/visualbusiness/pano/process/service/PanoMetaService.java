package com.visualbusiness.pano.process.service;

import java.util.List;
import java.util.Map;

import com.visualbusiness.pano.process.model.PanoMeta;

public interface PanoMetaService {
    public List<PanoMeta> findByPanoId(String panoId);
    public List<PanoMeta> findByPanoIdIn(List<String> panoIdList);
    public PanoMeta findByPanoIdAndMetaName(String panoId, String metaName);
    public List<PanoMeta> findByMetaNameAndMetaValue(String metaName, String metaValue);
}
