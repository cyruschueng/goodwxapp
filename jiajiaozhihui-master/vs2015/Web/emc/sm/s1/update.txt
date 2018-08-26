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
namespace SfSoft.web.emc.sm.s1
{
    public partial class update : System.Web.UI.Page
    {

        protected void Page_Load(object sender, EventArgs e)
        {
             
            string DeptIDTemp = "";

            if (!IsPostBack)
            {
                //获得DeptID
                if (Request.QueryString["DeptID"] != null)
                {
                    DeptIDTemp = Request.QueryString["DeptID"].ToString();
                    State.Value = Request.QueryString["state"].ToString();
                }
                //是否有保存的权限
                btnAdd.Visible = SfEmc.UserAcl.checkMenuAcl((DataView)Session["UserAcldv"], "emc.sm.s1.save");
                BLL.Pub_Dept bllDept = new BLL.Pub_Dept();
                Model.Pub_Dept ModelDept = new Model.Pub_Dept();
                string tempDeptNo = "";
                string tempDeptNoC = "";
                string tempParentDeptID = "";
                //取的当前部门编码
                ModelDept = bllDept.GetModel(Common.Common.stringToInt(DeptIDTemp));
                if (ModelDept!=null) 
                 {
                     tempDeptNoC = ModelDept.DeptNo;
                     tempParentDeptID = ModelDept.ParentID.ToString();
                 }
 
                //增加当前级
                if (State.Value == "addCur")
                {

                    //如果是第一级
                    if (DeptIDTemp == "0")
                    {
                        hfParentID.Value  = DeptIDTemp;
                        tempDeptNo = "00";
                    }
                    //如果是一级以上
                    else
                    {
                        hfParentID.Value = tempParentDeptID;
                        //取的上级部门编码
                        tempDeptNo = tempDeptNoC.Substring(0, tempDeptNoC.Length - 2);
                    }
                    //设置上级部门名
                    this.SetParentDeptName(hfParentID.Value);
                    //设置公司类型
                    this.LblFiliale.Text = "部门";
                    ShowDropDownList(hfParentID.Value, tempDeptNo);
                }
                //增加下一级
                if  (State.Value == "addNext")
                {
                    this.SetParentDeptName(DeptIDTemp);
                    hfParentID.Value = DeptIDTemp;
                    //设置公司类型
                    this.LblFiliale.Text = "部门";
                    ShowDropDownList(DeptIDTemp, tempDeptNoC);
                }
                //查询修改
                if (State.Value == "update")
                {
                    
                    this.SetParentDeptName(DeptIDTemp);
                    DeptIDDropDownList.Visible = false;
                    txtDeptNo.Visible = true;
                    hfDeptID.Value = DeptIDTemp;
                    ModelDept = bllDept.GetModel(Common.Common.stringToInt(DeptIDTemp));
                    if (ModelDept.IsFiliale != "2")
                    {
                        txtDeptName.ReadOnly = true;
                    }
                    if (ModelDept != null)
                    {
                        ShowInfo(ModelDept);

                    }
                }
                 //删除当前级
                if (State.Value == "delete")
                {
                    if (this.LblFiliale.Text.Trim() != "部门")
                    {
                        MessageBox.Show(this, "公司级机构不能在这里删除，请到系统设置中进行管理!!!");
                    }
                   string strWhere = " ParentID = '" + DeptIDTemp + "'";
                    DataSet dsDept = bllDept.GetList(strWhere);
                    if (dsDept.Tables[0].Rows.Count>0)
                    {
                         MessageBox.Show(this, "还有下一级机构，先删除下级机构！！！");
                         Response.Write("<script>parent.mainbody.location='/empty.aspx'</script>");
                        return ;
                    }
                    bllDept.Delete(int.Parse(DeptIDTemp));

                    MessageBox.Show(this, "删除成功！！！");
                    Response.Write("<script> parent.leftbody.location='depttree.aspx?state=browse&ParentNo=" + tempDeptNo + "';");
                    Response.Write("parent.mainbody.location='/empty.aspx'</script>");
                }
            }
        }
        /// <summary>
        /// 保存数据
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void btnAdd_Click(object sender, EventArgs e)
        {

           
            if ((hfParentAuditID.Value != null) && (hfParentAuditID.Value  != ""))
            {
                this.txtParentAuditName.Text = EmcCommon.getDeptNameByID(Common.Common.stringToInt(hfParentAuditID.Value));
            }
            if (hfManagerID.Value != null)
            {
                this.txtManagerName.Text = EmcCommon.getUserCnNameByID(hfManagerID.Value);
            }
            if (hfAuditID.Value != null)
            {
                this.txtAuditName.Text = EmcCommon.getUserCnNameByID(hfAuditID.Value);
            }
            string strErr = "";

            strErr = this.checkform();


            if (strErr != "")
            {
                MessageBox.Show(this, strErr);
                return;
            }
            Model.Pub_Dept Model = this.SetModelValue();
            BLL.Pub_Dept bll = new BLL.Pub_Dept();
            if (State.Value == "update")
            {
                Model.FilialeID = Session["FilialeID"].ToString();
                bll.Update(Model);
                LblMessage.Text = "更新成功";
            }

            if ((State.Value == "addCur") || (State.Value =="addNext"))
            {
                //检查部门ID是否已经使用
                if (bll.Exists(Model.DeptID))
                {
                    MessageBox.Show(this, "部门编码已使用");
                    return;
                }
                Model.IsFiliale = "2";
                Model.FilialeID = Session["FilialeID"].ToString();
                bll.Add(Model);
                State.Value = "update";
                LblMessage.Text = "新增成功";
                Response.Write("<script> parent.leftbody.location='depttree.aspx?state=browse&PDeptNo=" + Model.DeptNo + "';</script>");
            }

        }

