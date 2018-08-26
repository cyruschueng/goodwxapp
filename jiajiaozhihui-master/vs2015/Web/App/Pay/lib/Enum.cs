using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WxPayAPI
{
    public enum WxPayProjectEnum
    { 
        父母特训营=1,
    }
    public enum PayTypeEnum
    {
        /// <summary>
        /// 入帐
        /// </summary>
        Entry= 1,
        /// <summary>
        /// 出帐
        /// </summary>
        Charge= 2
    }

    public enum BillTypeEnum
    {
        /// <summary>
        /// 父母特训营 
        /// </summary>
        CourseTX = 1,
        /// <summary>
        /// 家教问答
        /// </summary>
        QA=2,
    }
}