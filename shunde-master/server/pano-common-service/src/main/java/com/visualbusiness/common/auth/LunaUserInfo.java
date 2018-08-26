package com.visualbusiness.common.auth;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gson.annotations.SerializedName;

public class LunaUserInfo {
	public static final String PANO_AUTH_KEY = "/data/album";

	@SerializedName("unique_id")
	private String uniqueId;
	@SerializedName("luna_name")
	private String lunaName;
	@SerializedName("nick_name")
	private String nickName;
	private String email;
	@SerializedName("role_id")
	private Integer roleId;
	@SerializedName("menu_auth")
	private Map<String, UrlAuth> menuAuth = new HashMap<String, UrlAuth>();
	@SerializedName("extra")
	private Extra extra;
	
	public List<String> getPanoAuth() {
		List<String> panoAuth = new ArrayList<String>();
		
		if (menuAuth != null) {
			UrlAuth panoUrlAuth = menuAuth.get(PANO_AUTH_KEY);
			if (panoUrlAuth != null) {
				String panoAuthValues = panoUrlAuth.getAuth();
				if (panoAuthValues != null) {
					String[] authValues = panoAuthValues.split(",");
					for (String authValue : authValues) {
						authValue = authValue.trim();
						if (authValue.length() > 0) {
							panoAuth.add(authValue);
						}
					}
				}
			}
		}
		
		if (extra != null) {
			String extraAuth = extra.getAuth();
			if (extraAuth != null) {
				String[] authValues = extraAuth.split(",");
				for (String authValue : authValues) {
					authValue = authValue.trim();
					if (authValue.length() > 0) {
						panoAuth.add(authValue);
					}
				}
			}
		}
		
		return panoAuth;
	}

	public String getVendor() {
		if(extra != null && extra.getType() != null
				&& extra.getValue() != null && extra.getValue().length > 0) {
			return extra.getType()+"@#$"+extra.getValue()[0];
		}
		return null;
	}

	public String getUniqueId() {
		return uniqueId;
	}

	public void setUniqueId(String uniqueId) {
		this.uniqueId = uniqueId;
	}

	public String getLunaName() {
		return lunaName;
	}

	public void setLunaName(String lunaName) {
		this.lunaName = lunaName;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Map<String, UrlAuth> getMenuAuth() {
		return menuAuth;
	}

	public void setMenuAuth(Map<String, UrlAuth> menuAuth) {
		this.menuAuth = menuAuth;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}
	
	public Extra getExtra() {
		return extra;
	}

	public void setExtra(Extra extra) {
		this.extra = extra;
	}


	public static class UrlAuth {
		private String url;
		private String auth;
		public String getUrl() {
			return url;
		}
		public void setUrl(String url) {
			this.url = url;
		}
		public String getAuth() {
			return auth;
		}
		public void setAuth(String auth) {
			this.auth = auth;
		}
	}
	
	public static class Extra {
		private String auth;
		private String type;
		private int[] value;

		public String getAuth() {
			return auth;
		}

		public void setAuth(String auth) {
			this.auth = auth;
		}

		public String getType() {
			return type;
		}

		public void setType(String type) {
			this.type = type;
		}

		public int[] getValue() {
			return value;
		}

		public void setValue(int[] value) {
			this.value = value;
		}
	}
}
