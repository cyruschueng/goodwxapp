package com.visualbusiness.common.auth;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;

public class LunaUserRealm extends AuthorizingRealm {

	public static final String USER_TOKEN_SESSION_KEY = "userId";
	
	public LunaUserRealm() {
		setAuthenticationTokenClass(AuthenticationToken.class);
	}

	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
		UserInfo userInfo = null;
		
		if (token instanceof UsernamePasswordToken) {
	        UsernamePasswordToken usernamePasswordToken = (UsernamePasswordToken) token;
	        
	        String userName = usernamePasswordToken.getUsername();
	        if (userName == null || userName.isEmpty()) {
				return null;
			}
	        
	        String password = String.valueOf(usernamePasswordToken.getPassword());
	        
	        userInfo = UserAuth.lunaUserNameLogin(userName, password);
		} else if (token instanceof LunaTokenUniqueIdToken) {
			LunaTokenUniqueIdToken lunaTokenUniqueIdToken = (LunaTokenUniqueIdToken) token;
	        
	        String lunaToken = lunaTokenUniqueIdToken.getToken();
	        if (lunaToken == null || lunaToken.isEmpty()) {
				return null;
			}
	        
	        String uniqueId = String.valueOf(lunaTokenUniqueIdToken.getUniqueId());
	        
	        userInfo = UserAuth.lunaTokenLogin(lunaToken, uniqueId);
		}  else if (token instanceof UserTokenToken) {
			UserTokenToken userTokenToken = (UserTokenToken) token;

			String userToken = userTokenToken.getUserToken();
			if (userToken == null || userToken.isEmpty()) {
				return null;
			}

			userInfo = UserAuth.getUserInfo(userToken);
			if (userInfo != null) {
				userTokenToken.setUserName(userInfo.getUserName());
			}
		} else {
			throw new AuthenticationException("认证方式不支持：" + token.getClass().getName());
		}


        if (userInfo == null) {
			return null;
		}
        
        SecurityUtils.getSubject().getSession().setAttribute(USER_TOKEN_SESSION_KEY, userInfo.getUserId());
        
        SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(userInfo.getUserName(), token.getCredentials(), getName());

        return authenticationInfo;
	}


	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
		String userId = (String)SecurityUtils.getSubject().getSession().getAttribute(USER_TOKEN_SESSION_KEY);
		if (userId != null) {
			UserInfo userInfo = UserAuth.getUserInfo(userId);
	        if (userInfo != null) {
	        	authorizationInfo.addRoles(userInfo.getRoles());
	        	authorizationInfo.addStringPermissions(userInfo.getPermissions());
			}
		}
        return authorizationInfo;
	}

}
