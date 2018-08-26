using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.emc.wxcourse.card
{
    public class QRCordCard
    {
        /// <summary>
        /// 须生成二维码的内容
        /// </summary>
        public string Url { get; set; }
        /// <summary>
        /// 每一个学习卡的Id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 不同的卡有不同的卡Id
        /// </summary>
        public int CardId { get; set; }
        /// <summary>
        /// 校验码
        /// </summary>
        public string CheckCode { get; set; }
        /// <summary>
        /// 卡号
        /// </summary>
        public string CardNo { get; set; }
    }
}