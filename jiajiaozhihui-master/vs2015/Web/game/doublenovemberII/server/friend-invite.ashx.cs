using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SfSoft.Common.DEncrypt;
using ShenerWeiXin;
using SfSoft.Common;
using System.Text;
using System.Data;
using SfSoft.SfEmc;
using ShenerWeiXin.Share;
namespace SfSoft.web.game.doublenovemberII.server
{
    /// <summary>
    /// friend_invite 的摘要说明
    /// </summary>
    public class friend_invite : IHttpHandler
    {

        const int APP_ID = 10010590;
        const string SECRET_ID = "AKID9cADvko08CVsbnncZMa8IFh27J2U7elh";
        const string SECRET_KEY = "WkdGcUZzqNsoJRskEAccjsaaVcMcehQh";
        const string BUCKET_NAME = "doublenove";
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string result = "";
            string method = context.Request["method"].ToString();
            switch (method)
            {
                case "get":
                    result = GetData(context);
                    break;
                case "submit":
                    result = Submit(context);
                    break;
            }
            context.Response.Write(result);
        }
        private string GetData(HttpContext context)
        {
            string result = "{}";
            try
            {
                string openid = context.Request["openid"].ToString().ConvertBase64TocChars();//点赞的人，是经加密码的
                openid = DEncrypt.Decrypt(openid, WXConfig.EncryptKey);
                int pageindex = int.Parse(context.Request["pageindex"].ToString());
                int pagesize = int.Parse(context.Request["pagesize"].ToString());
                string orderby = context.Request["orderby"].ToString();
                StringBuilder sb = new StringBuilder();
                sb.Append("select top " + pagesize + " *  from (")
                    .Append(" select row_number() over(order by " + orderby + ") as RowRank, ")
                    .Append(" case  when exists(select top 1 * from WX_Doublenovember_Like where From_OpenID='" + openid + "' and FileID=a.ID) then 1")
                    .Append(" else 0 end as LikeState,")
                    .Append(" a.*,b.NickName,b.HeadimgUrl,c.city as CityName,datediff(dd,e.FirstWorksDateTime,a.Create_date)+1 as AwayDay,")
                    .Append(" e.Sex,(year(getdate())-e.[Year]) as AwayYear ,f.MainWords,f.IsAct as UnscrambleAct,g.Grade,g.GradeName ")
                    .Append(" from (select * from  dbo.WX_Doublenovember_File where isnull(IsAct,1) <> 0) a ")
                    .Append(" left join dbo.WX_HomeCard b on a.openid=b.openid")
                    .Append(" left join WX_UserLocation c on a.openid=c.openid")
                    .Append(" left join WX_Doublenovember_Children e on a.openid=e.openid ")
                    .Append(" left join dbo.WX_Doublenovember_File_unscramble f on a.BookName=f.BookName and a.PageNumber=f.PageIndex")
                    .Append(" left join vw_VX_Doublenovember_Grade g on a.openid=g.openid ")
                    .Append(" where  a.OpenID='" + openid + "'")
                    .Append(" )a where RowRank between  " + ((pageindex - 1) * pagesize + 1) + " and " + pageindex * pagesize)
                    .Append(" order by RowRank");

                DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sb.ToString());
                if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                {
                    result = FormatToJson.ToJson(ds);
                    string s = GetComment(ds);
                    result = result.Insert(result.Length - 1, ",\"comment\":" + s);
                }
                return result;
            }
            catch (Exception ex)
            {
                WXHelper.WriteNode("1game.doublenovember.server.info.ashx(openid:" + context.Request["openid"].ToString() + ")" + ex.Message);
                return result;
            }
        }
        /// <summary>
        /// 获取评论
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private string GetComment(DataSet data)
        {
            string ids = "";
            string result = "{}";
            foreach (DataRow dr in data.Tables[0].Rows)
            {
                ids += dr["ID"].ToString() + ",";
            }
            if (ids.Length != 0)
            {
                ids = ids.Substring(0, ids.Length - 1);

                BLL.WX_Doublenovember_Comment bll = new BLL.WX_Doublenovember_Comment();
                StringBuilder sb = new StringBuilder();
                sb.Append(" select a.*,b.NickName,b.HeadimgUrl from ");
                sb.Append("(select * from dbo.WX_Doublenovember_Comment where FileID in(" + ids + ")) a");
                sb.Append(" left join dbo.WX_HomeCard b on a.openid=b.openid");
                DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sb.ToString());
                if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                {
                    result = FormatToJson.ToJson(ds);
                }
            }
            return result;
        }
        private string Submit(HttpContext context)
        {
            string result = "{}";

            string openid = "";
            if (context.Request["openid"] != null)
            {
                openid = context.Request["openid"].ToString().ConvertBase64TocChars();
                openid = DEncrypt.Decrypt(openid, WXConfig.EncryptKey);
            }
            string goodsid = "";
            if (context.Request["goodsid"] != null)
            {
                goodsid = context.Request["goodsid"].ToString();
            }
            string name = "";
            if (context.Request["name"] != null)
            {
                name = context.Request["name"].ToString();
            }
            string address = "";
            if (context.Request["address"] != null)
            {
                address = context.Request["address"].ToString();
            }
            string telephone = "";
            if (context.Request["phone"] != null)
            {
                telephone = context.Request["phone"].ToString();
            }
            string province = "";
            if (context.Request["province"] != null)
            {
                province = context.Request["province"].ToString();
            }
            string city = "";
            if (context.Request["city"] != null)
            {
                city = context.Request["city"].ToString();
            }
            string remark = "";
            if (context.Request["remark"] != null)
            {
                remark = context.Request["remark"].ToString();
            }
            string mode = "";
            if (context.Request["mode"] != null)
            {
                mode = context.Request["mode"].ToString();
            }
            string friendid = "";
            if (context.Request["friendid"] != null)
            {
                friendid = context.Request["friendid"].ToString();
                friendid = DEncrypt.Decrypt(friendid, WXConfig.EncryptKey);
            }
            string number = "1";
            if (context.Request["txtNumber"] != null)
            {
                number = context.Request["txtNumber"].ToString();
            }
            string price = "0";
            if (context.Request["txtPrice"] != null)
            {
                price = context.Request["txtPrice"].ToString();
            }
            string share = "false";
            if (context.Request["share"] != null) {
                share = context.Request["share"].ToString();
            }
            int orderID = 0;
            Model.WX_PublicOrder model = new Model.WX_PublicOrder();
            BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
            //if (bll.Exists(telephone, goodsid))
            //{
            //    return "{\"code\":\"0\",\"msg\":\"已订购\"}"; //已订购
            //}
            if (UnDoOrder(telephone, goodsid) == true)
            {
                return "{\"code\":\"0\",\"msg\":\"已订购\"}"; //已订购
            }
            ShareContent shareContent = new ShareContent();
            try
            {
                model = shareContent.SetGoodsOrderModel(openid, goodsid, name, address, telephone, province, city, "11", number, price, remark);
                orderID = bll.Add(model);
                //如果是分享模式，则主动添加对放为好友
                if (share == "true") {
                    string sql = "select * from dbo.WX_Doublenovember_Invite where (FromOpenID='" + friendid + "' and ToOpenID='" + openid + "') or (FromOpenID='" + openid + "' and ToOpenID='" + friendid + "')";
                    DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sql);
                    if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                    {

                    }
                    else {
                        BLL.WX_Doublenovember_Invite inviteBll = new BLL.WX_Doublenovember_Invite();
                        Model.WX_Doublenovember_Invite inviteModel = new Model.WX_Doublenovember_Invite();
                        inviteModel = new Model.WX_Doublenovember_Invite();
                        inviteModel.Content = "来自分享";
                        inviteModel.FromOpenID = openid;
                        inviteModel.IsRead = 0;
                        inviteModel.SendDate = DateTime.Now;
                        inviteModel.Status = 1;
                        inviteModel.ToOpenID = friendid;
                        inviteBll.Add(inviteModel);

                        #region 邀请好友成功获取积分与金币
                        AwardItem award = new AwardItem(openid);
                        award.AwardByInvite();
                        #endregion
                    }
                }
            }
            catch (Exception ex)
            {
                WXHelper.WriteNode("game.doublenovember.server.order.ashx(" + openid + ")" + ex.Message);
                return "{\"code\":\"2\",\"msg\":\"订购失败\"}";
            }

            return "{\"code\":\"1\",\"msg\":\"订购完成\",\"orderid\":\"" + orderID.ToString() + "\"}";
        }
        /// <summary>
        /// 是否存在未处理的订单
        /// 只针对货到付款判断
        /// </summary>
        /// <returns></returns>
        private bool UnDoOrder(string telephone, string goodsid)
        {
            string sql = "select * from WX_PublicOrder where goodID=" + goodsid + " and telephone='" + telephone + "' and isnull(Paymode,0)=0 and isnull(issend,0)=0";
            return SfSoft.DBUtility.DbHelperSQL.Exists(sql);
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}