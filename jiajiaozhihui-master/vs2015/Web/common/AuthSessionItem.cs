using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.common
{
    public class AuthSessionItem
    {
        /// <summary>
        /// 用户名
        /// </summary>
        public string OpenID { get; set; }
        /// <summary>
        /// 唯一标识
        /// </summary>
        public string ID { get; set; }
        /// <summary>
        /// 微信昵称
        /// </summary>
        public string NickNam { get; set; }
        /// <summary>
        /// 性别
        /// </summary>
        public int Sex { get; set; }
        /// <summary>
        /// 头像
        /// </summary>
        public string Headimgurl { get; set; }

    }
}