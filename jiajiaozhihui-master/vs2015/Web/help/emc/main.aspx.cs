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
using SfSoft.DBUtility;
namespace SfSoft.web.help.emc
{
    public partial class main : System.Web.UI.Page
    {
        Model.Pub_Help modelh = new SfSoft.Model.Pub_Help();
        BLL.Pub_Help bllh = new SfSoft.BLL.Pub_Help();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
              
                string HelpID = Request.Params["HelpID"].ToString();
                tbCaseInfo.Visible = false;
                tbContent.Visible = false;
                tbFlowInfo.Visible = false;
                tbNoteInfo.Visible = false;
                tbOthers.Visible = false;
                modelh = bllh.GetModel(HelpID);
                if (modelh == null)
                {


                    if (HelpID.Substring(0, 4) == "help")
                    {
                        DivFunName.InnerHtml = GetHelpModulesName(HelpID);
                    }
                    else
                    {
                        DivFunName.InnerHtml = EmcCommon.GetModulesName(HelpID);
                    }

                }
                else
                {

                   this.ShowInfo(modelh);
                }
                
            }
        }
        private void ShowInfo(Model.Pub_Help moel)
        {
           
            DivFunName.InnerHtml = modelh.ModulesName;
 
            DivAppInfo.InnerHtml = modelh.AppInfo;

            if (modelh.CaseInfo != null && modelh.CaseInfo != "")
            {
                tbCaseInfo.Visible = true;
                DivCaseInfo.InnerHtml = modelh.CaseInfo;
            }
            if (modelh.Content != null && modelh.Content != "")
            {
                tbContent.Visible = true;
                DivContent.InnerHtml = modelh.Content;
            }
            if (modelh.FlowInfo != null && modelh.FlowInfo != "")
            {
                tbFlowInfo.Visible = true;
                DivFlowInfo.InnerHtml = modelh.FlowInfo;
            }
            if (modelh.Others != null && modelh.Others != "")
            {
                tbOthers.Visible = true;
                DivOthers.InnerHtml = modelh.Others;
            }
            if (modelh.NoteInfo != null && modelh.NoteInfo != "")
            {
                tbNoteInfo.Visible = true;
                DivNoteInfo.InnerHtml = modelh.NoteInfo;
            }
            
           
           
           
        }

        private string GetHelpModulesName(string mid)
        {
            string ModulesName = "";
            string strSql = " select * from Emc_HelpItem where FunID='" + mid + "'";
            DataSet ds = DbHelperSQL.Query(strSql);
            if (ds.Tables[0].Rows.Count > 0)
            {
                ModulesName = ds.Tables[0].Rows[0]["FunName"].ToString();
            }
            return ModulesName;
        }
    }
}

