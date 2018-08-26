package com.vizen;

import com.vizen.interceptor.CorsInterceptor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * spring boot启动主类
 *
 * @author mark@visualbusiness.com
 * @date 2017-10-22
 */
@SpringBootApplication(exclude={DataSourceAutoConfiguration.class, HibernateJpaAutoConfiguration.class})
public class VizenModuleUserBootApplication extends WebMvcConfigurerAdapter
{
    /**
     * 拦截器(拦截器方式)
     *
     * @param registry
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new CorsInterceptor());
    }
    /**
     * 启动主函数
     *
     * @param args
     */
    public static void main(String[] args) {
        SpringApplication.run(VizenModuleUserBootApplication.class, args);
    }

}

