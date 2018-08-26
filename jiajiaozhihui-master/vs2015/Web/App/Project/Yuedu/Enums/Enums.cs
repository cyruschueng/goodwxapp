using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SfSoft.web.Yuedu.Enums
{
    public enum EnumIntegral
    {
        上传作品 = 1,
        评论 = 2,
        结伴成功 = 3,
        邀请好友成功 = 4,
        为别人点赞 = 5,
        获取点赞 = 6,
        积分初始化 = 7,
        积分兑换物品 = 8,
        分享=9
    }
    public enum EnumGold
    {
        上传作品 = 1,
        评论 = 2,
        结伴成功 = 3,
        邀请好友成功 = 4,
        为别人点赞 = 5,
        获取点赞 = 6,
        积分初始化 = 7,
        金币兑换物品 = 8,
        分享=9
    }
    public enum EnumDiamond
    {
        邀请好友成功 = 1,
        钻石兑换物品 = 2
    }
    /// <summary>
    /// 
    /// </summary>
    public enum EnumAwardType
    {
        积分 = 1,
        金币 = 2,
        钻石 = 3
    }
    /// <summary>
    /// 计算方式
    /// </summary>
    public enum EnumComputeMode
    {
        按天计算 = 1,
        按次数计算 = 2
    }
    public enum EnumResultCode
    {
        订购成功 = 0,
        订购失败 = 1,
        未知 = 3,
        订购失败金币不足 = 4,
        订购失败钻石不足 = 5,
        库存不足 = 6
    }
}