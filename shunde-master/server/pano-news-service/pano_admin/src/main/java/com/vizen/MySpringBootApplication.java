package com.vizen;

import java.util.Map;

import org.elasticsearch.client.Client;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ErrorPage;
import org.springframework.boot.web.servlet.ErrorPageRegistrar;
import org.springframework.boot.web.servlet.ErrorPageRegistry;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.vizen.framework.interceptor.CorsInterceptor;
import com.vizen.framework.interceptor.LoginInterceptor;

/**
 * spring boot启动主类
 *
 */
@SpringBootApplication
@MapperScan(basePackages = "com.vizen.sd.repository.mysql.mapper")
@EnableTransactionManagement
public class MySpringBootApplication extends WebMvcConfigurerAdapter implements ErrorPageRegistrar, CommandLineRunner
{
    @Autowired
    private ElasticsearchOperations es;

    /**
     * 启动主函数
     *
     * @param args
     */
    public static void main(String[] args) {
        SpringApplication.run(MySpringBootApplication.class, args);
    }

    /**
     * 拦截器(拦截器方式)
     *
     * @param registry
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new CorsInterceptor());
//        registry.addInterceptor(new LoginInterceptor());
    }

    /**
     * 异常统一处理（servlet异常统一处理规范）
     * @param registry
     */
    @Override
    public void registerErrorPages(ErrorPageRegistry registry) {
        registry.addErrorPages(new ErrorPage("/framework/error"));
    }

    /**
     * Callback used to run the bean.
     *
     * @param args incoming main method arguments
     * @throws Exception on error
     */
    @Override
    public void run(String... args) throws Exception {
        System.out.println("--ElasticSearch--");
        Client client = es.getClient();
        Map<String, String> asMap = client.settings().getAsMap();

        asMap.forEach((k, v) -> {
            System.out.println(k + " = " + v);
        });
        System.out.println("--ElasticSearch--");
    }
}

