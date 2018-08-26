using System;
using System.Data;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;

using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using ExtAspNet;
using SfSoft.Common;
using System.Collections.Generic;

namespace SfSoft.web.emc.common
{
    public class ApprovePageBase : System.Web.UI.Page
    {
      protected   Toolbar ToolbarScript = null;
      protected ToolbarSeparator tsbSave = null;
      protected Button tsbtnSave = null;
      protected ToolbarSeparator tbsSubmit = null;
      protected Button tsbtnSubmit = null;
      protected ToolbarSeparator tbsCancel = null;
      protected Button tsbtnCancel = null;
      protected ToolbarSeparator tbsSubCancel = null;
      protected Button tsbtnSubCancel = null;
      protected ToolbarSeparator tbsApprove = null;
      protected Button tsbtnApprove = null;
      protected ToolbarSeparator tbsAppRecord = null;
      protected Button tsbtnAppRecord = null;
      protected ToolbarSeparator tbsPrint = null;
      protected Button tsbtnPrint = null;
      protected ToolbarSeparator tbsFresh = null;
      protected Button tsbtnFresh = null;
      protected ToolbarSeparator tbsClose = null;
      protected Button tsbtnClose = null;

      protected Window ApproveWindows = null;
      protected Button btn_ApproveYes = null;
      protected Button btn_ApproveNo = null;

      protected HiddenField hfMode = new HiddenField();
      protected HiddenField hfMID = new HiddenField();
      protected HiddenField hfID = new HiddenField();
      protected HiddenField hfStatus = new HiddenField();

        protected void Page_Init(object sender, EventArgs e)
        {
            VtInitToolbars();// 初始化工具栏
            //初始化审批窗口
            VtInitApproveWindows();
        }
 
        /// <summary>
        /// 未postpack
        /// </summary>
        protected virtual void  VtPageLoadNotIsPostBack() 
        {
 
            if (Request.Params["ID"] != null)
            {
                hfID.Text = Request.Params["ID"].ToString();
            }
            if (Request.Params["mode"] != null)
            {
                hfMode.Text = Request.Params["mode"].ToString();
            }
        }

        protected virtual void VtPageLoadIsPostBack()
        {


        }
        protected virtual void VtPageLoad()
        {


        }

