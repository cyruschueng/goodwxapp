using BaseDatabase.Services.PaySettings;
using BaseDatabase.Services.UserInfos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using Web.Models;
using Web.Models.Pays;
using MyUntil;
using BaseDatabase.Services.BaseSettings;
using BaseDatabase.Entities.BaseSettings;
using System.Xml;
using System.IO;
using System.Data;
using Newtonsoft.Json;
using BaseDatabase.Entities.PayInfos;
using BaseDatabase.Services.PayInfos;
using System.Web;

namespace Web.Controllers
{
    public class PayController : ApiController
    {
        private readonly IPaySettingService _PaySettingService;
        private readonly IBaseSettingService _baseSettingService;
        private readonly IUserInfoService _userInfoService;
        private readonly IPayInfoService _payInfoService;
        private readonly PayHelper _payHelper;
        

        private static readonly object PayLock = new object();
        private static readonly object PayNotifyLock = new object();
        private static List<string> _successSerialNumberList = new List<string>();
        public PayController()
        {
            _PaySettingService = new PaySettingService();
            _baseSettingService = new BaseSettingService();
            _userInfoService = new UserInfoService();
            _payInfoService = new PayInfoService();
            _payHelper = new PayHelper();
        }

        [HttpGet]
        public IHttpActionResult Pay([FromUri]PayParamModel paramModel)
        {
            var model = new PayModel();

            try
            {
                lock (PayLock)
                {
                    var baseSetting = _baseSettingService.GetLast();
                    if (baseSetting == null)
                    {
                        throw new MyProException("无效的基础设置");
                    }

                    var paySetting = _PaySettingService.GetLast();
                    if (paySetting == null)
                    {
                        throw new MyProException("无效的支付设置");
                    }

                    if (string.IsNullOrEmpty(paramModel.OpenId))
                    {
                        throw new MyProException("openId不能为空");
                    }
                    var userInfo = _userInfoService.GetByOpenId(paramModel.OpenId);
                    if (userInfo == null)
                    {
                        throw new MyProException("openId 无效");
                    }
                    decimal totalFee;
                    if (!decimal.TryParse(paramModel.Amount, out totalFee))
                    {
                        throw new MyProException("支付金额有误");
                    }
                    var logStr = new StringBuilder();
                    var body = _payHelper.GetUtf8Str(paySetting.ShortName + "-美发/美容/美甲店");
                    var random = new Random();
                    Dictionary<string, string> resultDic = null;
                    var serialNumber = DateTime.Now.ToString("yyyyMMddHHmmssfff") + random.Next(999);

                    var dic = new Dictionary<string, string>
                    {
                        {"appid", baseSetting.AppId},
                        {"mch_id", paySetting.MchId},
                        {"nonce_str", _payHelper.GetRandomString(20)},
                        {"body", body},
                        {"out_trade_no", serialNumber},
                        {"total_fee", paramModel.Amount},
                        {"spbill_create_ip", paySetting.IpAddress},
                        {"notify_url", paySetting.PayResulturl},
                        {"trade_type", "JSAPI"},
                        {"openid", paramModel.OpenId}
                    };
                    dic.Add("sign", _payHelper.GetSignString(dic, paySetting.PayKey));
                    var strB = new StringBuilder();
                    strB.Append("<xml>");
                    foreach (var d in dic)
                    {
                        strB.AppendFormat("<{0}>{1}</{0}>", d.Key, d.Value);
                    }
                    strB.Append("</xml>");

                    logStr.AppendLine("支付请求的xml" + strB);
                    var xml = new XmlDocument();
                    var en = Encoding.GetEncoding("UTF-8");
                    var response = _payHelper.CreatePostHttpResponse("https://api.mch.weixin.qq.com/pay/unifiedorder",
                        strB.ToString(), en);
                    if (response != null)
                    {
                        //打印返回值  
                        var stream = response.GetResponseStream(); //获取响应的字符串流
                        if (stream != null)
                        {
                            var sr = new StreamReader(stream); //创建一个stream读取流  
                            var html = sr.ReadToEnd(); //从头读到尾，放到字符串html
                            logStr.AppendLine("请求返回的结果:" + html);
                            xml.LoadXml(html);
                            //对请求返回值 进行处理  
                            var root = xml.DocumentElement;
                            var ds = new DataSet();
                            var stram = new StringReader(html);
                            var reader = new XmlTextReader(stram);
                            ds.ReadXml(reader);
                            var returnCode = ds.Tables[0].Rows[0]["return_code"].ToString();
                            if (returnCode.ToUpper() == "SUCCESS")
                            {
                                resultDic = new Dictionary<string, string>
                                {
                                    {"appId", baseSetting.AppId},
                                    {"timeStamp", _payHelper.GetTimeStamp()},
                                    {"nonceStr", dic["nonce_str"]},
                                    {"package", "prepay_id=" + ds.Tables[0].Rows[0]["prepay_id"]},
                                    {"signType", "MD5"}
                                };
                                //在服务器上签名
                                resultDic.Add("paySign", _payHelper.GetSignString(resultDic, paySetting.PayKey));
                                model.TimeStamp = resultDic["timeStamp"];
                                model.NonceStr = resultDic["nonceStr"];
                                model.Package = resultDic["package"];
                                model.SignType = resultDic["signType"];
                                model.PaySign = resultDic["paySign"];
                                var requestStr = JsonConvert.SerializeObject(resultDic);
                                logStr.AppendLine("返回的结果:" + requestStr);
                                var payInfo = new PayInfo()
                                {
                                    UserInfoId = userInfo.Id,
                                    Amount = decimal.Parse(paramModel.Amount) / 100,
                                    IsPay = false,
                                    TradeNo = serialNumber,
                                    Body = body,
                                    CreateOn = DateTime.Now
                                };
                                _payInfoService.Insert(payInfo);
                            }
                            else
                            {
                                var returnMsg = ds.Tables[0].Rows[0]["return_msg"].ToString();
                                model.IsSuccess = false;
                                model.ReturnMsg = returnMsg;
                                logStr.AppendLine("返回的结果:" + JsonConvert.SerializeObject(model));
                            }
                        }
                        else
                        {
                            model.IsSuccess = false;
                            model.ReturnMsg = "response.GetResponseStream() is null";
                            logStr.AppendLine("返回的结果:" + JsonConvert.SerializeObject(model));
                        }
                    }
                    else
                    {
                        model.IsSuccess = false;
                        model.ReturnMsg = "CreatePostHttpResponse is null";
                        logStr.AppendLine("返回的结果:" + JsonConvert.SerializeObject(model));
                    }
                    WebLogHelper.WebLog(logStr.ToString());
                    model.IsSuccess = true;
                    model.ReturnMsg = "调用成功";
                }
            }
            catch (Exception ex)
            {
                model.IsSuccess = false;
                model.ReturnMsg = ex.Message;
            }


            return Json(model);
        }

