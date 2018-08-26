using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Gxdr.Models.QueryString
{
    public class QueryStringDetails
    {
        /// <summary>
        /// 分数
        /// </summary>
        public int? Score{get;set;}
        /// <summary>
        /// 所有的时间
        /// </summary>
        public int? UsingTime{get;set;}
        /// <summary>
        /// 问题Id
        /// </summary>
        public int QuestionId{get;set;}
        /// <summary>
        /// 1:正确答题 0：错误答题
        /// </summary>
        public int? IsRight{get;set;}
        /// <summary>
        /// 选择的答案
        /// </summary>
        public string Answer{get;set;}

    }
}