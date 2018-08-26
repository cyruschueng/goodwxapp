using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShenerWeiXin.Interface
{
    /// <summary>
    /// 关注活动
    /// </summary>
    public interface ISubscribeActivity
    {
        /// <summary>
        /// 建立分享者与朋友关系数据
        /// </summary>
        /// <param name="shareID"></param>
        /// <param name="friendID"></param>
        /// <returns></returns>
        int Add(string shareID, string friendID);
        /// <summary>
        /// 确认是否关注
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        bool Confirm(string openid);
        /// <summary>
        /// 是否已关注
        /// </summary>
        /// <param name="openid"></param>
        /// <returns></returns>
        bool IsSubscribe(string openid);
    }
}
