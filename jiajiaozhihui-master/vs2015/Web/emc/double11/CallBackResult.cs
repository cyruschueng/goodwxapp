using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.emc.double11
{
    /// <summary>
    /// 导入发货订单，并更新订单，标款已发货
    /// </summary>
    public class CallBackResult
    {
        /// <summary>
        /// 要更新的总数量
        /// </summary>
        public int Length { get; set; }
        /// <summary>
        /// 更新的数量
        /// </summary>
        public int UpDateRows { get; set; }
        /// <summary>
        /// 1:更新完成;2没有全更新完;0更新出错
        /// </summary>
        public int Code { get; set; }
    }
}