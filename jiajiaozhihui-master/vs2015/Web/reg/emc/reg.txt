using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using SfSoft.SfEmc;
using SfSoft.Common;
namespace SfSoft.web.reg.emc
{
    public partial class reg : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string companyname = EmcCommon.getCompanyNameByID("01");
                EMCLOGO.InnerHtml = "神尔EMC-企业协同办公管理系统";
                //lblCompany.Text = companyname;
                EmcCommon.SetBaseDataEptDropDownList(ddlComputerKind, "sm.computer.ComputerKind");
                txtComputerID.Attributes.Add("ReadOnly", "true");
            }
        }


        protected void btnSubmitClick(object sender, EventArgs e)
        {
            string CnName=txtCnName.Text ;
            string IDCard=txtIDCard .Text;
            string ComputerKind=ddlComputerKind .SelectedItem .Value ;
            string ComputerID = txtComputerID.Text;
            string Remark = txtRemark.Text;
            string Brand = txtBrand.Text;
            string ComputerType = txtComputerType.Text;
            string ComputerSn = txtComputerSn.Text;
            string strErr = "";
            if (CnName == "")
            {
                strErr += "姓名不能为空！\\n";
            }
            if (IDCard == "")
            {
                strErr += "身份证号不能为空！\\n";
            }
            if (ComputerKind == "--")
            {
                strErr += "电脑使用类型不能为空！\\n";
            }
            if (ComputerID == "")
            {
                strErr += "机器号没有取到，请检查浏览器设置！\\n";
            }
            if (strErr != "")
            {
                MessageBox.Show(this, strErr);
                return;
            }

            
            Model.Pub_ComputerKey model= new SfSoft.Model.Pub_ComputerKey();
            BLL.Pub_ComputerKey bll = new SfSoft.BLL.Pub_ComputerKey();
            DataSet ds = bll.GetList(" ComputerID='" + ComputerID + "' and  status<>'已取消' and status<>'审批不同意' ");
            if (ds.Tables[0].Rows.Count > 0)
            {
                MessageBox.Show(this, "机器号：[ "+ComputerID +" ] 已经存在！");
                return;
            }
            BLL.Pub_EmpInfo bllEmp = new SfSoft.BLL.Pub_EmpInfo();
            DataSet dsEmp = bllEmp.GetUsersInfoList(" b.IDCard='" + IDCard + "' and b.zzstate='在职'");

            if (dsEmp.Tables[0].Rows.Count > 0)
            {
                model.UserID = PageValidate.StringToInt(dsEmp.Tables[0].Rows[0]["ID"].ToString());
                model.UserName = dsEmp.Tables[0].Rows[0]["UserName"].ToString();
                model.CnName = CnName;
                model.ComputerID = ComputerID;
                model.ComputerKind = ComputerKind;
                model.Brand = Brand;
                model.Flag = 1;
                model.IDCard = IDCard;
                model.Remark = Remark;
                model.Status = "未审批";
                model.ComputerType=ComputerType;
                model.ComputerSn = ComputerSn;
                model.SubmitDate = DateTime.Now;
                model.FilialeID = PageValidate.StringToInt(dsEmp.Tables[0].Rows[0]["FilialeID"].ToString());
                model.DeptID = PageValidate.StringToInt(dsEmp.Tables[0].Rows[0]["DeptID"].ToString());
                model.DeptName = dsEmp.Tables[0].Rows[0]["DeptName"].ToString();
                bll.Add(model);
                lblResult.Text  = "提交成功！等待管理员审批！";
            }
            else
            {
                MessageBox.Show(this,"身份证号：" + IDCard + " 的用户不存在!");
                return;
            }
        }
    }
}

