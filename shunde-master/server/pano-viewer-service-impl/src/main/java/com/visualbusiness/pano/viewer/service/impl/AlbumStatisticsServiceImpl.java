package com.visualbusiness.pano.viewer.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.visualbusiness.pano.viewer.model.AlbumSearchCondition;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.visualbusiness.common.model.SearchResult;
import com.visualbusiness.common.util.DateUtil;
import com.visualbusiness.pano.viewer.dao.MtaInfoDao;
import com.visualbusiness.pano.viewer.dao.PanoAlbumMtaDao;
import com.visualbusiness.pano.viewer.dao.VendorMtaDao;
import com.visualbusiness.pano.viewer.model.AlbumSearchResult;
import com.visualbusiness.pano.viewer.model.AlbumStatisticsVisit;
import com.visualbusiness.pano.viewer.model.MtaInfo;
import com.visualbusiness.pano.viewer.model.PanoAlbum;
import com.visualbusiness.pano.viewer.model.PanoAlbumMta;
import com.visualbusiness.pano.viewer.model.VendorMta;
import com.visualbusiness.pano.viewer.service.AlbumService;
import com.visualbusiness.pano.viewer.service.AlbumStatisticsService;
import com.visualbusiness.qcloud.model.MtaVisit;
import com.visualbusiness.qcloud.service.MtaService;
import com.visualbusiness.qcloud.service.exception.QcloudException;

@Service("albumStatisticsService")
public class AlbumStatisticsServiceImpl implements AlbumStatisticsService {
	private static Logger logger = LogManager.getLogger(AlbumStatisticsServiceImpl.class);
	
	private static String DEFAULT_SCERETE_ID = "500390819";

	@Autowired
	private AlbumService albumService;
	
	@Autowired
	private MtaService mtaService;

	@Autowired
	private PanoAlbumMtaDao panoAlbumMtaDao;
	
	@Autowired
	private VendorMtaDao vendorMtaDao;

	@Autowired
	private MtaInfoDao mtaInfoDao;

	@Override
	public SearchResult<List<AlbumStatisticsVisit>> searchTodayVisit(String q, int from, int size) {
		return this.searchTodayVisit(q, null, null, from, size, null);
	}

	@Override
	public SearchResult<List<AlbumStatisticsVisit>> searchTodayVisit(String q, String vendor, String type, int from,
			int size, List<String> sortList) {
		List<AlbumStatisticsVisit> result = new ArrayList<AlbumStatisticsVisit>();

		AlbumSearchCondition condition = new AlbumSearchCondition();
		condition.setQ(q);
		condition.setVendor(vendor);
		condition.setType(type);
		condition.setFrom(from);
		condition.setSize(size);
		condition.setSortList(sortList);

		//检索相册
		SearchResult<List<AlbumSearchResult>> albumResult = albumService.search(condition);
		
		if (albumResult.getResult().size() > 0) {
			List<String> albumIds = new ArrayList<String>();
			for (AlbumSearchResult albumSearchResult : albumResult.getResult()) {
				String albumId = albumSearchResult.getAlbumId();
				albumIds.add(albumId);
			}
			
			try {
				MtaInfo mtaInfo = getMtaInfo(vendor);
				
				String secretId = mtaInfo.getSecreteId(); //TODO 需要解决同一个供应商的相册有多个secretId的情况
				String secretKey = mtaInfo.getSecreteKey();
				
				String today = DateUtil.currentDate();
				//获取相册的访问数据
				Map<String, Map<String, MtaVisit>> mtaVisits = mtaService.ctrCustom(secretId, secretKey, today, today, albumIds.toArray(new String[]{}));
				
				//将访问数据和检索结果合并
				for (AlbumSearchResult albumSearchResult : albumResult.getResult()) {
					AlbumStatisticsVisit albumStatisticsVisit = new AlbumStatisticsVisit();
					String albumId = albumSearchResult.getAlbumId();
					
					albumStatisticsVisit.setAlbumId(albumId);
					albumStatisticsVisit.setAlbumName(albumSearchResult.getAlbumName());
					
					Map<String, MtaVisit> albumMtaVisits = mtaVisits.get(albumId);
					if (albumMtaVisits != null && !albumMtaVisits.isEmpty()) {
						MtaVisit mtaVisit = albumMtaVisits.values().iterator().next();
						albumStatisticsVisit.setTodayVisit(mtaVisit);
					}
					
					result.add(albumStatisticsVisit);
				}
			} catch (QcloudException e) {
				throw new RuntimeException(e);
			}
		}
		
		
		SearchResult<List<AlbumStatisticsVisit>> searchResult = new SearchResult<List<AlbumStatisticsVisit>>(result, albumResult.getTotal());
		
		return searchResult;
	}

