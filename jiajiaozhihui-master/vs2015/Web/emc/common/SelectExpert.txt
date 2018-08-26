using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Text;

namespace SfSoft.web.emc.common
{
    public partial class SelectExpert : SfSoft.SfEmc.EmcBasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Request.Params["ObjID"] != null)
                {
                    hfObjID.Value = Request.Params["ObjID"].ToString();
                }
                if (Request.Params["ObjhfID"] != null)
                {
                    hfObjhfID.Value = Request.Params["ObjhfID"].ToString();
                }
                if (Request.Params["Flag"] != null)
                {
                    hfFlag.Value = Request.Params["Flag"].ToString();
                }
                if (Request.Params["ObjhfOpenID"] != null)
                {
                    hfOpenID.Value = Request.Params["ObjhfOpenID"].ToString();
                }
                this.ShowUsers();
            }
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        protected override void VtInitOthersToolbars()
        {
            //Button tsbtnSelect = new Button();
            //tsbtnSelect.ID = "tsbtnSelect";
            //tsbtnSelect.Text = "确定";
            //tsbtnSelect.Attributes.Add("onmouseout", "this.className='btn'");
            //tsbtnSelect.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            //tsbtnSelect.CssClass = "btn";
            //tsbtnSelect.OnClientClick = "SelectMember();return false;";
            //phToolBars.Controls.Add(tsbtnSelect);
        }
        private void ShowUsers()
        {
            /*
            string sql = "select * from (" +
                " select a.Id,a.UName, a.NickName, a.OpenId,a.IsAct,a.IsRest,Isnull(b.Sn,9999) as Sn,b.LikeNumber,b.InitLikeNumber,b.IsDefault,b.IsSystem from dbo.WX_JJZH_Expert a " +
                " left join WX_QA_Expert b on a.Id=b.ExpertId" +
                " )a where IsAct=1 and IsRest=0  order by Sn,Id desc";
            */
            BLL.WX_JJZH_Expert bll = new BLL.WX_JJZH_Expert();
            DataSet ds = bll.GetList("IsAct=1 and IsCheck=1");

            StringBuilder strHtml = new StringBuilder();
            
            strHtml.Append("<table border='0' cellpadding='1' cellspacing='0' width='96%' class='fromtable1'>");
            strHtml.Append("<tr>");
            strHtml.Append("<td style='width: 20px'  height='22' class='tablehead'></td>");
            strHtml.Append("<td style='width: 120px'  height='22' class='tablehead'>专家姓名</td>");
            strHtml.Append("<td style='width: 120px' height='22' class='tablehead'>专家昵称</td>");
            strHtml.Append("<td style='width: 80px' height='22' class='tablehead'>系统专家</td>");
            strHtml.Append("<td style='width: 340px' height='22' class='tablehead'>默认专家</td>");
            strHtml.Append("</tr>");
            foreach (DataRow dr in ds.Tables[0].Rows) {
                strHtml.Append("<tr>");
                strHtml.Append("<td style='width: 20px'  height='22' class='tablehead'>");
                strHtml.Append(" <input id='ckU" + dr.Field<int>("Id") + "'  OnClick=SelectData('ckU" + dr.Field<int>("Id") + "','U@" + dr.Field<int>("Id") + "@" + dr.Field<string>("OpenId") + "','" + dr.Field<string>("UName") + "')  value='" + dr.Field<int>("Id") + "-" + dr.Field<string>("UName") + "' type='checkbox'/>");
                strHtml.Append("</td>");
                strHtml.Append("<td style='width: 120px'  class='formlbl'>&nbsp;" + dr.Field<string>("UName")  + "</td>");
                strHtml.Append("<td style='width: 120px' class='formlbl'>&nbsp;" + dr.Field<string>("NickName") + "</td>");
                string expertTypeName = ExpertTypeName(dr.Field<int?>("ExpertType").Value);
                strHtml.Append("<td style='width: 80px' class='formlbl'>&nbsp;" + expertTypeName + "</td>");
                string defaultName=(dr.Field<int?>("IsDefault")??0)==0?"":"是";
                strHtml.Append("<td style='width: 340px' class='formlbl'>&nbsp;" + defaultName + "</td>");
                strHtml.Append("</tr>");
            }
            strHtml.Append("</table>");
            UserlistDiv.InnerHtml = strHtml.ToString();
        }
        private string ExpertTypeName(int expertType)
        {
            string result = "";
            if (expertType == 1) {
                result = "系统专家";
            } if (expertType == 2)
            {
                result = "普通专家";
            }
            return result;
        }
        protected void btnSearch_Click(object sender, EventArgs e)
        {
            ShowUsers();
        }
    }
}

