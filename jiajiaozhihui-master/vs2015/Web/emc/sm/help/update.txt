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
namespace SfSoft.web.emc.sm.help
{
    public partial class update : System.Web.UI.Page
    {
        Model.Pub_Help modelh = new SfSoft.Model.Pub_Help();
        BLL.Pub_Help bllh = new SfSoft.BLL.Pub_Help();
        protected void Page_Load(object sender, EventArgs e)

        {
            if (!IsPostBack)
            {
                string state = Request.Params["state"].ToString();
                string HelpID = Request.Params["HelpID"].ToString();
                hfID.Value = HelpID;
                modelh = bllh.GetModel(hfID.Value);
                if (modelh == null)
                {
                    hfMode.Value = "add";
                    if (HelpID.Substring(0, 4) == "help")
                    {
                        lblFunName.Text = GetHelpModulesName(hfID.Value);
                    }
                    else
                    {
                        lblFunName.Text = EmcCommon.GetModulesName(hfID.Value);
                    }

                }
                else
                {
                    hfMode.Value = "update";
                }


                //修改
                if (hfMode.Value == "update")
                {
                    this.ShowInfo(modelh);
                }
            }
        }

        private void ShowInfo(Model.Pub_Help moel)
        {
            lblFunName.Text = modelh.ModulesName;
            fckAppInfo.Value = modelh.AppInfo;
            fckCaseInfo.Value = modelh.CaseInfo;
            fckContent.Value = modelh.Content;
            fckFlowInfo.Value = modelh.FlowInfo;
            fckOthers.Value = modelh.Others;
            txtNoteInfo.Text = modelh.NoteInfo;
        }

        protected void btnSave_Click(object sender, EventArgs e)
        {
            if (hfMode.Value == "add")
            {
                modelh = new SfSoft.Model.Pub_Help();
                modelh.ModulesID = hfID.Value;
                modelh.ModulesName = lblFunName.Text;
                modelh.AppInfo = fckAppInfo.Value;
                modelh.CaseInfo = fckCaseInfo.Value;
                modelh.Content = fckContent.Value;
                modelh.FlowInfo = fckFlowInfo.Value;
                modelh.NoteInfo = txtNoteInfo.Text;
                modelh.Others = fckOthers.Value;
                bllh.Add(modelh);
                

            }
            else
            {
                modelh = bllh.GetModel(hfID.Value);
                modelh.ModulesID = hfID.Value;
                modelh.ModulesName = lblFunName.Text;
                modelh.AppInfo = fckAppInfo.Value;
                modelh.CaseInfo = fckCaseInfo.Value;
                modelh.Content = fckContent.Value;
                modelh.FlowInfo = fckFlowInfo.Value;
                modelh.NoteInfo = txtNoteInfo.Text;
                modelh.Others = fckOthers.Value;
                bllh.Update(modelh);
            }
            lblMsg.Text = "保存成功!";
        }

        private string GetHelpModulesName(string mid)
        {
            string ModulesName = "";
            string strSql = " select * from Emc_HelpItem where FunID='" + mid+"'";
            DataSet ds = DbHelperSQL.Query(strSql);
            if (ds.Tables[0].Rows.Count > 0)
            {
                ModulesName = ds.Tables[0].Rows[0]["FunName"].ToString();
            }
            return ModulesName;
        }
    }
}


