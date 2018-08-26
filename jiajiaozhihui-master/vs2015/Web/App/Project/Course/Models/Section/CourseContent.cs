using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Course.Models.Section
{
    public class CourseContent
    {
        public int Id{get;set;}
        /// <summary>
        /// 课程Id
        /// </summary>
        public int  CourseId{get;set;}
        /// <summary>
        /// 文档类型（图片，文字，音频，视频）
        /// </summary>
        public int Type{get;set;}
        /// <summary>
        /// 时长(秒)
        /// </summary>
        public decimal? Duration{get;set;}
        /// <summary>
        /// 音频与视频地址
        /// </summary>
        public string Url{get;set;}
        /// <summary>
        /// 内容
        /// </summary>
        public string Content{get;set;}
        /// <summary>
        /// 顺序
        /// </summary>
        public int? Sn{get;set;}
        /// <summary>
        /// 是否是嵌入式
        /// </summary>
        public int? IsIframe{get;set;}
        /// <summary>
        /// 封面
        /// </summary>
        public string Cover{get;set;}
        /// <summary>
        /// 视频比率（16:9; 4:3）
        /// </summary>
        public string Responsive{get;set;}
        /// <summary>
        /// 小节
        /// </summary>
        public string SectionId { get; set; }
        /// <summary>
        /// 角色
        /// </summary>
        public string Roles { get; set; }
        /// <summary>
        /// 名字
        /// </summary>
        public string Cname { get; set; }
        /// <summary>
        /// 日期
        /// </summary>
        public DateTime? CreateDate { get; set; }
        /// <summary>
        /// 间隔时间
        /// </summary>
        public int? Interval { get; set; }
        /// <summary>
        /// 是否已播放
        /// </summary>
        public int? Already { get; set; }
        /// <summary>
        /// 是否立即显示
        /// </summary>
        public int? AtOnceShow { get; set; }
        /// <summary>
        /// 显示时间
        /// </summary>
        public DateTime ShowDateTime { get; set; }
    }
}