	@Override
	public AlbumStatisticsVisit getHistoryVisit(String albumId, String fromDate, String toDate) {
		//获取相册数据
		PanoAlbum panoAlbum = albumService.get(albumId);
		if (panoAlbum == null) {
			return null;
		}

		AlbumStatisticsVisit albumStatisticsVisit = new AlbumStatisticsVisit();
		albumStatisticsVisit.setAlbumId(albumId);
		albumStatisticsVisit.setAlbumName(panoAlbum.parseAlbum().getAlbumName());

		try {
			String vendor = panoAlbum.getVendor();
			
			MtaInfo mtaInfo = getMtaInfo(albumId, vendor);
			
			String secretId = mtaInfo.getSecreteId();
			String secretKey = mtaInfo.getSecreteKey();

			//获取相册的访问数据
			Map<String, Map<String, MtaVisit>> mtaVisits = mtaService.ctrCustom(secretId, secretKey, fromDate, toDate, albumId);
			
			//将访问数据和相册数据合并
			String albumIdLower = albumId.toLowerCase(); //FIXME SB腾讯历史数据用小写关联的
			Map<String, MtaVisit> albumMtaVisits = mtaVisits.get(albumIdLower);
			albumStatisticsVisit.setHistoryVisits(albumMtaVisits);
		} catch (QcloudException e) {
			throw new RuntimeException(e);
		}
		
		return albumStatisticsVisit;
	}

	@Override
	public MtaInfo getMtaInfoByAlbumId(String albumId) {
		PanoAlbum panoAlbum = albumService.get(albumId);
		if (panoAlbum != null) {
			String vendor = panoAlbum.getVendor();
			
			return getMtaInfo(albumId, vendor);
		}

		String secretId = DEFAULT_SCERETE_ID;
		MtaInfo mtaInfo = mtaInfoDao.findOne(secretId);
		return mtaInfo;
	}

	@Override
	public MtaInfo getMtaInfo(String albumId, String vendor) {
		String secretId = null;
		
		//先通过相册ID获取
		PanoAlbumMta panoAlbumMta = panoAlbumMtaDao.findOne(albumId);
		if (panoAlbumMta != null) {
			secretId = panoAlbumMta.getSecreteId();
		} else {
			//如果获取不到，再通过供应商ID获取
			VendorMta vendorMta = vendorMtaDao.findOne(vendor);
			if (vendorMta != null) {
				secretId = vendorMta.getSecreteId();
			}
		}
		
		if (secretId == null) {
			secretId = DEFAULT_SCERETE_ID;
		}
		
		MtaInfo mtaInfo = mtaInfoDao.findOne(secretId);
		return mtaInfo;
	}
	
	@Override
	public MtaInfo getMtaInfo(String vendor) {
		String secretId = null;
		
		VendorMta vendorMta = vendorMtaDao.findOne(vendor);
		if (vendorMta != null) {
			secretId = vendorMta.getSecreteId();
		}
		
		if (secretId == null) {
			secretId = DEFAULT_SCERETE_ID;
		}

		MtaInfo mtaInfo = mtaInfoDao.findOne(secretId);
		return mtaInfo;
	}
}
