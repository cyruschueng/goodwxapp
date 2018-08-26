using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.common
{
    [Serializable]
    public class ReturnJson
    {
        /// <summary>
        /// 返回代码
        /// </summary>
        public int Code { get; set; }
        /// <summary>
        /// 返回提示
        /// </summary>
        public string Msg { get; set; }
        /// <summary>
        /// 返回的内容
        /// </summary>
        public string Body { get; set; }

        public string Return() {
            if ( Body!=null && Body.EndsWith("}") && Body.StartsWith("{"))
            {
                return "{\"code\":\"" + Code + "\",\"msg\":\"" + Msg + "\",\"body\":" + Body + "}";
            }
            else {
                return "{\"code\":\"" + Code + "\",\"msg\":\"" + Msg + "\",\"body\":\"" + Body + "\"}";
            }
        }
    }
}