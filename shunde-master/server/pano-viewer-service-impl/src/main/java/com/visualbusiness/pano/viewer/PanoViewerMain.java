package com.visualbusiness.pano.viewer;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class PanoViewerMain {
	private static Logger logger = LogManager.getLogger(PanoViewerMain.class);

	public static void main(String[] args) throws Exception {
		logger.info("开始启动全景图展示服务");
		
		ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(new String[] { "service_impl.xml",
				"dubbo_provider.xml", "dubbo_consumer.xml" });

		context.start();
		
		logger.info("全景图展示服务启动完毕");

		while (true) {
			Thread.sleep(1000 * 60 * 10);
		}
	}

}
