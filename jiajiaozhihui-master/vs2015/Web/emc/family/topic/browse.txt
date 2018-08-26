using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using SfSoft.Common;
using SfSoft.SfEmc;
using System.Text;
namespace SfSoft.web.emc.family.topic
{
    public partial class browse : SfSoft.SfEmc.EmcBrowseBasePage
    {
        public string ListItem = "";
        public string NickName = "斧头";
        public string OpenID = "oiU-1t34NjrJz2zavfa_GmO9RN6M";
        public string HeaderImgUrl = "http://wx.qlogo.cn/mmopen/Sqqm3oJYw2h5lg6odAzcjxruicLvD0SpickSSOH0WW0znge12BXTOfjcicD6QKgTZYUuyhInm4XGicbjzDr8erAxCtmfcn866ibibb/0";
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                hfNickName.Value = NickName;
                hfOpenid.Value = OpenID;
                hfHeaderImgUrl.Value = HeaderImgUrl;
                ShowData();
                
            }
        }
        
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.family.topic";
        }
        #region 初始化工具栏
        protected override void VtInitToolbars()
        {
            NewTsbtnNew();
            phToolBars.Controls.Add(tsbtnNew);
            NewTsbtnDelete();
            phToolBars.Controls.Add(tsbtnDelete);
        }

        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseListToolsBars();
        }
        #endregion
        private void ShowData()
        {
            StringBuilder sb = new StringBuilder();
            SfSoft.BLL.WX_Topic bll = new BLL.WX_Topic();
            DataSet ds = bll.GetList(0, "Isact=1 ", "isnull(IsTop,1) asc,ID desc");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                WeiXinCommunity.common common = new WeiXinCommunity.common();
                foreach(DataRow dr in ds.Tables[0].Rows){
                    sb.Append("<li>");
                    sb.Append("<div class='editBtn fl'>");
                    sb.Append("<input   type='checkbox'>");
                    sb.Append("<a href='javascript:;' title='' class='delBtn db spr ht'>删除话题</a>");
                    sb.Append("</div>");
                    sb.Append("<div class='topicCon fr pr'>");
                    sb.Append("<a href='javascript:;' class='avatar'><img src='"+HeaderImgUrl+"' class='personImg pa' alt='头像' height='40' width='40'></a>");
                    sb.Append("<a href='#' class='letterBtn2 db pa'>私信</a>");
                    sb.Append("<p class='titDate'> <span class='db fl author' uid='145544033' gid='0'><strong>" + dr["Titel"].ToString() + "</strong></span> <span style='float:right;' class='db f12 fr'><em>" + common.TimeInterval(DateTime.Parse(dr["CreateDate"].ToString())) + "</em></span> </p>");
                    sb.Append("<p class='htmlEdit'>" + dr["Details"].ToString() + "</p>");
                    //sb.Append("<p class='replyComment cl'> <span class='db fl pr'>  <a href='#' threadtype='0' class='mrm fullText' >全文</a> <a href='javascript:;' title='0' class='mrm newReply' onclick=\"comment(" + dr["ID"].ToString() + ",\'" + OpenID + "\',\'" + NickName + "\',\'" + HeaderImgUrl + "\' )\" >回复</a> <a href='javascript:;' title='0' class='mrm cleanUserPost'   author='家教智慧'>清理</a> <a class='tags on' href='javascript:;' title=''>无标签<i class='arrowup dib spr mprevise'></i></a> <a class='replynum' href='javascript:;' title='' ><i class='bubble dib spr mprevise'></i>0</a> <a class='zannum' href='javascript:;' title=''><i class='thumb dib spr mprevise'></i>0</a></span> <span style='display: none;' class='db fr threadOp'>   <a href='javascript:;' title='' class='recommend' >推荐话题</a> <span class='pipe'>|</span>  <a href='javascript:;' title='' class='editThread' >编辑</a> <span class='pipe'>|</span> <a href='javascript:;' btntype='closeUpdate' >锁定</a>     <span class='pipe'>|</span>   <a href='javascript:;' isstick='1' title='' class='canelBtn stick' >取消置顶</a>   </span> </p>");
                    sb.Append("<p class='replyComment cl'> <span class='db fl pr'>  <a href='#' threadtype='0' class='mrm fullText' >全文</a> <a href='javascript:;' title='0' class='mrm newReply' onclick='showReplay("+dr["ID"].ToString()+")'>回复</a> <a href='javascript:;' title='0' class='mrm cleanUserPost'   author='家教智慧'>清理</a> <a class='tags on' href='javascript:;' title=''>无标签<i class='arrowup dib spr mprevise'></i></a> <a class='replynum' href='javascript:;' title='' ><i class='bubble dib spr mprevise'></i>0</a> <a class='zannum' href='javascript:;' title=''><i class='thumb dib spr mprevise'></i>0</a></span> <span style='display: none;' class='db fr threadOp'>   <a href='javascript:;' title='' class='recommend' >推荐话题</a> <span class='pipe'>|</span>  <a href='javascript:;' title='' class='editThread' >编辑</a> <span class='pipe'>|</span> <a href='javascript:;' btntype='closeUpdate' >锁定</a>     <span class='pipe'>|</span>   <a href='javascript:;' isstick='1' title='' class='canelBtn stick' >取消置顶</a>   </span> </p>");
                    sb.Append("</div>");
                    sb.Append("</li>");
                }
                ListItem = sb.ToString();
            }
        }
    }
}


