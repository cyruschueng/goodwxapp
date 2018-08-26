using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SfSoft.web.Read.Enums;

namespace SfSoft.web.QA.Award
{
    public class AwardItem
    {
        private string _openid = string.Empty;
        public AwardItem(string openid)
        {
            this._openid = openid;
        }
        /// <summary>
        /// 上传作品时积分与金币
        /// </summary>
        public void AwardByUploadPortfolios()
        {
            Gold gold = new Gold(_openid, EnumGold.上传作品, EnumComputeMode.按天计算);
            gold.RunUpdateAward();
            Integral integral = new Integral(_openid, EnumIntegral.上传作品, EnumComputeMode.按天计算);
            integral.RunUpdateAward();
        }
        /// <summary>
        /// 评化时的积分与金币
        /// </summary>
        public void AwardByComment()
        {
            Gold gold = new Gold(_openid, EnumGold.评论, EnumComputeMode.按天计算);
            gold.RunUpdateAward();
            Integral integral = new Integral(_openid, EnumIntegral.评论, EnumComputeMode.按天计算);
            integral.RunUpdateAward();
        }
        /// <summary>
        /// 结伴成功的积分与金币
        /// </summary>
        public void AwardByCompany()
        {
            Gold gold = new Gold(_openid, EnumGold.结伴成功, EnumComputeMode.按次数计算);
            gold.RunUpdateAward();
            Integral integral = new Integral(_openid, EnumIntegral.结伴成功, EnumComputeMode.按次数计算);
            integral.RunUpdateAward();
        }
        /// <summary>
        /// 邀请好友成功的积分与金币
        /// </summary>
        public void AwardByInvite()
        {
            Gold gold = new Gold(_openid, EnumGold.邀请好友成功, EnumComputeMode.按次数计算);
            gold.RunUpdateAward();
            Integral integral = new Integral(_openid, EnumIntegral.邀请好友成功, EnumComputeMode.按次数计算);
            integral.RunUpdateAward();
            Diamond diamond = new Diamond(_openid, EnumDiamond.邀请好友成功, EnumComputeMode.按次数计算);
            diamond.RunUpdateAward();
        }
        /// <summary>
        /// 为别人点赞的积分与金币
        /// </summary>
        public void AwardByLikeOther()
        {
            Gold gold = new Gold(_openid, EnumGold.为别人点赞, EnumComputeMode.按天计算);
            gold.RunUpdateAward();
            Integral integral = new Integral(_openid, EnumIntegral.为别人点赞, EnumComputeMode.按天计算);
            integral.RunUpdateAward();
        }
        /// <summary>
        /// 获取点赞的积分与金币
        /// </summary>
        public void AwardByLike()
        {
            Gold gold = new Gold(_openid, EnumGold.获取点赞, EnumComputeMode.按天计算);
            gold.RunUpdateAward();
            Integral integral = new Integral(_openid, EnumIntegral.获取点赞, EnumComputeMode.按天计算);
            integral.RunUpdateAward();
        }
    }
}