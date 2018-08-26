/*
 * Copyright (c)  $year - $year Microscene Inc., All Rights Reserved.
 *
 * @author: mark@vizen.cn
 * @Date: 2018.
 */

package com.vizen.interceptor;

/**
 * FIXME:类说明
 *
 * @author mark@vizen.cn
 * @date 2018-01-12
 */

import org.springframework.util.StringUtils;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 跨域设置
 *
 * @author mark
 * @date 2017-10-22
 */
public class CorsInterceptor extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) throws Exception {

        System.out.println("received 。。。。。。。。。");
        HttpServletRequest r = (HttpServletRequest)request;
        String origin = r.getHeader("Origin");
        if (!StringUtils.isEmpty(origin)) {
            response.setHeader("Access-Control-Allow-Origin", origin);
        } else {
            response.setHeader("Access-Control-Allow-Origin", "*");
        }
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        response.setHeader("Access-Control-Max-Age", "60");
        response.setHeader("Access-Control-Allow-Headers", "x-requested-with");
        // 统一设置UF-8（application/json;charset=UTF-8）
        response.setHeader("Content-type", "application/json;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        return true;
    }

}
