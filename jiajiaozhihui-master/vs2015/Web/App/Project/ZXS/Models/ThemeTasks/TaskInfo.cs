using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.ZXS.Models.ThemeTasks
{
    public class TaskInfo
    {
        public int TaskId { get; set; }
        /// <summary>
        /// 需求量
        /// </summary>
        public int Quantity { get; set; }
        /// <summary>
        /// 当前完成量
        /// </summary>
        public int Number { get; set; }
        /// <summary>
        /// 任务是不是可选
        /// </summary>
        public int Optional { get; set; }
        /// <summary>
        /// 大小任务
        /// </summary>
        public int? TaskClass { get; set; }
        /// <summary>
        /// 任务时不是完成
        /// </summary>
        public bool IsComplete { get; set; }
        /// <summary>
        /// 路径
        /// </summary>
        public string Hash { get; set; }
        /// <summary>
        /// 单位
        /// </summary>
        public string Unit { get; set; }
        /// <summary>
        /// 任务标题
        /// </summary>
        public string TaskTitle { get; set; }
        /// <summary>
        /// 任务类型 1：上传图片 2：上传音频 3：上传视频 4：分享 0：无
        /// </summary>
        public int TaskType { get; set; }
        /// <summary>
        /// 频率
        /// </summary>
        public string HZ { get; set; }
        public string Expository { get; set; }
        public string Logo { get; set; }
        /// <summary>
        /// 当前主题下第几周
        /// </summary>
        public int Week { get; set; }
        /// <summary>
        /// 今天任务有没有完成
        /// </summary>
        public bool IsTodayComplete { get; set; }
        public string Other { get; set; }
        public string Introduce { get; set; }
        /// <summary>
        /// 考背状态
        /// </summary>
        public Models.Recite.ReciteResult ReciteState { get; set; }
    }
}