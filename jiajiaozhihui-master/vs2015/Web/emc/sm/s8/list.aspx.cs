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
using System.Text;
 
using SfSoft.Common;
using SfSoft.SfEmc;
namespace SfSoft.web.emc.sm.s8
{
    public partial class list : SfSoft.SfEmc.EmcBasePage 
    {


        protected void Page_Load(object sender, EventArgs e)
        {
   
 
                string MID = Request.Params["MID"].Trim();
                string mode = Request.Params["mode"].Trim();
                hfMID.Value = MID;
                SetModuleName();

                TabOptionItem1.Tab_Name = "[" + hfMName.Value + "] 审批流程";
             
                string CallType = "";
                if (!IsPostBack)
                {
                    BLL.Pub_FunDef bllpf = new SfSoft.BLL.Pub_FunDef();
                    string strWhere = " FunID ='" + hfMID.Value + "' and FunType='App'";
                    DataSet dspf = bllpf.GetList(strWhere);
               
                    string isApprove = "Y";
                    if (dspf != null && dspf.Tables[0].Rows.Count > 0)
                    {
                        isApprove = dspf.Tables[0].Rows[0]["IsApprove"].ToString();
                        CallType = dspf.Tables[0].Rows[0]["CallType"].ToString();
                    }
                    if (isApprove == "Y")
                    {
                        ckIsApprove.Checked = false ;
                    }
                    else
                    {
                        ckIsApprove.Checked = true ;
                    }
                    EmcCommon.GetCallTypeCheckBoxList(cblCallType, null, null);
                    if (CallType == "")
                    {
                        CallType = "0";
                    }
                    EmcCommon.ShowCheckBoxList(cblCallType, CallType);//默认为消息
                    EmcCommon.GetAppFunNotFreeDropDownList(ddlFun, Session["FilialeID"].ToString());
                        
                }
                if (mode == "del" )
                {
                    string AFID = Request.Params["AFID"].Trim();
                    string AuditClass =Request.Params ["AuditClass"].ToString ().Trim();
                    DelAuditFlow(AFID, AuditClass, MID);
                }


        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.sm.s8";
        }
        protected override void VtPageAccess()
        {
            CheckPageAccess("emc.sm.s8.browse");
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseListToolsBars();
        }

        protected void btnSave_Click(object sender, EventArgs e)
        {

            string CallType1 = EmcCommon.GetCheckBoxListValue(cblCallType);
            if (CallType1 == "")
            {
                CallType1 = "0";
            }
            string sqlup = "update Pub_FunDef set CallType='" + CallType1 + "' where FunID='" + hfMID.Value + "' and FunType='App'";
            DBTools.UpdateTableBySql(sqlup);
 
        }
        //删除审批点
        //[AjaxPro.AjaxMethod]
        public string DelAuditFlow(string AFID, string AuditClass, string MID)
        {
            BLL.Pub_AuditFlow bllpaf = new SfSoft.BLL.Pub_AuditFlow();
            BLL.Pub_AuditFlow_Dept bllpafd = new SfSoft.BLL.Pub_AuditFlow_Dept();

            
              //删除当前审人
            bllpaf.Delete(int.Parse(AFID));
              //删除审批范围
            bllpafd.Delete(int.Parse(AFID));
 
            //审批点中还有没有其它审批人
            string strWhere = " MID='" + MID + "' and AuditClass='" + AuditClass + "' and FilialeID='" + Session["FilialeID"].ToString() + "'";
            DataSet dspaf = bllpaf.GetList(strWhere);
            if (dspaf==null || dspaf.Tables[0].Rows.Count <1)  //无其它审批人 
            {
                //更新上级级别
                bllpaf.LwAuditClass(int.Parse(AuditClass), MID,Session["FilialeID"].ToString ());

            }
            //list.aspx?state=browse&mode=list&MID='+MID+
            Response.Write("<script>document.location='list.aspx?state=browse&mode=list&MID=" + hfMID.Value + "'</script>");
            return  "";
          //  return GetAuditList();
             
        }

