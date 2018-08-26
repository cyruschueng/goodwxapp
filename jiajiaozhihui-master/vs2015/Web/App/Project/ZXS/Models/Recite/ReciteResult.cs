using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Models.Recite
{
    public class ReciteResult
    {
        /// <summary>
        /// 申请次数
        /// </summary>
        public int ApplyNumber { get; set; }
        /// <summary>
        /// -1:忽略 0:申请 1：完成 2:等审 3：超过申请次数(失败)
        /// </summary>
        public int ApplyState { get; set; }
    }
}