        [HttpPost]
        public string PayNotify()
        {
            lock (PayNotifyLock)
            {
                var xmlData = "";

                var isNoError = true;

                try
                {
                    xmlData = _payHelper.GetInputStreamStr(HttpContext.Current.Request.InputStream);
                }
                catch (Exception ex)
                {
                    isNoError = false;
                    WebLogHelper.WebLog(ex.Message);
                }

                if (string.IsNullOrWhiteSpace(xmlData))
                {
                    WebLogHelper.WebLog("获取的通知信息为空");
                    return string.Empty;
                }
                var logStr = new StringBuilder();
                var ds = new DataSet();

                using (var reader = new StringReader(xmlData))
                {
                    using (var dataReader = new XmlTextReader(reader))
                    {
                        ds.ReadXml(dataReader);
                    }
                }

                var transactionId = string.Empty;
                var outTradeNo = string.Empty;
                var timeEnd = string.Empty;
                try
                {
                    if (ds.Tables[0].Rows[0]["return_code"].ToString() != "SUCCESS")
                    {
                        // 返回信息，如非空，为错误原因  签名失败 参数格式校验错误  
                        var returnMsg = ds.Tables[0].Rows[0]["return_msg"].ToString();
                        throw new MyProException("错误原因：" + returnMsg);
                    }
                    else
                    {
                        transactionId = ds.Tables[0].Rows[0]["transaction_id"].ToString();
                        outTradeNo = ds.Tables[0].Rows[0]["out_trade_no"].ToString();
                        var exists = _successSerialNumberList.FirstOrDefault(q => q.Equals(transactionId)) != null;
                        if (exists)
                        {
                            throw new MyProException(transactionId + "已通知过");
                        }
                        else
                        {
                            _successSerialNumberList.Add(transactionId);
                            var dbExists = _payInfoService.GetHasPayedPayInfoBySerialNumber(outTradeNo) != null;
                            if (dbExists)
                            {
                                throw new MyProException(transactionId + "的已支付信息在数据库表中已经存在");
                            }
                        }
                        logStr.AppendLine("获取的通知信息为：" + xmlData);
                    }
                }
                catch (Exception ex)
                {
                    isNoError = false;
                    WebLogHelper.WebLog("报错信息：" + ex.Message);
                    return string.Empty;
                }

                #region 数据解析

                var signStr = string.Empty;
                try
                {
                    //微信开放平台审核通过的应用APPID 
                    if (ds.Tables[0].Columns.Contains("appid"))
                    {
                        var appId = ds.Tables[0].Rows[0]["appid"].ToString();
                        if (!string.IsNullOrEmpty(appId))
                        {
                            signStr += "appid=" + appId;
                        }
                    }

                    //银行类型，采用字符串类型的银行标识，银行类型见银行列表  
                    if (ds.Tables[0].Columns.Contains("bank_type"))
                    {
                        var bankType = ds.Tables[0].Rows[0]["bank_type"].ToString();
                        if (!string.IsNullOrEmpty(bankType))
                        {
                            signStr += "&bank_type=" + bankType;
                        }
                    }

                    //现金支付金额订单现金支付金额，详见支付金额  
                    if (ds.Tables[0].Columns.Contains("cash_fee"))
                    {
                        var cashFee = Convert.ToInt32(ds.Tables[0].Rows[0]["cash_fee"].ToString());

                        signStr += "&cash_fee=" + cashFee;
                    }

                    // 货币类型，符合ISO4217标准的三位字母代码，默认人民币：CNY，其他值列表详见货币类型  
                    if (ds.Tables[0].Columns.Contains("fee_type"))
                    {
                        var feeType = ds.Tables[0].Rows[0]["fee_type"].ToString();
                        if (!string.IsNullOrEmpty(feeType))
                        {
                            signStr += "&fee_type=" + feeType;
                        }
                    }

                    //用户是否关注公众账号，Y-关注，N-未关注，仅在公众账号类型支付有效    
                    if (ds.Tables[0].Columns.Contains("is_subscribe"))
                    {
                        var isSubscribe = ds.Tables[0].Rows[0]["is_subscribe"].ToString();
                        if (!string.IsNullOrEmpty(isSubscribe))
                        {
                            signStr += "&is_subscribe=" + isSubscribe;
                        }
                    }

                    //微信支付分配的商户号
                    if (ds.Tables[0].Columns.Contains("mch_id"))
                    {
                        var mchId = ds.Tables[0].Rows[0]["mch_id"].ToString();
                        if (!string.IsNullOrEmpty(mchId))
                        {
                            signStr += "&mch_id=" + mchId;
                        }
                    }

                    //随机字符串，不长于32位  
                    if (ds.Tables[0].Columns.Contains("nonce_str"))
                    {
                        var nonceStr = ds.Tables[0].Rows[0]["nonce_str"].ToString();
                        if (!string.IsNullOrEmpty(nonceStr))
                        {
                            signStr += "&nonce_str=" + nonceStr;
                        }
                    }

                    //用户在商户appid下的唯一标识  
                    if (ds.Tables[0].Columns.Contains("openid"))
                    {
                        var openId = ds.Tables[0].Rows[0]["openid"].ToString();
                        if (!string.IsNullOrEmpty(openId))
                        {
                            signStr += "&openid=" + openId;
                        }
                    }

                    //商户系统的订单号，与请求一致。
                    if (ds.Tables[0].Columns.Contains("out_trade_no"))
                    {
                        outTradeNo = ds.Tables[0].Rows[0]["out_trade_no"].ToString();
                        if (!string.IsNullOrEmpty(outTradeNo))
                        {
                            signStr += "&out_trade_no=" + outTradeNo;
                        }
                    }

                    //SUCCESS/FAIL   
                    if (ds.Tables[0].Columns.Contains("result_code"))
                    {
                        var resultCode = ds.Tables[0].Rows[0]["result_code"].ToString();
                        if (!string.IsNullOrEmpty(resultCode))
                        {
                            signStr += "&result_code=" + resultCode;
                        }
                    }

                    //   
                    if (ds.Tables[0].Columns.Contains("return_code"))
                    {
                        var returnCode = ds.Tables[0].Rows[0]["return_code"].ToString();
                        if (!string.IsNullOrEmpty(returnCode))
                        {
                            signStr += "&return_code=" + returnCode;
                        }
                    }

                    //支付完成时间，格式为yyyyMMddHHmmss，如2009年12月25日9点10分10秒表示为20091225091010。其他详见时间规则
                    if (ds.Tables[0].Columns.Contains("time_end"))
                    {
                        timeEnd = ds.Tables[0].Rows[0]["time_end"].ToString();
                        if (!string.IsNullOrEmpty(timeEnd))
                        {
                            signStr += "&time_end=" + timeEnd;
                        }
                    }

                    // 订单总金额，单位为分    
                    if (ds.Tables[0].Columns.Contains("total_fee"))
                    {
                        var totalFee = Convert.ToInt32(ds.Tables[0].Rows[0]["total_fee"].ToString());

                        signStr += "&total_fee=" + totalFee;
                    }

                    //APP  
                    if (ds.Tables[0].Columns.Contains("trade_type"))
                    {
                        var tradeType = ds.Tables[0].Rows[0]["trade_type"].ToString();
                        if (!string.IsNullOrEmpty(tradeType))
                        {
                            signStr += "&trade_type=" + tradeType;
                        }
                    }

                    //微信支付订单号
                    if (ds.Tables[0].Columns.Contains("transaction_id"))
                    {
                        if (!string.IsNullOrEmpty(transactionId))
                        {
                            signStr += "&transaction_id=" + transactionId;
                        }
                    }
                    var paySetting = _PaySettingService.GetLast();

                    //追加key 密钥  
                    signStr += "&key=" + paySetting.PayKey;
                }
                catch (Exception ex)
                {
                    isNoError = false;
                    WebLogHelper.WebLog("数据解析出错："+ex.Message);
                }
                
                #endregion


                //wxSign   
                if (ds.Tables[0].Columns.Contains("sign"))
                {
                    var wxSign = ds.Tables[0].Rows[0]["sign"].ToString();

                    var matchSign = string.Empty;

                    try
                    {
                        var hashPasswordForStoringInConfigFile = System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(signStr, "MD5");
                        if (hashPasswordForStoringInConfigFile !=
                            null)
                            matchSign =
                                hashPasswordForStoringInConfigFile
                                    .ToUpper();
                        logStr.AppendLine("转换后的标识为：" + matchSign);
                    }
                    catch (Exception ex)
                    {
                        isNoError = false;
                        WebLogHelper.WebLog("转换匹配出错原因为：" + ex.Message);
                        return string.Empty;
                    }

                    if (wxSign.Equals(matchSign))
                    {
                        try
                        {
                            logStr.AppendLine("签名正确，处理操作逻辑");

                            var payInfo = _payInfoService.GetUnpayPayInfoBySerialNumber(outTradeNo.Trim());

                            if (payInfo != null)
                            {
                                payInfo.IsPay = true;
                                _payInfoService.Update(payInfo);
                                logStr.AppendLine("操作逻辑处理完成");
                            }
                            else
                            {
                                throw new MyProException("找不到对应的支付信息");
                            }
                        }
                        catch (Exception ex)
                        {
                            isNoError = false;
                            WebLogHelper.WebLog("处理操作逻辑出错，原因为：" + ex.Message + ex.StackTrace + ex.Source);
                        }
                    }
                    else
                    {
                        WebLogHelper.WebLog("签名出错");
                    }
                }
                if (isNoError)
                {
                    WebLogHelper.WebLog(logStr.ToString());
                }
            }
            return "<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>";
        }
    }
}
