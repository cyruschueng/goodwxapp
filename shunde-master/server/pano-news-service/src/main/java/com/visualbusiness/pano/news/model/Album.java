package com.visualbusiness.pano.news.model;

import org.apache.commons.lang3.StringUtils;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Album<P extends Pano> implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String albumName;
	private String albumInfo;
	private String albumThumb;
	private String albumDetail;
	private List<Album<P>> albumList = new ArrayList<Album<P>>();
	private List<P> panoList = new ArrayList<P>();
	private int completedSteps;
	private int activeStep;
	private Features features;

	public String getAlbumThumb() {
		return albumThumb;
	}

	public void setAlbumThumb(String albumThumb) {
		this.albumThumb = albumThumb;
	}

	public String getAlbumName() {
		return albumName;
	}
	public void setAlbumName(String albumName) {
		this.albumName = albumName;
	}
	public String getAlbumInfo() {
		return albumInfo;
	}
	public String getAlbumDetail() {
		return albumDetail;
	}
	public void setAlbumDetail(String albumDetail) {
		this.albumDetail = albumDetail;
	}
	public void setAlbumInfo(String albumInfo) {
		this.albumInfo = albumInfo;
	}
	public List<Album<P>> getAlbumList() {
		return albumList;
	}
	public void setAlbumList(List<Album<P>> albumList) {
		this.albumList = albumList;
	}
	public List<P> getPanoList() {
		return panoList;
	}
	public void setPanoList(List<P> panoList) {
		this.panoList = panoList;
	}
	public int getCompletedSteps() {
		return completedSteps;
	}
	public void setCompletedSteps(int completedSteps) {
		this.completedSteps = completedSteps;
	}
	public Features getFeatures() {
		return features;
	}
	public void setFeatures(Features features) {
		this.features = features;
	}
	public int getActiveStep() {
		return activeStep;
	}
	public void setActiveStep(int activeStep) {
		this.activeStep = activeStep;
	}

	///
	public List<String> extractAlbumNames() {
		return extractAlbumNames(this);
	}
	
	private <T extends Pano> List<String> extractAlbumNames(Album<T> album) {
		List<String> result = new ArrayList<String>();
		
		String albumName = album.getAlbumName();
		if (!StringUtils.isEmpty(albumName)) {
			result.add(albumName);
		}
		
		for (Album<T> subalbum : album.getAlbumList()) {
			result.addAll(extractAlbumNames(subalbum));
		}
		
		return result;
	}
	
	public List<String> extractAlbumInfos() {
		return extractAlbumInfos(this);
	}
	
	private <T extends Pano> List<String> extractAlbumInfos(Album<T> album) {
		List<String> result = new ArrayList<String>();
		
		String albumInfo = album.getAlbumInfo();
		if (!StringUtils.isEmpty(albumInfo)) {
			result.add(albumInfo);
		}
		
		for (Album<T> subalbum : album.getAlbumList()) {
			result.addAll(extractAlbumInfos(subalbum));
		}
		
		return result;
	}
	
	public List<String> extractAlbumDetails() {
		return extractAlbumDetails(this);
	}
	
	private <T extends Pano> List<String> extractAlbumDetails(Album<T> album) {
		List<String> result = new ArrayList<String>();
		
		String albumDetail = album.getAlbumDetail();
		if (!StringUtils.isEmpty(albumDetail)) {
			result.add(albumDetail);
		}
		
		for (Album<T> subalbum : album.getAlbumList()) {
			result.addAll(extractAlbumDetails(subalbum));
		}
		
		return result;
	}
	
	public List<String> extractPanoIds() {
		return this.extractPanoIds(this);
	}
	
	private <T extends Pano> List<String> extractPanoIds(Album<T> album) {
		List<String> result = new ArrayList<String>();
		
		for (T pano : album.getPanoList()) {
			String panoId = pano.getPanoId();
			if (!StringUtils.isEmpty(panoId)) {
				result.add(panoId);
			}
		}
		
		for (Album<T> subalbum : album.getAlbumList()) {
			result.addAll(extractPanoIds(subalbum));
		}
		
		return result;
	}
	
	public List<String> extractPanoNames() {
		return extractPanoNames(this);
	}
	
	private <T extends Pano> List<String> extractPanoNames(Album<T> album) {
		List<String> result = new ArrayList<String>();
		
		for (T pano : album.getPanoList()) {
			String panoName = pano.getPanoName();
			if (!StringUtils.isEmpty(panoName)) {
				result.add(panoName);
			}
		}
		
		for (Album<T> subalbum : album.getAlbumList()) {
			result.addAll(extractPanoNames(subalbum));
		}
		
		return result;
	}
	
	public List<String> extractAlbumIncludedIds() {
		return extractAlbumIncludedIds(this);
	}
	
	private <T extends Pano> List<String> extractAlbumIncludedIds(Album<T> album) {
		List<String> result = new ArrayList<String>();
		
		for (T pano : album.getPanoList()) {
			String albumIncludedId = pano.getAlbumIncludedId();
			if (!StringUtils.isEmpty(albumIncludedId))
			result.add(albumIncludedId);
		}
		
		for (Album<T> subalbum : album.getAlbumList()) {
			result.addAll(extractAlbumIncludedIds(subalbum));
		}
		
		return result;
	}

	public List<P> extractPanos() {
		return extractPanos(this);
	}
	
	private <T extends Pano> List<T> extractPanos(Album<T> album) {
		List<T> result = new ArrayList<T>();
		
		for (T pano : album.getPanoList()) {
			result.add(pano);
		}
		
		for (Album<T> subalbum : album.getAlbumList()) {
			result.addAll(extractPanos(subalbum));
		}
		
		return result;
	}
	
	public String extractThumbnailUrl() {
		return extractThumbnailUrl(this);
	}
	
	private <T extends Pano> String extractThumbnailUrl(Album<T> album) {
		T firstPano = extractFirstPano(album);
		if (firstPano != null) {
			return firstPano.getThumbnailUrl();
		}
		return null;
	}
	
	public P extractFirstPano() {
		return extractFirstPano(this);
	}
	
	private <T extends Pano> T extractFirstPano(Album<T> album) {
		for (T pano : album.getPanoList()) {
			if(pano != null) {
				return pano;
			}
		}
		
		for (Album<T> subalbum : album.getAlbumList()) {
			T subalbumPano = extractFirstPano(subalbum);
			if (subalbumPano != null) {
				return subalbumPano;
			}
		}
		
		return null;
	}

	public void replaceIncludeAlbum(Map<String, Album<P>> includeAlbumMap) {
		replaceIncludeAlbum(this, includeAlbumMap);
	}
	
	private <T extends Pano> void replaceIncludeAlbum(Album<T> album, Map<String, Album<T>> includeAlbumMap) {
		List<T> panoList = album.getPanoList();
		List<Album<T>> albumList = album.getAlbumList();
		
		if (!panoList.isEmpty()) {
			List<T> orginalPanos = new ArrayList<T>(panoList);

			panoList.clear();
			for (T pano : orginalPanos) {
				String albumIncludedId = pano.getAlbumIncludedId();
				if (StringUtils.isEmpty(albumIncludedId)) {
					panoList.add(pano);
				} else {
					Album<T> includedAlbum = includeAlbumMap.get(albumIncludedId);
					if (includedAlbum != null) {
						panoList.addAll(includedAlbum.getPanoList());
						albumList.addAll(includedAlbum.getAlbumList());
					}
				}
			}
		}
		
		for (Album<T> subalbum : albumList) {
			replaceIncludeAlbum(subalbum, includeAlbumMap);
		}
	}
	
	///
	public static class Features implements Serializable {
		private String vrflag;
		private String gravityflag;
		private String autoplayflag;
		private String logoflag;
		private String hdflag;
		private String musicflag;
		private String logo_url;
		private String music_url;
		private String coverflag;
		private String pc_cover_url;
		private String h5_cover_url;
		private String cover_logo_url;
		private String cover_text;
		//pc封面logo
		private String pc_cover_logo_url;
		//h5封面logo
		private String h5_cover_logo_url;

		public String getVrflag() {
			return vrflag;
		}
		public void setVrflag(String vrflag) {
			this.vrflag = vrflag;
		}
		public String getGravityflag() {
			return gravityflag;
		}
		public void setGravityflag(String gravityflag) {
			this.gravityflag = gravityflag;
		}
		public String getAutoplayflag() {
			return autoplayflag;
		}
		public void setAutoplayflag(String autoplayflag) {
			this.autoplayflag = autoplayflag;
		}
		public String getLogoflag() {
			return logoflag;
		}
		public void setLogoflag(String logoflag) {
			this.logoflag = logoflag;
		}
		public String getHdflag() {
			return hdflag;
		}
		public void setHdflag(String hdflag) {
			this.hdflag = hdflag;
		}
		public String getMusicflag() {
			return musicflag;
		}
		public void setMusicflag(String musicflag) {
			this.musicflag = musicflag;
		}
		public String getLogo_url() {
			return logo_url;
		}
		public void setLogo_url(String logo_url) {
			this.logo_url = logo_url;
		}
		public String getMusic_url() {
			return music_url;
		}
		public void setMusic_url(String music_url) {
			this.music_url = music_url;
		}
		public String getCoverflag() {
			return coverflag;
		}
		public void setCoverflag(String coverflag) {
			this.coverflag = coverflag;
		}
		public String getPc_cover_url() {
			return pc_cover_url;
		}
		public void setPc_cover_url(String pc_cover_url) {
			this.pc_cover_url = pc_cover_url;
		}
		public String getH5_cover_url() {
			return h5_cover_url;
		}
		public void setH5_cover_url(String h5_cover_url) {
			this.h5_cover_url = h5_cover_url;
		}
		public String getCover_logo_url() {
			return cover_logo_url;
		}
		public void setCover_logo_url(String cover_logo_url) {
			this.cover_logo_url = cover_logo_url;
		}
		public String getCover_text() {
			return cover_text;
		}
		public void setCover_text(String cover_text) {
			this.cover_text = cover_text;
		}

		public String getPc_cover_logo_url() {
			return pc_cover_logo_url;
		}

		public void setPc_cover_logo_url(String pc_cover_logo_url) {
			this.pc_cover_logo_url = pc_cover_logo_url;
		}

		public String getH5_cover_logo_url() {
			return h5_cover_logo_url;
		}

		public void setH5_cover_logo_url(String h5_cover_logo_url) {
			this.h5_cover_logo_url = h5_cover_logo_url;
		}
	}
}