        private void SetModuleName()
        {
            BLL.Pub_FunDef bllpf = new SfSoft.BLL.Pub_FunDef();
            string strWhere = " FunID='" + hfMID.Value + "'  and FunType='App'";
            DataSet ds = bllpf.GetList(strWhere);
            if (ds != null)
            {
                if (ds.Tables[0].Rows.Count > 0)
                {
                    string MName = ds.Tables[0].Rows[0]["FunName"].ToString();
                    lblMName.Text = MName;
                    hfMName.Value = MName;
                }
            }

        }

        private int GetMaxClass()
        {
            BLL.Pub_AuditFlow bllpaf = new SfSoft.BLL.Pub_AuditFlow();
            string strWhere = " MID= '" + hfMID.Value + "' and FilialeID='" + Session["FilialeID"].ToString() + "'";
            int MaxClass1 = bllpaf.GetMaxClass(strWhere);
            return MaxClass1;
        }
        private DataTable GetAuidtFlowDataSet(string MID)
        {
            BLL.Pub_AuditFlow bllPaf = new SfSoft.BLL.Pub_AuditFlow();

            string strWhere1 = " MID = '" + MID + "' and FilialeID='" + Session["FilialeID"].ToString() + "' order by AuditClass";
            DataSet ds = bllPaf.GetList(strWhere1);
            return ds.Tables[0];
        }
        private DataTable GetAuidtFlowDeptDataSet()
        {
            BLL.Pub_AuditFlow_Dept bllPafd = new SfSoft.BLL.Pub_AuditFlow_Dept();
            string strWhere1 = " MID = '" + hfMID.Value + "' and FilialeID='" + Session["FilialeID"].ToString() + "'";
            DataSet ds = bllPafd.GetList(strWhere1);
            return ds.Tables[0];

        }

