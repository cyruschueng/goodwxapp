using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.emc.wxcourse.card
{
    public class result
    {
        public string State { get; set; }
        public int CardId { get; set; }
        /// <summary>
        /// 数量
        /// </summary>
        public int Quantity { get; set; }
        /// <summary>
        /// 学习卡编号
        /// </summary>
        public string CardNo { get; set; }
    }
}