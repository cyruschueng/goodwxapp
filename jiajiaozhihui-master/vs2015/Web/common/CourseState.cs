using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.common
{
    public class CourseState
    {
        /// <summary>
        /// 返回码
        /// </summary>
        public int Code { get; set; }
        /// <summary>
        /// 收费还是免费
        /// </summary>
        public int Type { get; set; }
        /// <summary>
        /// 课程Id 多个用逗号隔开
        /// </summary>
        public string CourseId { get; set; }

        /// <summary>
        /// 总价格
        /// </summary>
        public decimal Price { get; set; }
    }
}