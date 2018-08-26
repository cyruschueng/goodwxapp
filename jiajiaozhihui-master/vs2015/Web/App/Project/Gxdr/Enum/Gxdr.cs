using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Gxdr.Enum
{
    /// <summary>
    /// 计算方式 
    /// </summary>
    public enum GxdrComputeEnum
    {
        /// <summary>
        /// 重新计算，覆盖前一次的计算
        /// </summary>
        Restart=1,
        /// <summary>
        /// 不会覆盖
        /// </summary>
        None=0
    }
}