        /// <summary>
        ///  初始化工具栏
        /// </summary>
        protected virtual void VtInitToolbars()
        {
            //Toolbar ToolbarScript = FindControl("ToolbarScript") as Toolbar;
            ToolbarScript = FindControl(Page, typeof(ExtAspNet.Toolbar), "ToolbarScript") as Toolbar;
            tsbSave = new ToolbarSeparator();
            tsbSave.ID = "tbsSave";
            ToolbarScript.Items.Add(tsbSave);

            tsbtnSave = new Button();
            tsbtnSave.ID = "tsbtnSave";
            tsbtnSave.Enabled = false;
            tsbtnSave.Icon = Icon.SystemSaveNew;
            tsbtnSave.Text = "保存";
            tsbtnSave .Click += new EventHandler(tsbtnSave_Click);
            ToolbarScript.Items.Add(tsbtnSave);


            tbsSubmit = new ToolbarSeparator();
            tbsSubmit.ID = "tbsSubmit";
            ToolbarScript.Items.Add(tbsSubmit);

            tsbtnSubmit = new Button(); 
            tsbtnSubmit.ID = "tsbtnSubmit";
            tsbtnSubmit.Enabled = false;
            tsbtnSubmit.Icon = Icon.ApplicationOsxGet;
            tsbtnSubmit.Text = "提交";
            tsbtnSubmit.Click += new EventHandler(tsbtnSubmit_Click);
            ToolbarScript.Items.Add(tsbtnSubmit);

            tbsCancel = new ToolbarSeparator();
            tbsCancel.ID = "tbsCancel";
            ToolbarScript.Items.Add(tbsCancel);
            tsbtnCancel = new Button();
            tsbtnCancel.ID = "tsbtnCancel";
            tsbtnCancel.Enabled = false;
            tsbtnCancel.Icon = Icon.ApplicationOsxStop;
            tsbtnCancel.Text = "撤消";
            tsbtnCancel.Click += new EventHandler(tsbtnCancel_Click);
            ToolbarScript.Items.Add(tsbtnCancel);

            tbsSubCancel = new ToolbarSeparator();
            tbsSubCancel.ID = "tbsSubCancel";
            ToolbarScript.Items.Add(tbsSubCancel);
            tsbtnSubCancel = new Button();
            tsbtnSubCancel.ID = "tsbtnSubCancel";
            tsbtnSubCancel.Enabled = false;
            tsbtnSubCancel.Icon = Icon.BuildCancel;
            tsbtnSubCancel.Text = "申请撤消";
            tsbtnSubCancel.Click += new EventHandler(tsbtnSubCancel_Click);
            ToolbarScript.Items.Add(tsbtnSubCancel);

            tbsApprove = new ToolbarSeparator();
            tbsApprove.ID = "tbsApprove";
            ToolbarScript.Items.Add(tbsApprove);
            tsbtnApprove = new Button();
            tsbtnApprove.ID = "tsbtnApprove";
            tsbtnApprove.Enabled = false;
            tsbtnApprove.Icon = Icon.Accept;
            tsbtnApprove.Text = "审批";
            tsbtnApprove.Click += new EventHandler(tsbtnApprove_Click);
            ToolbarScript.Items.Add(tsbtnApprove);

            tbsAppRecord = new ToolbarSeparator();
            tbsAppRecord.ID = "tbsAppRecord";
            ToolbarScript.Items.Add(tbsAppRecord);
            tsbtnAppRecord = new Button();
            tsbtnAppRecord.ID = "tsbtnAppRecord";
            tsbtnAppRecord.Enabled = false;
            tsbtnAppRecord.Icon = Icon.ApplicationSideList;
            tsbtnAppRecord.Text = "审批记录";
            tsbtnAppRecord.Click += new EventHandler(tsbtnAppRecord_Click);
            ToolbarScript.Items.Add(tsbtnAppRecord);

            tbsPrint = new ToolbarSeparator();
            tbsPrint.ID = "tbsPrint";
            ToolbarScript.Items.Add(tbsPrint);
            tsbtnPrint = new Button();
            tsbtnPrint.ID = "tsbtnPrint";
            tsbtnPrint.Enabled = false;
            tsbtnPrint.Icon = Icon.ApplicationOsxGet;
            tsbtnPrint.Text = "打印";
            tsbtnPrint.Click += new EventHandler(tsbtnPrint_Click);
            ToolbarScript.Items.Add(tsbtnPrint);
            
            tbsFresh = new ToolbarSeparator(); 
            tbsFresh.ID = "tbsFresh";
            ToolbarScript.Items.Add(tbsFresh);
            tsbtnFresh = new Button();
            tsbtnFresh.ID = "tsbtnFresh";
            tsbtnFresh.Icon = Icon.PageRefresh;
            tsbtnFresh.Text = "刷新";
            tsbtnFresh.Click += new EventHandler(tsbtnFresh_Click);
            ToolbarScript.Items.Add(tsbtnFresh);


            tbsClose = new ToolbarSeparator();
            tbsClose.ID = "tbsClose";
            ToolbarScript.Items.Add(tbsClose);
            tsbtnClose = new Button();
            tsbtnClose.ID = "tsbtnClose";
            tsbtnClose.Icon = Icon.SystemClose;
            tsbtnClose.Text = "关闭";
            tsbtnClose.Click += new EventHandler(tsbtnClose_Click);
            ToolbarScript.Items.Add(tsbtnClose);

            ToolbarSeparator tbsEnd = new ToolbarSeparator();
            tbsEnd.ID = "tbsEnd";
            ToolbarScript.Items.Add(tbsEnd);
        }
        /// <summary>
        /// 初始化审批窗口
        /// </summary>
        protected virtual void VtInitApproveWindows()
        {
            ApproveWindows = FindControl(Page, typeof(ExtAspNet.Window), "ApproveWin") as Window;
         
            //生成审批工具栏
            Toolbar ToolbarApprove = new Toolbar();
            ToolbarApprove.ID = "ToolbarApprove";
            ToolbarSeparator tbsAppYes = new ToolbarSeparator();
            ToolbarApprove.Items.Add(tbsAppYes);//
            btn_ApproveYes = new Button();
            btn_ApproveYes.Text = "审批同意";
            btn_ApproveYes.Icon = Icon.Accept;
            btn_ApproveYes.ConfirmText = "确定审批同意？";
            btn_ApproveYes.Click +=new EventHandler(btn_ApproveYes_Click);
            ToolbarApprove.Items.Add(btn_ApproveYes);

         
            ToolbarSeparator tbsAppNo = new ToolbarSeparator();
            ToolbarApprove.Items.Add(tbsAppNo);//
            btn_ApproveNo = new Button();
            btn_ApproveNo.Text = "审批不同意";
            btn_ApproveNo.Icon = Icon.BulletCross;
            btn_ApproveNo.ConfirmText = "确定审批不同意？";
            btn_ApproveNo.Click += new EventHandler(btn_ApproveNo_Click);
            ToolbarApprove.Items.Add(btn_ApproveNo);
            ApproveWindows.Items.Add(ToolbarApprove);

            Form ApproveForm = new Form();
            ApproveForm.ID = "approveForm";
            ApproveForm.ShowHeader = false;
            FormRow formRow1 = new FormRow();
            formRow1.ID = "formRow1";
            Label lbl_AppUnDoFlag = new Label();
            lbl_AppUnDoFlag.ID = "lblAppUnDoFlag";
            formRow1.Items.Add(lbl_AppUnDoFlag);
            ApproveForm.Rows .Add(formRow1);

            FormRow formRow2 = new FormRow();
            formRow2.ID = "formRow2";
            TextArea txtContral = new TextArea();
            txtContral.ID = "txtContral";
            txtContral.Label = "审批意见";
            formRow2.Items.Add(txtContral);
            TextArea txtAuditorCmnt = new TextArea();
            txtAuditorCmnt.ID = "txtAuditorCmnt";
            txtAuditorCmnt.Label = "审批备注";
            formRow2.Items.Add(txtAuditorCmnt);
            ApproveForm.Rows.Add(formRow2);

            FormRow formRow3 = new FormRow();
            formRow3.ID = "formRow3";
            TextArea txtAuditName = new TextArea();
            txtAuditName.ID = "txtAuditName";
            txtAuditName.Label = "审批人签名";
            txtAuditName.Readonly = true;
            txtAuditName.Text = Session["CnName"].ToString();
            formRow3.Items.Add(txtAuditName);
            TextArea txtAuditdate = new TextArea();
            txtAuditdate.ID = "txtAuditdate";
            txtAuditdate.Label = "审批时间";
            txtAuditdate.Readonly = true;
            txtAuditdate.Text = PageValidate.FormatSmallDate(DateTime.Now);
            formRow3.Items.Add(txtAuditdate);
            ApproveForm.Rows.Add(formRow3);

            ApproveWindows.Items.Add(ApproveForm);

        }

