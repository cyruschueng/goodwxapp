using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.AppStart.Model
{
    public class WXParamsII
    {
        /// <summary>
        /// 用户ID
        /// </summary>
        public string OpenId { get; set; }
        /// <summary>
        /// 项目Id
        /// </summary>
        public string AppId { get; set; }
        /// <summary>
        /// 描点
        /// </summary>
        public string Hash { get; set; }
        /// <summary>
        /// 分享者
        /// </summary>
        public string Sharer { get; set; }
        /// <summary>
        /// 某个对象Id
        /// </summary>
        public string ObjectId { get; set; }
        /// <summary>
        /// 其它参数
        /// </summary>
        public string Remark { get; set; }

        /// <summary>
        /// js-sdk配置
        /// </summary>
        public Senparc.Weixin.MP.Helpers.JsSdkUiPackage JsSdk { get; set; }

        /// <summary>
        /// 微信用户信息
        /// </summary>
        public SfSoft.Model.WX_UserInfo WxUserInfo { get; set; }

        /// <summary>
        /// 是否注册
        /// </summary>
        public bool IsRegist { get; set; }
        /// <summary>
        /// 其它所需的数据
        /// </summary>
        public object Other { get; set; }
    }
}

/*
 
 * /// o=openid //用户id
        /// a=app001 //项目id
        /// h=hash // 描点
        /// s=openid //分享者
        /// id=某个产品
        /// r=其它参数
 
 */