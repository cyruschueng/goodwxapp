using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;

namespace SfSoft.web.help
{
    public partial class createbill : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                InitArea();
                InitProvince();
            }
        }
        private string  Check() 
        {
            string msg = "";
            if (txtName.Text == "") {
                msg += "订购人不能为空\n";
            }
            if (txtPhone.Text == "") {
                msg += "手机号码不能为空\n";
            }
            if (ddlProvince.SelectedItem==null || ddlProvince.SelectedValue=="") {
                msg += "省不能为空\n";
            }
            if (ddlCity.SelectedItem == null || ddlCity.SelectedValue == "")
            {
                msg += "市不能为空\n";
            }
            if (txtAddress.Text == "")
            {
                msg += "详细地址不能为空\n";
            }
            return msg;
        }

        protected void btnOk_Click(object sender, EventArgs e)
        {
            try {
                Model.WX_PublicOrder model = new Model.WX_PublicOrder();
                model.Name = txtName.Text;
                model.TelePhone = txtPhone.Text;
                model.Province = ddlProvince.SelectedValue;
                model.City = ddlCity.SelectedValue;
                model.Address = txtAddress.Text;
                model.Tradeno = txtTradeno.Text;
                model.GoodID = 76;
                model.OpenID = "";
                model.OrderDate = DateTime.Now;
                model.GoodsType = 11;
                model.IsSend = 0;
                model.Price =Convert.ToDecimal(119.00);
                model.PayNumber = 1;
                if (cblPay.SelectedItem != null)
                {
                    model.IsPay = Convert.ToInt32(cblPay.SelectedValue);
                    if (cblPay.SelectedValue == "1") {
                        model.Paymode = 1;
                    }
                }
                else
                {
                    model.IsPay = 0;
                }

                BLL.WX_PublicOrder bll = new BLL.WX_PublicOrder();
                int row = bll.Add(model);
                if (row > 0)
                {
                    ordermsg.InnerHtml = "";
                    string msg = Result("提交成功！");
                    ordermsg.InnerHtml = msg;
                }
            } catch( Exception ex){
                ordermsg.InnerHtml = "";
                string msg = Result("提交失败！/r/n"+ex.Message);
                ordermsg.InnerHtml = msg;
            }
        }
        private DataSet DataArea { get; set; }
        private void InitArea()
        {
            BLL.Pub_Areas bll = new BLL.Pub_Areas();
            DataSet ds= bll.GetAllList();
            if (ds == null ) {
                ds = new DataSet();
            }
            DataArea = ds;
        }
        private void InitProvince()
        {
            if (DataArea != null) {
                ddlProvince.Items.Clear();
                foreach (DataRow dr in DataArea.Tables[0].Rows) {
                    if (dr["AreaType"].ToString() == "1") {
                        ddlProvince.Items.Add(new ListItem() { Text = dr["AreaName"].ToString(), Value = dr["AreaId"].ToString() });
                    }
                }
                ddlProvince.Items.Insert(0, new ListItem() { Text = "----选择省分----", Value = "" });
            }
        }

        protected void ddlProvince_SelectedIndexChanged(object sender, EventArgs e)
        {
            InitArea();
            if (DataArea != null) {
                ddlCity.Items.Clear();
                if (ddlProvince.SelectedItem != null && ddlProvince.SelectedValue != "") {
                    string pid = ddlProvince.SelectedValue;
                    foreach (DataRow dr in DataArea.Tables[0].Rows) {
                        if (dr["AreaType"].ToString() == "2" && dr["PID"].ToString() == pid) {
                            ddlCity.Items.Add(new ListItem() { Text = dr["AreaName"].ToString(), Value = dr["AreaId"].ToString() });
                        }
                    }
                    ddlCity.Items.Insert(0, new ListItem() { Text = "----选择城市----", Value = "" });
                }
            }
        }
        private string Result(string msg)
        {
            var html = "";
            html += "<div class='alert alert-danger' role='alert'>\r\n";
            html += "     <button type='button' class='close' data-dismiss='alert' aria-label='Close'>\r\n";
            html += "         <span aria-hidden='true'>&times;</span>\r\n";
            html += "     </button>\r\n";
            html += "       "+msg+"";
            html += "</div>\r\n";

            return html;
        }

        protected void btnNew_Click(object sender, EventArgs e)
        {
            txtAddress.Text = "";
            txtName.Text = "";
            txtPhone.Text = "";
            txtTradeno.Text = "";
            ddlCity.SelectedValue = "";
            ddlProvince.SelectedValue = "";
            cblPay.SelectedValue = "1";
            ordermsg.InnerHtml ="";
        }
    }
}