        public string GetAuditList()
        {
            if (ckIsApprove.Checked != false)
            {
                return "";
            }
            DataTable dtflow = GetAuidtFlowDataSet(hfMID.Value);
            DataTable dtafd = GetAuidtFlowDeptDataSet();
            DataView dvflow = new DataView(dtflow);
            DataView dvafd = new DataView(dtafd);

            StringBuilder strHtml = new StringBuilder();
            string mid1 = hfMID.Value;
            strHtml.Append(" <table width=100% border=0 cellspacing=0 cellpadding=1>");
            strHtml.Append("      <tr>");
            strHtml.Append("        <td height=22 width=47% align=CENTER>&nbsp;</td>");
            strHtml.Append("         <td height=22 width=3% align=CENTER>");
            strHtml.Append("              <img src=../../../images/ICON/down02.gif width=16 height=32></td>");
            strHtml.Append("           <td height=22 width=2%>");
            strHtml.Append("               <img src=../../../images/ICON/goahead_on.gif width=23 height=23></td>");
            strHtml.Append("           <td height=22 width=48%>");
            strHtml.Append("             <a href=javascript:onclick=set_workfrow('" + mid1 + "','1','add','N')>插入审批点</a></td>");
            strHtml.Append("        </tr>");
            strHtml.Append("  </table>");


            int MaxClass1 = this.GetMaxClass();
            string newclass = "2";
            string trbg = " style=color: #D4EDFA;";
            for (int cl = 1; cl <= MaxClass1; cl++)
            {
                newclass = (cl + 1).ToString();
                if ((cl % 2) == 0)
                {
                    trbg = "#F2F8FD";
                }
                strHtml.Append("  <table width=98% border=0 cellspacing=0 cellpadding=1 class=fromtable> ");
                strHtml.Append("      <tr>");
                strHtml.Append("          <td width=50% bgcolor=#52C2F9>");
                strHtml.Append("              <font color=#0000FF>审批级别:" + cl + " </font></td>");
                
               
                strHtml.Append("        <td width=50% align=RIGHT style='text-align:right'>");
                strHtml.Append("              <a href=javascript:onclick=set_workfrow('" + mid1 + "','" + cl.ToString() + "','add','Y')>");
                strHtml.Append("                <img src=../../../images/button/add_on.gif width=54 height=18 border=0></a></td>");
               
                strHtml.Append("     </tr>");
                strHtml.Append("  </table>");
                strHtml.Append(" <table width=98% border=0 cellspacing=0 cellpadding=1 bgcolor=#D4EDFA class=fromtable> ");
                strHtml.Append("     <tr bgcolor=#8AD3F7>");
                strHtml.Append("          <td width=90 style=color: white; height: 30px>审批名称</td>");
                strHtml.Append("         <td width=60 style=color: white; height: 24px>审批人</td>");
                strHtml.Append("         <td width=87 style=color: white; height: 24px> 审批方式</td>");
                strHtml.Append("          <td width=73 style=color: white; height: 24px>审批条件</td>");
                strHtml.Append("          <td width=70 style=color: white; height: 24px>审批范围</td>");
                strHtml.Append("         <td width=15%  style=color: white; height: 24px>范围</td>");
                strHtml.Append("      <td width=5% style=height: 24px>   &nbsp;</td>");
                strHtml.Append("     </tr>");

                dvflow.RowFilter = " AuditClass = '" + cl.ToString() + "'";
                foreach (DataRowView dr in dvflow)
                {
                    string AFID = dr["AFID"].ToString();
                    string AuditName = dr["AuditName"].ToString();
                    string AuditMode = dr["AuditMode"].ToString();
                    string FieldName = dr["FieldName"].ToString();
                    string LogicName = dr["LogicName"].ToString();
                    string ConditionValue = dr["ConditionValue"].ToString();
                    string AuditBound = dr["AuditBound"].ToString();
                    string AuditTypeName = dr["AuditTypeName"].ToString();
                    string AuditModeName = "上级审批";
                    if (AuditMode == "P")
                    {
                        AuditModeName = "指定审批";
                    }
                    string FieldName1 = "无条件";
                    if (FieldName != "N")
                    {
                        FieldName1 = "有条件";
                    }
                    string AuditBoundName = "默认范围";
                    if (AuditBound == "PT")
                    {
                        AuditBoundName = "指定范围";
                    }


                    strHtml.Append("       <tr >");
                    strHtml.Append("         <td height=22 width=90  " + trbg + ">&nbsp;" + AuditTypeName + "</td>");
                    strHtml.Append("         <td width=60  " + trbg + ">&nbsp;" + AuditName + "</td>");
                    strHtml.Append("         <td width=90  " + trbg + ">&nbsp;" + AuditModeName + "</td>");
                    strHtml.Append("         <td width=70 " + trbg + ">&nbsp;" + FieldName1 + "</td>");
                    strHtml.Append("         <td width=70 " + trbg + ">&nbsp;" + AuditBoundName + "</td>");
                    strHtml.Append("         <td width=15%  " + trbg + ">");

                    dvafd.RowFilter = " AFID = '" + AFID + "'";
                    string DeptName = "";
                    foreach (DataRowView dr1 in dvafd)
                    {
                        DeptName = dr1["DeptName"].ToString();
                        strHtml.Append("" + DeptName + "");
                        strHtml.Append("<br>");
                    }

                    strHtml.Append("         </td>");
                    strHtml.Append("         <td width=5%  " + trbg + ">");
                    strHtml.Append("             <a href=javascript:onclick=update_workfrow('" + AFID + "','" + mid1.ToString() + "','" + cl.ToString() + "','update','Y')>");
                    strHtml.Append("                 <img src=../../../images/button/update.gif height=19 border=0></a>");
                    strHtml.Append("             <a href=javascript:onclick=del_workfrow('" + AFID + "','" + mid1.ToString() + "','" + cl.ToString() + "')>");
                    strHtml.Append("             <img src=../../../images/button/delete.gif height=19 border=0></a></td>");
                    strHtml.Append("     </tr>");
                }
                strHtml.Append("  </table>");
                strHtml.Append(" <table width=98% border=0 cellspacing=0 cellpadding=1>");
                strHtml.Append("    <tr>");
                strHtml.Append("         <td height=22 width=47% align=CENTER>&nbsp;</td>");
                strHtml.Append("         <td height=22 width=3% align=CENTER>");
                strHtml.Append("             <img src=../../../images/ICON/down02.gif width=16 height=32></td>");
                strHtml.Append("         <td height=22 width=2%>");
                strHtml.Append("             <img src=../../../images/ICON/goahead_on.gif width=23 height=23></td>");
                strHtml.Append("         <td height=22 width=48%>");
                strHtml.Append("             <a href=javascript:onclick=set_workfrow('" + mid1.ToString() + "','" + newclass + "','add','N')>");
                strHtml.Append("                 插入审批点</a></td>");
                strHtml.Append("     </tr>");
                strHtml.Append(" </table>");

            }

            strHtml.Append("  <table width=98% border=0 cellspacing=0 cellpadding=1 bgcolor=#8ad3f7 class=fromtable>");
            strHtml.Append("      <tr>");
            strHtml.Append("         <td height=22 width=47%>&nbsp;</td>");
            strHtml.Append("         <td height=22 width=53% style=color: white>");
            strHtml.Append("            流程结束");
            strHtml.Append("        </td>");
            strHtml.Append("  </tr></table>");
            return strHtml.ToString();
        }

