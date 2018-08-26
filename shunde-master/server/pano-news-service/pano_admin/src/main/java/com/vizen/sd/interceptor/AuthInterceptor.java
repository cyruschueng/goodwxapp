package com.vizen.sd.interceptor;

import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.vizen.framework.util.MyJsonUtil;
import com.vizen.sd.repository.mysql.domain.Resource;

/**
 * 权限拦截器
 */
public class AuthInterceptor extends HandlerInterceptorAdapter {

	/**
     * 不需要拦截的URI
     */
    private static Set<String> skipComponents = new HashSet<>();

    static {
        skipComponents.addAll(Arrays.asList(
                "/user/login"
        ));
    }
    
	@SuppressWarnings("unchecked")
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		HttpSession session = request.getSession();
		List<Resource> userResources = (ArrayList<Resource>)session.getAttribute("userResources");
		
        String requestUri = request.getRequestURI();
        String contextPath = request.getContextPath();
        String path = requestUri.substring(contextPath.length());		
		
        if (userResources.contains(path) || checkSkipUris(path)) {
        	return true;
        } else {
        	OutputStream ps = response.getOutputStream();
            //这句话的意思，使得放入流的数据是utf8格式
            ps.write(MyJsonUtil.error(-1, "没有权限，禁止访问").toJSONString().getBytes("UTF-8"));
            return false;
        }
		
	}
	
	private static boolean checkSkipUris(String uri) {
        for (String url : skipComponents) {
            if (uri.startsWith(url)) {
                return true;
            }
        }
        return false;
    }

}
