package com.visualbusiness.pano.news.common;

import com.alibaba.dubbo.config.ServiceConfig;
import org.apache.log4j.Logger;
import org.junit.Before;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.util.Properties;

/**
 * Created by marui on 2017/3/10.
 */
public class BaseBeanContext {

    private final static Logger logger = Logger.getLogger(BaseBeanContext.class);
    protected ClassPathXmlApplicationContext context;


    @Before
    public void setUp() {

        context = new ClassPathXmlApplicationContext(
                new String[]{"dubbo_consumer.xml", "dubbo_provider.xml", "service_impl.xml"});
        context.start();
    }
}