        protected void ckIsApprove_CheckedChanged(object sender, EventArgs e)
        {
            string isApprove = "N";
            if (ckIsApprove.Checked == false )
            {
                isApprove = "Y";

            }
            BLL.Pub_FunDef bllpd= new BLL.Pub_FunDef();
            bllpd.UpdateIsApprove(hfMID.Value ,"App",isApprove );

        }

        protected void btnImportClick(object sender, EventArgs e)
        {
            if (GetAuidtFlowDataSet(hfMID.Value).Rows.Count > 0)
            {
                MessageBox.Show(this, "当前功能已设置审批流程，请先清除现有流程再导入！");
                return;
            }
            string FromFunID = ddlFun.SelectedItem.Value;
            if (FromFunID == "--")
            {
                MessageBox.Show(this, "没有选择要导入的审批流程！");
                return;
               
            }

            DataTable dtFrom = GetAuidtFlowDataSet(FromFunID);
            BLL.Pub_AuditFlow bllPaf = new SfSoft.BLL.Pub_AuditFlow();
            BLL.Pub_AuditFlow_Dept bllPafd = new SfSoft.BLL.Pub_AuditFlow_Dept();
            Model.Pub_AuditFlow modelPaf = new SfSoft.Model.Pub_AuditFlow();
            Model.Pub_AuditFlow_Dept modelPafd = new SfSoft.Model.Pub_AuditFlow_Dept();

            foreach (DataRow dr in dtFrom.Rows)
            {
                string AFID = dr["AFID"].ToString();
                modelPaf = bllPaf.GetModel(int.Parse(AFID));
                modelPaf.MID = hfMID.Value;
                int NEWAFID= bllPaf.Add(modelPaf);
                //取的部门范围
                DataSet ds = DBTools.GetList("select * from Pub_AuditFlow_Dept where AFID='" + AFID + "'");
                foreach (DataRow drDept in ds.Tables[0].Rows)
                {
                    string ID = drDept["ID"].ToString();
                    modelPafd = bllPafd.GetModel(int.Parse(ID));
                    modelPafd.AFID = NEWAFID;
                    modelPafd.MID = hfMID.Value;
                    bllPafd.Add(modelPafd);

                }

            }

            Response.Write("<script>document.location='list.aspx?state=browse&mode=list&MID=" + hfMID.Value + "'</script>");
        }
    }
}


