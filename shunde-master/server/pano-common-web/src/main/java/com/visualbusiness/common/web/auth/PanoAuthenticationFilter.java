package com.visualbusiness.common.web.auth;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.web.filter.authc.AuthenticatingFilter;
import org.apache.shiro.web.util.WebUtils;

import com.visualbusiness.common.auth.LunaTokenUniqueIdToken;
import com.visualbusiness.common.auth.UserTokenToken;

public class PanoAuthenticationFilter extends AuthenticatingFilter {

    protected static final String USER_TOKEN_HEADER = "XUserToken";
    protected static final String USER_TOKEN_PARAMETER = "XUserToken";

    protected static final String LUNA_TOKEN_HEADER = "XLunaToken";
    protected static final String LUNA_TOKEN_PARAMETER = "XLunaToken";
    protected static final String LUNA_UNIQUE_ID_HEADER = "XLunaUniqueId";
    protected static final String LUNA_UNIQUE_ID_PARAMETER = "XLunaUniqueId";

	@Override
	protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
        boolean loggedIn = false;
        if (isLoginRequest(request, response)) {
            loggedIn = executeLogin(request, response);
        }
        
        if(!loggedIn) {
        	redirectToLogin(request, response);
        }
        
        return loggedIn;
	}

	@Override
	protected AuthenticationToken createToken(ServletRequest request, ServletResponse response) throws Exception {
    	String userToken = getFromHeaderAndParameter(request, USER_TOKEN_HEADER, USER_TOKEN_PARAMETER);
    	if (!StringUtils.isEmpty(userToken)) {
    		UserTokenToken userTokenToken = new UserTokenToken(userToken);
    		return userTokenToken;
		}
    	
    	String lunaToken = getFromHeaderAndParameter(request, LUNA_TOKEN_HEADER, LUNA_TOKEN_PARAMETER);
    	String lunaUniqueId = getFromHeaderAndParameter(request, LUNA_UNIQUE_ID_HEADER, LUNA_UNIQUE_ID_PARAMETER);
    	
    	if (!StringUtils.isEmpty(lunaToken) && !StringUtils.isEmpty(lunaUniqueId)) {
    		LunaTokenUniqueIdToken lunaTokenUniqueIdToken = new LunaTokenUniqueIdToken(lunaToken, lunaUniqueId);
			return lunaTokenUniqueIdToken;
		}
    	
		return null;
	}

    @Override
    protected final boolean isLoginRequest(ServletRequest request, ServletResponse response) {
    	String userToken = getFromHeaderAndParameter(request, USER_TOKEN_HEADER, USER_TOKEN_PARAMETER);
    	if (!StringUtils.isEmpty(userToken)) {
			return true;
		}
    	
    	String lunaToken = getFromHeaderAndParameter(request, LUNA_TOKEN_HEADER, LUNA_TOKEN_PARAMETER);
    	String lunaUniqueId = getFromHeaderAndParameter(request, LUNA_UNIQUE_ID_HEADER, LUNA_UNIQUE_ID_PARAMETER);
    	
    	if (!StringUtils.isEmpty(lunaToken) && !StringUtils.isEmpty(lunaUniqueId)) {
			return true;
		}
    	
    	return false;
    }

	@Override
	protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) {
		String method = ((HttpServletRequest) request).getMethod();
		if ("OPTIONS".equals(method)) {
			// 允许所有OPTIONS请求(跨域访问用请求)
			return true;
		}
		return super.isAccessAllowed(request, response, mappedValue);
	}

	@Override
    protected void redirectToLogin(ServletRequest request, ServletResponse response) throws IOException {
		String loginUrl = getLoginUrl();
        try {
        	// 使用forward而不是重定向
			request.getServletContext().getRequestDispatcher(loginUrl).forward(request, response);
		} catch (ServletException e) {
			throw new IOException(e);
		}
    }
	
    protected String getFromHeaderAndParameter(ServletRequest request, String headerName, String paramName) {
    	//先从Header里取
        String value = WebUtils.toHttp(request).getHeader(headerName);

        if (StringUtils.isEmpty(value)) {
        	//取不到再从请求参数里取
        	value = request.getParameter(paramName);
		}
        
        return value;
    }

}
