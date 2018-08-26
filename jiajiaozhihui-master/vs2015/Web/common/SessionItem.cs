using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.common
{
    public class SessionItem
    {
        /// <summary>
        /// 操作类型
        /// </summary>
        public Operation Oper { get; set; }
        
        /// <summary>
        /// 数据对象
        /// </summary>
        public object Data { get; set; }
        /// <summary>
        /// 是否自动删除
        /// </summary>
        public bool AutoRemove
        {
            get;
            set;
        }
        /// <summary>
        /// 最后更新时间
        /// </summary>
        public DateTime UpdateTime { get; set; }
    }
}