        private void SetParentDeptName(string tempParentDeptID)
        {
            //取上级部门信息
            if (tempParentDeptID == "0") //取公司名
            {
                BLL.Pub_Company bllCom = new BLL.Pub_Company();
                Model.Pub_Company modelCom = bllCom.GetModel("01");
                if (modelCom != null)
                {
                    LblParentDept.Text = modelCom.CompanyName;
                }

            }
            else
            {
                BLL.Pub_Dept bllDept = new BLL.Pub_Dept();
                Model.Pub_Dept ModelPDept = new Model.Pub_Dept();
                ModelPDept = bllDept.GetModel(Common.Common.stringToInt(tempParentDeptID));
                if (ModelPDept != null)
                {
                    LblParentDept.Text = ModelPDept.DeptName;
                }
            }
        }
 
        /// <summary>
        /// 显示内容
        /// </summary>
        /// <param name="Model"></param>
        private void ShowInfo(Model.Pub_Dept Model)
        {
            
            this.txtDeptNo.Text = Model.DeptNo;
            this.hfParentID.Value  = Model.ParentID.ToString();
            this.txtDeptName.Text = Model.DeptName;
            this.hfManagerID.Value  = Model.ManagerID.ToString();
            this.txtManagerName.Text = Model.ManagerName;
            this.hfParentAuditID.Value = Model.ParentAuditID.ToString();
            this.txtParentAuditName.Text = EmcCommon.getDeptNameByID(Common.Common.stringToInt(Model.ParentAuditID.ToString()));
            this.hfAuditID.Value  = Model.AuditID.ToString();
            this.txtAuditName.Text  = Model.AuditName;

            this.txtContactInfo.Text = Model.ContactInfo;
            this.txtDeptName_e.Text = Model.DeptName_e;
            if (Model.IsFiliale == "0")
            {
                this.LblFiliale.Text = "公司总部";
            }
            else if (Model.IsFiliale == "1")
            {
                this.LblFiliale.Text = "子公司";
            }
            else
            {
                this.LblFiliale.Text = "部门";
            }

        }
        /// <summary>
        /// 设置Model数据
        /// </summary>
        /// <returns></returns>
        private Model.Pub_Dept SetModelValue()
        {
 
            string DeptName = this.txtDeptName.Text;
            string ManagerID = this.hfManagerID.Value;
            string ManagerName = this.txtManagerName.Text;
            string ParentAuditID = this.hfParentAuditID.Value;
            
            string ContactInfo = this.txtContactInfo.Text;
            string DeptName_e = this.txtDeptName_e.Text;
            Model.Pub_Dept ModelPd = new Model.Pub_Dept();
            if ((State.Value == "addCur") || (State.Value == "addNext"))
            {
                ModelPd.DeptNo = DeptIDDropDownList.SelectedValue;
            }
            if (State.Value == "update") 
            {
                ModelPd.DeptNo = txtDeptNo.Text;
            }

            ModelPd.DeptID = Common.Common.stringToInt(hfDeptID.Value);
            ModelPd.AuditID = Common.Common.stringToInt(this.hfAuditID.Value);
            ModelPd.AuditName = this.txtAuditName.Text;
            ModelPd.ParentID = Common.Common.stringToInt(this.hfParentID.Value);
            ModelPd.DeptName = DeptName;
            ModelPd.ManagerID = Common.Common.stringToInt(ManagerID);
            ModelPd.ManagerName = ManagerName;
            ModelPd.ParentAuditID = Common.Common.stringToInt(ParentAuditID);
            ModelPd.ContactInfo = ContactInfo;
            ModelPd.DeptName_e = DeptName_e;


            return ModelPd;
        }

        /// <summary>
        /// 核对输入框
        /// </summary>
        /// <returns></returns>
        private string checkform()
        {
            string strErr = "";
 
            if (this.txtDeptName.Text == "")
            {
                strErr += "部门名不能为空！\\n";
            }
            return strErr;
        }
        private void ShowDropDownList(string ParentID, string ParentNo)
        {
            ListItem liDeptID1 = new ListItem();
            liDeptID1.Value ="";
            liDeptID1.Text = "选择可用编码";
            DeptIDDropDownList.Items.Add(liDeptID1);

            BLL.Pub_Dept bllDept = new BLL.Pub_Dept();
            string strWhere = " ParentID = '" + ParentID + "'";
            DataSet dsDept = bllDept.GetList(strWhere);
            for (int i = 1; i <= 99; i++)
            {
                string tempID = "";
                if (i < 10)
                {
                    tempID = "0" + i.ToString();
                }
                else
                {
                    tempID = i.ToString();
                }
                Boolean bl = true;
                if (dsDept != null)
                {
                    DataView dvDept = new DataView(dsDept.Tables[0]);
                    if (dvDept != null)
                    {
                        dvDept.RowFilter = "[DeptNo]='" + ParentNo+tempID + "'";
                        if (dvDept.Count > 0) 
                        {

                            bl = false;
                        }
                    }
                }
                if (bl)
                {
                    ListItem liDeptID = new ListItem();
                    liDeptID.Value = ParentNo + tempID;
                    liDeptID.Text = ParentNo + tempID;
                    DeptIDDropDownList.Items.Add(liDeptID);
                }
            }
            
        }

 

    }
}


