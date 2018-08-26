using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SfSoft.web.Course.Models.Course;

namespace SfSoft.web.Course.Models.Home
{
    public class HomeInfo
    {
        /// <summary>
        /// 特训
        /// </summary>
        public IEnumerable<Bags> Bags { get; set; }
        /// <summary>
        /// 直播
        /// </summary>
        public IEnumerable<Base> Live { get; set; }
        /// <summary>
        /// 常训
        /// </summary>
        public IEnumerable<Base> Common { get; set; }

        /// <summary>
        /// 习惯
        /// </summary>
        public IEnumerable<Base> XueGuan { get; set; }
        /// <summary>
        /// 责任
        /// </summary>
        public IEnumerable<Base> ZeRen { get; set; }
        /// <summary>
        /// 信心
        /// </summary>
        public IEnumerable<Base> XinXun { get; set; }
        /// <summary>
        /// 表达
        /// </summary>
        public IEnumerable<Base> BiaoDa { get; set; }
        /// <summary>
        /// 专注力
        /// </summary>
        public IEnumerable<Base> ZuanZhuli { get; set; }
        /// <summary>
        /// 价值观
        /// </summary>
        public IEnumerable<Base> JiaZhiGuan { get; set; }
        /// <summary>
        /// 安全
        /// </summary>
        public IEnumerable<Base> AnQuan { get; set; }
        /// <summary>
        /// 情商
        /// </summary>
        public IEnumerable<Base> QianShuan { get; set; }
        /// <summary>
        /// 财商
        /// </summary>
        public IEnumerable<Base> CaiShuan { get; set; }
        /// <summary>
        /// 美德
        /// </summary>
        public IEnumerable<Base> MeiDe { get; set; }

        public DateTime Now { get; set; }
        /// <summary>
        /// 有没有买特定的学习卡
        /// </summary>
        public bool IsBuyCard { get; set; }
        /// <summary>
        /// 参与人数
        /// </summary>
        public int Quantity { get; set; }
        
    }
}