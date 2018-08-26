export class ApiConfig{
  static GetApiUrl() {
    return "https://cmsdev.app-link.org/alucard263096/minishare/api/";
  }
  static GetUploadPath() {
    return "http://applinkupload.oss-cn-shenzhen.aliyuncs.com/alucard263096/minishare/";
  } 
  static GetFileUploadAPI() {
    return "https://cmsdev.app-link.org/alucard263096/minishare/fileupload";
}
  static GetHeader(){
    var headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'UNICODE': ApiConfig.UNICODE,
      'TOKEN': ApiConfig.TOKEN
    };
    return headers;
  }
  static UNICODE="";
  static SetUnicode(unicode){
    ApiConfig.UNICODE=unicode;
  }
  static TOKEN = "";
  static SetToken(token) {
    ApiConfig.TOKEN = token;
  }

  static showLoadingCounter = 0;
  static ShowLoading = function () {
    if (ApiConfig.showLoadingCounter == 0) {
      wx.showLoading({
        title: '加载中',
      });
    }
    ApiConfig.showLoadingCounter = ApiConfig.showLoadingCounter + 1;
  }

  static CloseLoading = function () {
    ApiConfig.showLoadingCounter = ApiConfig.showLoadingCounter - 1;
    if (ApiConfig.showLoadingCounter == 0) {
      console.log(ApiConfig.showLoadingCounter);
      wx.hideLoading();
    }
  }




}