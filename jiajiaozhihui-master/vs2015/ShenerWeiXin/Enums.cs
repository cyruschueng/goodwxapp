using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ShenerWeiXin
{
    public enum  TakeScoreItem
    {
        注册成为会员,
        完善会员资料,
        邀请好友成为会员,
        每日签到,
        家教帮提问,
        家教帮提问回答,
        家教帮提问回答被采纳,
        慧玩儿发布,
        慧玩儿被采用,
        慧玩儿评论,
        慧玩儿分享朋友圈被点击,
        慧课堂报名,
        慧课堂答签到,
        慧课堂分享分享朋友圈被点击,
        慧课堂邀请好友参加成功,
        公益品购买,
        公益品分享朋友圈点击,
        公益品邀请好友购买,
        幸运购购买,
        幸运购分享朋友圈点击,
        慧游戏,
        慧游戏分享朋友圈点击,
        悦享达人活动获奖,
        周末秀活动获奖
    }
    /// <summary>
    /// 放弃使用
    /// </summary>
    public enum ExpenseScoreItem
    {
        积分兑换礼品,
        积分换购礼品,
        积分赠送
    }
    /// <summary>
    /// 活动名
    /// </summary>
    public enum ItemObject
    { 
        亲子书法=1,
        国学达人=2,
        微课堂=3,
        小猴子=4,
        通用=99
    }
    /// <summary>
    /// 兑换类型
    /// </summary>
    public enum EnumExchange
    { 
        积份=0,
        金币=1,
        等级=2,
        钻石=3
    }
    #region EnumExchangeOrderType 与 EnumOrderType 的值不能重复
    /// <summary>
    /// 兑换订单类型 
    /// </summary>
    public enum EnumExchangeOrderType
    { 
        亲子书法兑换订单=10
    }
    /// <summary>
    /// 一般订单类型
    /// </summary>
    public enum EnumOrderType
    { 
        亲子书法订单=11,
        小猴子=12,
    }
    #endregion

    /// <summary>
    /// 活动规则说明
    /// </summary>
    public enum EnumItemHelp
    {
        亲子书法兑换规则=1
    }
}
