using BaseDatabase.BaseDbInstanceMangers;
using BaseDatabase.Entities.ShareLogs;
using BaseDatabase.Services.BaseSettings;
using BaseDatabase.Services.ShareLogs;
using MyUntil;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;
using Web.Models;
using Web.Models.Shares;

namespace Web.Controllers
{
    public class ShareController : ApiController
    {
        private readonly IShareLogInfoService shareLogInfoService;

        private readonly IShareInfoService shareInfoService;

        private readonly IBaseSettingService baseSettingService;

        public ShareController()
        {
            this.shareLogInfoService = BaseDbInstanceManger.GetShareLogInfoService();

            this.shareInfoService = BaseDbInstanceManger.GetShareInfoService();

            this.baseSettingService = BaseDbInstanceManger.GetBaseSettingService();
        }

        private readonly static object AddShareLogInfoLock = new object();

        private readonly static object AddShareInfoLock = new object();

        [Route("api/Share/AddShareLogInfo")]
        [HttpPost]
        public IHttpActionResult AddShareLogInfo(dynamic obj)
        {
            var model = new AddShareLogInfoModel();
            try
            {
                lock (AddShareLogInfoLock)
                {
                    int shareUserInfoId = obj.ShareUserInfoId;
                    int targetUserInfoId = obj.TargetUserInfoId;
                    int shareType = obj.ShareType;
                    var isExists = shareLogInfoService.IsExists(shareUserInfoId, targetUserInfoId, shareType);
                    if (!isExists)
                    {
                        shareLogInfoService.Insert(new ShareLogInfo
                        {
                            ShareUserInfoId = obj.ShareUserInfoId,
                            TargetUserInfoId = obj.TargetUserInfoId,
                            ShareType = obj.ShareType,
                            ShareName = obj.ShareName,
                            OpenGId = obj.OpenGId
                        });
                        model.IsSuccess = true;
                        model.ReturnMsg = "添加成功";
                    }
                    else
                    {
                        model.IsSuccess = false;
                        model.ReturnMsg = "已添加过";
                    }
                }
                return Json(model);
            }
            catch (Exception ex)
            {
                model.IsSuccess = false;
                model.ReturnMsg = "操作失败，详情请查看日志";
                WebLogHelper.WebErrorLog("AddShareLogInfo", ex);
            }
            return Json(model);
        }

        [Route("api/Share/AddShareInfo")]
        [HttpPost]
        public IHttpActionResult AddShareInfo(dynamic obj)
        {
            var model = new AddShareInfoModel();
            try
            {
                lock (AddShareInfoLock)
                {
                    this.shareInfoService.Insert(new ShareInfo
                    {
                        ShareUserInfoId = obj.ShareUserInfoId,
                        ShareType = obj.ShareType,
                        ShareName = obj.ShareName,
                        OpenGId = obj.OpenGId
                    });
                    model.IsSuccess = true;
                    model.ReturnMsg = "添加成功";
                    return Json(model);
                }
            }
            catch (Exception ex)
            {
                model.IsSuccess = false;
                model.ReturnMsg = "操作失败，详情请查看日志";
                WebLogHelper.WebErrorLog("AddShareInfo", ex);
            }
            return Json(model);
        }

        [Route("api/Share/ShareInfoAES")]
        [HttpPost]
        public IHttpActionResult ShareInfoAES(dynamic obj)
        {
            var model = new BaseReturnModel() {
                IsSuccess = true,
                ReturnMsg = "解密成功"
            };
            try
            {
                WebLogHelper.WebLog(JsonConvert.SerializeObject(obj));
                var rijndaelCipher = new RijndaelManaged();
                rijndaelCipher.Mode = CipherMode.CBC;

                rijndaelCipher.Padding = PaddingMode.PKCS7;

                rijndaelCipher.KeySize = 128;

                rijndaelCipher.BlockSize = 128;
                //WebLogHelper.WebLog(obj.encryptedData.Value);
                byte[] Data = Convert.FromBase64String(obj.encryptedData.Value);
                //WebLogHelper.WebLog(obj.sessionKey.Value);
                byte[] pwdBytes = Convert.FromBase64String(obj.sessionKey.Value);

                byte[] keyBytes = new byte[16];

                int len = pwdBytes.Length;

                if (len > keyBytes.Length) len = keyBytes.Length;

                System.Array.Copy(pwdBytes, keyBytes, len);

                rijndaelCipher.Key = keyBytes;
                //WebLogHelper.WebLog(obj.iv.Value);
                rijndaelCipher.IV = Convert.FromBase64String(obj.iv.Value);

                var transform = rijndaelCipher.CreateDecryptor();

                byte[] plainText = transform.TransformFinalBlock(Data, 0, Data.Length);

                var resultStr = Encoding.UTF8.GetString(plainText);

                if (!string.IsNullOrEmpty(resultStr))
                {
                    //WebLogHelper.WebLog(resultStr);
                    var result = JsonConvert.DeserializeObject<ShareInfoAESModel>(resultStr);
                    if (result == null || result.watermark == null || result.watermark.appid == null)
                    {
                        throw new MyProException(resultStr + "解密结果反序列后结果有误");
                    }

                    var baseSetting = this.baseSettingService.GetLast();
                    if (!baseSetting.AppId.Equals(result.watermark.appid))
                    {
                        throw new MyProException("不是当前小程序对应的appid");
                    }
                    return Json(result);
                }
                else
                {
                    throw new MyProException("解密结果为空");
                }
            }
            catch (Exception ex)
            {
                model.IsSuccess = false;
                model.ReturnMsg = "操作失败，详情请查看日志";
                WebLogHelper.WebErrorLog("ShareInfoAES", ex);
                return Json(model);
            }
        }
    }
}
