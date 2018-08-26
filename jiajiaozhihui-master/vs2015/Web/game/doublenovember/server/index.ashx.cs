using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using System.Data;
using SfSoft.Common.DEncrypt;
using ShenerWeiXin;
using SfSoft.SfEmc;
using SfSoft.Common;

namespace SfSoft.web.game.doublenovember.server
{
    /// <summary>
    /// index 的摘要说明
    /// </summary>
    public class index : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string result = "";
            string method=context.Request["method"].ToString();
            switch (method) { 
                case "data":
                    result = GetData(context);
                    break;
                case "like":
                    result = Like(context);
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
                int pageindex =int.Parse(context.Request["pageindex"].ToString());
                int pagesize=int.Parse(context.Request["pagesize"].ToString());
                string orderby = context.Request["orderby"].ToString();
                StringBuilder sb = new StringBuilder();
                sb.Append("select top " + pagesize + " *  from (")
                    .Append(" select row_number() over(order by " + orderby + ") as RowRank, ")
                    .Append(" case  when exists(select top 1 * from WX_Doublenovember_Like where From_OpenID='" + openid + "' and FileID=a.ID) then 1")
                    .Append(" else 0 end as LikeState,")
                    .Append(" a.*,b.NickName,b.HeadimgUrl,b.City from dbo.WX_Doublenovember_File a")
                    .Append(" left join dbo.WX_HomeCard b on a.openid=b.openid")
                    .Append(" )a where RowRank between  " + ((pageindex - 1) * pagesize + 1) + " and " + pageindex * pagesize)
                    .Append(" order by RowRank");
            
                DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sb.ToString());
                if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                {
                    result = FormatToJson.ToJson(ds);
                }
                return result;
            }
            catch (Exception ex) {
                WXHelper.WriteNode("game.doublenovember.server.index.ashx(openid1" + context.Request["openid"].ToString()+ ")" + ex.Message);
                return result;
            }
        }
        //点赞
        private string  Like(HttpContext context)
        {
            string result = "{}";
            //作品
            string id = context.Request["id"].ToString();
            string openid = context.Request["openid"].ToString().ConvertBase64TocChars();//点赞的人，是经加密码的
            //解密openid,如果解密失败，将视为非法数据
            try
            {
                BLL.WX_Doublenovember_File bllFile = new BLL.WX_Doublenovember_File();
                Model.WX_Doublenovember_File modelFile = bllFile.GetModel(int.Parse(id));
                if (modelFile != null)
                {
                    openid = DEncrypt.Decrypt(openid, WXConfig.EncryptKey);
                    //是否已点赞
                    BLL.WX_Doublenovember_Like bll = new BLL.WX_Doublenovember_Like();
                    DataSet ds = bll.GetList("FileID=" + id + " and From_OpenID='" + openid + "'");
                    if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                    {

                    }
                    else
                    {
                        Model.WX_Doublenovember_Like model = new Model.WX_Doublenovember_Like();
                        model.Create_Date = DateTime.Now;
                        model.FileID = int.Parse(id);
                        model.From_OpenID = openid;
                        model.To_OpenID = modelFile.OpenID;
                        bll.Add(model);
                        int like=0;
                        if(modelFile.Like_Number!=null){
                            like=(int)modelFile.Like_Number+1;
                        }else{
                            like=1;
                        }
                        modelFile.Like_Number = like;
                        bllFile.Update(modelFile);
                        result = "{\"code\":0,\"msg\":\"ok\",\"like\":"+like+"}";
                    }
                }
            }
            catch (Exception ex) {
                WXHelper.WriteNode("game.doublenovember.server.index.ashx(openid"+openid+")" +ex.Message);
                result = "{\"code\":1,\"msg\":\"error\"}";
            }
            return result;
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