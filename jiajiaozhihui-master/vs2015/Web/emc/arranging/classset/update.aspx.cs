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
namespace SfSoft.web.emc.arranging.classset
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {
        Model.wx_class modelArts = new SfSoft.Model.wx_class();
        BLL.wx_class bllArts = new BLL.wx_class();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                string mode = Request.Params["mode"].ToString();
                string ID = Request.Params["ID"].ToString();


                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.arranging.classset";
                //新建
                if (hfMode.Value == "add")
                {
                    modelArts.is_act = 1;
                }
                //修改
                if (hfMode.Value == "update")
                {
                    modelArts = bllArts.GetModel(int.Parse(ID));
                    if (modelArts != null)
                    {
                        this.ShowInfo(modelArts);
                    }
                }
            }
        }
        //1.初始化模块ID
        protected override void VtInitMID()
        {
            hfMID.Value = "emc.arranging.classset";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.wx_class model)
        {
            lbClassArea.Text = GetClassArea(int.Parse(model.class_area));
            txtClassIntro.Text = model.class_intro;
            txtClassName.Text = model.class_name;
            txtClosingDate.Text = model.closing_date == null ? "" : model.closing_date.ToString();
            txtOpeningDate.Text=model.opening_date == null ? "" : model.opening_date.ToString();

            rblIsAct.Items.FindByValue(model.is_act.ToString()).Selected = true;
        }
        protected override void VtSave()
        {
            string strErr = "";
            strErr = checkform();
            if (strErr != "")
            {
                MessageBox.Show(this, strErr);
                OperateSuccess = false;
                return;
            }
            Model.wx_class model = new Model.wx_class();
            //保存单据
            if (hfMode.Value == "add")
            {
                model = this.SetModelValue(model);
                model.create_date = DateTime.Now;
                int index = bllArts.Add(model);
                hfMode.Value = "update";
            }
            else
            {
                string ID = hfID.Value;
                model = bllArts.GetModel(int.Parse(ID));
                model = this.SetModelValue(model);
                bllArts.Update(model);
            }
        }

        private Model.wx_class SetModelValue(Model.wx_class model)
        {
            model.class_name = txtClassName.Text;
            if(string.IsNullOrEmpty(txtClosingDate.Text)){
                model.closing_date = null;
            }else{
                model.closing_date = DateTime.Parse(txtClosingDate.Text);
            }
            if (string.IsNullOrEmpty(txtOpeningDate.Text))
            {
                model.opening_date = null;
            }
            else
            {
                model.opening_date = DateTime.Parse(txtOpeningDate.Text);
            }
            return model;
        }
        
        private string checkform()
        {
            string strErr = "";
            if (this.txtClassName .Text.Trim() == "")
            {
                strErr += "班级名称不能为空！\\n";
            }
            if (this.txtOpeningDate.Text.Trim() == "")
            {
                strErr += "开学日期不能为空！\\n";
            }
            return strErr;
        }
        private string GetClassArea(int areaId)
        {
            BLL.WX_SGroup bll = new BLL.WX_SGroup();
            var model= bll.GetModel(areaId);
            if (model != null) {
                return model.group_name;
            }
            return "";
        }
    }
}


