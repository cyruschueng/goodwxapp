package com.visualbusiness.qcloud;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class QcloudServiceMain {
	private static Logger logger = LogManager.getLogger(QcloudServiceMain.class);

	public static void main(String[] args) throws Exception {
		logger.info("开始启动Qcloud服务");
		
		ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(new String[] { "service_impl.xml",
				"dubbo_provider.xml"});

		context.start();
		
		logger.info("Qcloud服务启动完毕");

		while (true) {
			Thread.sleep(1000 * 60 * 10);
		}
	}

}
