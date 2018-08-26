using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Gxdr.Models.AnswerResult
{
    public class ResultInfo
    {
        /// <summary>
        /// 用户
        /// </summary>
        public string OpenId{get;set;}
        /// <summary>
        /// 活动Id
        /// </summary>
        public int ActiveId { get; set; }
        /// <summary>
        /// 总分数
        /// </summary>
        public int Score{get;set;}
        /// <summary>
        /// 总用时间
        /// </summary>
        public int UsingTime { get; set; }
        /// <summary>
        /// 是否升级 false:未升级 true:已升级
        /// </summary>
        public string Grade{get;set;}
        /// <summary>
        /// 金币
        /// </summary>
        public int Gold{get;set;}
        /// <summary>
        /// 一组QuestionId
        /// </summary>
        public string Detail{get;set;}
    }
}