        //初化工具栏按扭状态

        protected virtual void VtInitToolbarsEnable(string status)
        {
            //根据单据状态设置工具栏按扭显示
            switch (status.Trim())
            {
                case "NS"://不需要审批
                    tsbtnSave.Enabled = true;
                    break;
                case "SN"://未提交
                    tsbtnSave.Enabled = true;
                    tsbtnSubmit.Enabled = true;
                    break;
                case "S"://待审
                    tsbtnSubmit.Enabled = true;
                    tsbtnCancel.Enabled = true;
                    tsbtnApprove.Enabled = true;
                    break;
                case "UP"://审批中
                    tsbtnCancel.Enabled = true;
                    tsbtnAppRecord.Enabled = true;
                    tsbtnApprove.Enabled = true;
                    break;
                case "Y"://审批同意
                    tsbtnSubCancel.Enabled = true;
                    tsbtnAppRecord.Enabled = true;
                    break;
                case "N"://审批不同意
                    tsbtnSave.Enabled = true;
                    tsbtnSubmit.Enabled = true;
                    tsbtnAppRecord.Enabled = true;
                    break;
                case "UN"://撤消
                    tsbtnSave.Enabled = true;
                    tsbtnSubmit.Enabled = true;
                    tsbtnAppRecord.Enabled = true;
                    break;
                
            }

        }

