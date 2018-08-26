using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.game.doublenovemberII
{
    public enum EnumIntegral
    {
        上传作品=1,
        评论=2,
        结伴成功=3,
        邀请好友成功=4,
        为别人点赞=5,
        获取点赞=6,
        积分初始化=7
    }
    public enum EnumGold
    {
        上传作品 = 1,
        评论 = 2,
        结伴成功 = 3,
        邀请好友成功 = 4,
        为别人点赞 = 5,
        获取点赞 = 6,
        积分初始化 = 7
    }
    /// <summary>
    /// 
    /// </summary>
    public enum EnumAwardType
    { 
        积分=1,
        金币=2
    }
    /// <summary>
    /// 计算方式
    /// </summary>
    public enum EnumComputeMode
    { 
        按天计算=1,
        按次数计算=2
    }
}