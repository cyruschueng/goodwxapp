using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.game.qzsf.exchange
{
    public class AsyncCallbackData
    {
        /// <summary>
        /// 用户OpenId
        /// </summary>
        public string OpenId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Type { get; set; }
        /// <summary>
        /// 消耗数量
        /// </summary>
        public int QuantityConsumed { get; set; }
        
    }
}