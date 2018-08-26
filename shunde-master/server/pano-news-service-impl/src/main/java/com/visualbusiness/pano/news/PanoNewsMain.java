package com.visualbusiness.pano.news;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * @author mark@vizen.cn
 */
public class PanoNewsMain {
	private static final Logger logger = LogManager.getLogger(PanoNewsMain.class);

	public static void main(String[] args) throws Exception {
		logger.info("开始启动图文服务....");
		
		ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("service_impl.xml",
				"dubbo_provider.xml", "dubbo_consumer.xml");

		context.start();
		
		logger.info("图文服务启动完毕");

		while (true) {
			Thread.sleep(1000 * 60 * 10);
		}
	}

}
