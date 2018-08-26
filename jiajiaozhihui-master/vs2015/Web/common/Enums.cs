using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web
{
    /// <summary>
    /// 课程类型
    /// </summary>
    public enum CourseType
    { 
        /// <summary>
        /// 公开课
        /// </summary>
        Open=0,
        /// <summary>
        /// 收货课
        /// </summary>
        Charge=1
    }
    /// <summary>
    /// 课程优选级
    /// </summary>
    public enum CourseLevel
    {
        /// <summary>
        /// 精品课程
        /// </summary>
        Quality=0,
        /// <summary>
        /// 推荐课程
        /// </summary>
        Suggested=1,
    }
    /// <summary>
    /// 课程分类
    /// </summary>
    public enum CourseClassify
    { 
        /// <summary>
        /// IT
        /// </summary>
        IT=0,
        /// <summary>
        /// 亲子
        /// </summary>
        QinZhi=1,
    }

    public enum EnumCourseState
    {
        /// <summary>
        /// 未授权
        /// </summary>
        UnAuthorized=-1,
        /// <summary>
        /// 免费
        /// </summary>
        Free=0,
        /// <summary>
        /// 付费
        /// </summary>
        Charge=1,
        /// <summary>
        /// 有异常
        /// </summary>
        Error=2,
        /// <summary>
        /// 正常
        /// </summary>
        Ok=3,
        /// <summary>
        /// 没有选择课程
        /// </summary>
        Empty=4,

    }
    public enum EnumReturnJson
    { 
        /// <summary>
        /// 
        /// </summary>
        Ok=1,
        /// <summary>
        /// 出错
        /// </summary>
        Error=2,
        /// <summary>
        /// 重复订购
        /// </summary>
        Exist=3,
        /// <summary>
        /// 未知收货信息
        /// </summary>
        UnAddress=4
    }
}