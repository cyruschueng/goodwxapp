package datafix;

import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.visualbusiness.pano.viewer.PanoViewerMain;
import com.visualbusiness.pano.viewer.dao.PanoAlbumDao;
import com.visualbusiness.pano.viewer.dao.PanoAlbumLangDao;
import com.visualbusiness.pano.viewer.model.Album;
import com.visualbusiness.pano.viewer.model.Pano;
import com.visualbusiness.pano.viewer.model.PanoAlbum;
import com.visualbusiness.pano.viewer.model.PanoAlbumLang;
import com.visualbusiness.pano.viewer.model.PanoWithProject;
import com.visualbusiness.pano.viewer.service.AlbumLangService;
import com.visualbusiness.pano.viewer.service.AlbumService;

public class IsWithMarkersFixer {
	private static Logger logger = LogManager.getLogger(PanoViewerMain.class);
	private static Gson gson = new Gson();

	public static void main(String[] args) throws Exception {
		logger.info("开始【细节点是否有效】数据修复");
		
		ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(new String[] { "service_impl.xml",
				"dubbo_provider.xml", "dubbo_consumer.xml" });

		logger.info("before context.start();");
		context.start();
		logger.info("after context.start();");
		
		logger.info("before fix();");
		fix(context);
		logger.info("after fix();");
		
		logger.info("【细节点是否有效】数据修复完毕");
	}
	
	private static void fix(ApplicationContext context) {
		AlbumService alubmService = context.getBean(AlbumService.class);
		PanoAlbumDao panoAlbumDao = context.getBean(PanoAlbumDao.class);
		
		logger.info("before panoAlbumDao.findAll()");
		Iterable<PanoAlbum> panoAlbums = panoAlbumDao.findAll();
		logger.info("after panoAlbumDao.findAll()");
		for (PanoAlbum panoAlbum : panoAlbums) {
			logger.info("处理相册：" + panoAlbum.getAlbumId());
			String albumContent = panoAlbum.getAlbumContent();
			String fixedAlbumContent = fixAlbumContent(albumContent);
			panoAlbum.setAlbumContent(fixedAlbumContent);
//			System.out.println("\t" + albumContent + "\t" + fixedAlbumContent);
			panoAlbumDao.save(panoAlbum);
		}
		
		AlbumLangService albumLangService = context.getBean(AlbumLangService.class);
		PanoAlbumLangDao panoAlbumLangDao = context.getBean(PanoAlbumLangDao.class);
		Iterable<PanoAlbumLang> panoAlbumLangs = panoAlbumLangDao.findAll();
		for (PanoAlbumLang panoAlbumLang : panoAlbumLangs) {
			logger.info("处理多语言相册：" + panoAlbumLang.getAlbumId());
			String albumContent = panoAlbumLang.getAlbumContent();
			String fixedAlbumContent = fixAlbumContent(albumContent);
			panoAlbumLang.setAlbumContent(fixedAlbumContent);
//			System.out.println("\t" + albumContent + "\t" + fixedAlbumContent);
			panoAlbumLangDao.save(panoAlbumLang);
		}

	}
	
	private static String fixAlbumContent(String albumContent) {
		try {
			Album<PanoWithProject> album = gson.fromJson(albumContent, new TypeToken<Album<PanoWithProject>>() {
			}.getType());
			fixAlbum(album);
			
			return gson.toJson(album);
		} catch (Exception e) {
			logger.error("相册内容解析失败:" + albumContent + e.getMessage());
			return albumContent;
		}

	}
	
	private static void fixAlbum(Album<PanoWithProject> album) {
		for (Pano pano : album.getPanoList()) {
			fixPano(pano);
		}
		
		for (Album<PanoWithProject> subalbum : album.getAlbumList()) {
			fixAlbum(subalbum);
		}
	}
	
	private static void fixPano(Pano pano) {
		if(StringUtils.isEmpty(pano.getIsWithMarkers())) {
			// 未设置值【细节点是否有效】的数据，设置为1
			pano.setIsWithMarkers("1");
		}
	}
}