        protected virtual void btn_ApproveYes_Click(object sender, EventArgs e)
        {

            VtBeforeApproveYes();
            VtApproveYes();
            VtAfterApproveYes();
        }
        /// <summary>
        /// 审批同意前处理业务
        /// </summary>
        protected virtual void VtBeforeApproveYes()
        {

        }
        /// <summary>
        /// 审批同意时处理业务
        /// </summary>
        protected virtual void VtApproveYes()
        {

        }
        /// <summary>
        /// 审批同意后处理业务
        /// </summary>
        protected virtual void VtAfterApproveYes()
        {
            ApproveWindows.Hidden = true;
        }
        protected virtual void btn_ApproveNo_Click(object sender, EventArgs e)
        {
            VtBeforeApproveNo();
            VtApproveNo();
            VtAfterApproveNo();

        }
        /// <summary>
        /// 审批不同意前处理业务
        /// </summary>
        protected virtual void VtBeforeApproveNo()
        {

        }
        /// <summary>
        /// 审批不同意时处理业务
        /// </summary>
        protected virtual void VtApproveNo()
        {

        }
        /// <summary>
        /// 审批不同意后处理业务
        /// </summary>
        protected virtual void VtAfterApproveNo()
        {
            ApproveWindows.Hidden = true;
        }

        protected virtual void tsbtnSave_Click(object sender, EventArgs e)
        {
            VtBeforeSave();
            VtSave();
            VtAfterSave();
        }
        /// <summary>
        /// 保存前处理业务
        /// </summary>
        protected virtual void VtBeforeSave()
        {

        }
        /// <summary>
        /// 保存时处理业务
        /// </summary>
        protected virtual void VtSave()
        {

        }
        /// <summary>
        /// 保存后处理业务
        /// </summary>
        protected virtual void VtAfterSave()
        {

        }
 
        protected virtual void tsbtnSubmit_Click(object sender, EventArgs e)
        {

            VtBeforeSubmit();
            VtSubmit();
            VtAfterSubmit();
        }
        /// <summary>
        /// 提交前处理业务
        /// </summary>
        protected virtual void VtBeforeSubmit()
        {

        }
        /// <summary>
        /// 提交时处理业务
        /// </summary>
        protected virtual void VtSubmit()
        {

        }
        /// <summary>
        /// 提交后处理业务
        /// </summary>
        protected virtual void VtAfterSubmit()
        {

        }

        protected virtual void tsbtnCancel_Click(object sender, EventArgs e)
        {
            VtBeforeCancel();
            VtCancel();
            VtAfterCancel();

        }

        /// <summary>
        /// 撤消前处理业务
        /// </summary>
        protected virtual void VtBeforeCancel()
        {

        }
        /// <summary>
        /// 撤消时处理业务
        /// </summary>
        protected virtual void VtCancel()
        {

        }
        /// <summary>
        /// 撤消后处理业务
        /// </summary>
        protected virtual void VtAfterCancel()
        {

        }


        protected virtual void tsbtnSubCancel_Click(object sender, EventArgs e)
        {
            VtBeforeSubCancel();
            VtSubCancel();
            VtAfterSubCancel();

        }

