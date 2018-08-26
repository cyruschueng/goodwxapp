const Colin = {
	exChangeUrl(url) {
		var app = getApp(),
			Domain = "",
			envVersion = app.globalData.appInfo.envVersion;
		if(envVersion == "release" || envVersion == "trial") {
			Domain = app.globalData.appInfo.prdDomain;
		} else if(envVersion == "develop") {
			Domain = app.globalData.appInfo.stgDomain;
		}
		return Domain + url;
	}
}

export default Colin;
