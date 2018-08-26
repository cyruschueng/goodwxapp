using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SfSoft.web.Read.Models.Award;
using SfSoft.web.Read.Enums;

namespace SfSoft.web.QA.Award
{
    public class AwardHelp
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="integralType"></param>
        /// <returns></returns>
        public static AwardModel GetIntegral(EnumIntegral integralType)
        {
            AwardModel model = new AwardModel();
            switch (integralType) { 
                case EnumIntegral.获取点赞:
                    model.Max = 20;
                    model.Min = 2;
                    break;
                case EnumIntegral.积分初始化:
                   model.Max = 0;
                    model.Min = 0;
                    break;
                case EnumIntegral.结伴成功:
                    model.Max = 50;
                    model.Min = 5;
                    break;
                case EnumIntegral.评论:
                    model.Max = 30;
                    model.Min = 3;
                    break;
                case EnumIntegral.上传作品:
                    model.Max = 50;
                    model.Min = 10;
                    break;
                case EnumIntegral.为别人点赞:
                    model.Max = 20;
                    model.Min = 2;
                    break;
                case EnumIntegral.邀请好友成功:
                    model.Max = 5000000;
                    model.Min = 50;
                    break;
                default:
                    model.Max = 0;
                    model.Min = 0;
                    break;
            }
            return model;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="goldType"></param>
        /// <returns></returns>
        public static AwardModel GetGold(EnumGold goldType)
        {
            AwardModel model = new AwardModel();
            switch (goldType) { 
                case EnumGold.获取点赞:
                    model.Max = 5;
                    model.Min = 1;
                    break;
                case EnumGold.积分初始化:
                    model.Max = 0;
                    model.Min = 0;
                    break;
                case EnumGold.结伴成功:
                    model.Max = 10;
                    model.Min = 2;
                    break;
                case EnumGold.评论:
                    model.Max = 5;
                    model.Min = 1;
                    break;
                case EnumGold.上传作品:
                    model.Max = 10;
                    model.Min = 3;
                    break;
                case EnumGold.为别人点赞:
                    model.Max = 5;
                    model.Min = 1;
                    break;
                case EnumGold.邀请好友成功:
                    model.Max = 1000000;
                    model.Min = 1000;
                    break;
                default:
                    model.Max = 0;
                    model.Min = 0;
                    break;
            }
            return model;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="diamondType"></param>
        /// <returns></returns>
        public static AwardModel GetDiamond(EnumDiamond diamondType)
        {
            AwardModel model = new AwardModel();
            switch (diamondType) { 
                case EnumDiamond.邀请好友成功:
                    model.Max=10000000;
                    model.Min = 1;
                    break;
            }
            return model;
        }
    }
}