        /// <summary>
        /// 申请撤消前处理业务
        /// </summary>
        protected virtual void VtBeforeSubCancel()
        {

        }
        /// <summary>
        /// 申请撤消时处理业务
        /// </summary>
        protected virtual void VtSubCancel()
        {

        }
        /// <summary>
        /// 申请撤消后处理业务
        /// </summary>
        protected virtual void VtAfterSubCancel()
        {

        }


        protected virtual void tsbtnApprove_Click(object sender, EventArgs e)
        {
           
            VtBeforeApprove();
            VtApprove();
            VtAfterApprove();
        }

        /// <summary>
        /// 审批前处理业务
        /// </summary>
        protected virtual void VtBeforeApprove()
        {

        }
        /// <summary>
        /// 审批时处理业务
        /// </summary>
        protected virtual void VtApprove()
        {
            ApproveWindows.Hidden = false;
        }
        /// <summary>
        /// 审批后处理业务
        /// </summary>
        protected virtual void VtAfterApprove()
        {
           
        }

        protected virtual void tsbtnAppRecord_Click(object sender, EventArgs e)
        {
            VtBeforeAppRecord();
            VtAppRecord();
            VtAfterAppRecord();

        }

        /// <summary>
        /// 审记录查看前处理业务
        /// </summary>
        protected virtual void VtBeforeAppRecord()
        {

        }
        /// <summary>
        /// 审记录查看时处理业务
        /// </summary>
        protected virtual void VtAppRecord()
        {
            string strUrl = "../../common/ApproveList.aspx?mode=view&ID="+hfID .Text+"&MID=" + hfMID.Text;
            PageContext.RegisterStartupScript(ApproveWindows.GetShowReference(strUrl));
        }
        /// <summary>
        /// 审记录查看后处理业务
        /// </summary>
        protected virtual void VtAfterAppRecord()
        {

        }

        protected virtual void tsbtnPrint_Click(object sender, EventArgs e)
        {
            VtPrint();

        }
        /// <summary>
        /// 打印时处理业务
        /// </summary>
        protected virtual void VtPrint()
        {
            ExtAspNet.PageContext.RegisterStartupScript("window.print();");
        }
        protected virtual void tsbtnFresh_Click(object sender, EventArgs e)
        {
            VtFresh();
            
        }
        /// <summary>
        /// 刷新时处理业务
        /// </summary>
        protected virtual void VtFresh()
        {
            ExtAspNet.PageContext.RegisterStartupScript("window.location.href=window.location.href;");
        }

        protected virtual void tsbtnClose_Click(object sender, EventArgs e)
        {
            VtClose();
        }

        /// <summary>
        /// 关闭窗口时处理业务
        /// </summary>
        protected virtual void VtClose()
        {
            PageContext.RegisterStartupScript(ActiveWindow.GetHideReference());
        }

        //       
        ///// <summary>
        ///// 初始化工具栏
        ///// </summary>
        //protected virtual void  VtInit_Toolbars() 
        //{
        //    Toolbar ToolbarScript = FindControl(Page, typeof(ExtAspNet.Toolbar), "ToolbarScript") as Toolbar;

        //}
        private Control FindControl(Control control, Type controlType, string ToolbarName)
        {
            if (control != null && control.Controls.Count > 0)
            {
                foreach (Control c in control.Controls)
                {
                    if (c != null && c.GetType() == controlType && c.ID == ToolbarName)
                    {
                        return c;
                    }
                    else
                    {
                        Control childControl = FindControl(c, controlType, ToolbarName);
                        if (childControl != null)
                        {
                            return childControl;
                        }
                    }
                }
            }

            return null;
        }
        protected override void OnLoad(EventArgs e)
        {

            base.OnLoad(e);
        }

        protected override void OnLoadComplete(EventArgs e)
        {
            base.OnLoadComplete(e);
             
        }

    }
}
