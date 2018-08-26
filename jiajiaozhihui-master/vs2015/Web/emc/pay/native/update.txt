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
namespace SfSoft.web.emc.pay.native
{
    public partial class update : SfSoft.SfEmc.EmcDetailPage
    {

        Model.WX_NativePay modelArts = new SfSoft.Model.WX_NativePay();
        BLL.WX_NativePay bllArts = new BLL.WX_NativePay();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                InitDropDownList();
                string mode = Request.Params["mode"].ToString();
                string ID = Request.Params["ID"].ToString();

                hfMode.Value = mode;
                hfID.Value = ID;
                hfMID.Value = "emc.pay.native";
                //新建
                if (hfMode.Value == "add")
                {
                    lbProductId.Text = CreateProductId();
                    lbNotityUrl.Text = App.Helper.WxBaseConfig.WebSite + "app/pay/paynotice/NotityNotice.aspx";
                    rblIsAct.SelectedValue = "1";
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
            hfMID.Value = "emc.material.reply";
        }
        protected override void VtInitToolbars()
        {
            VtInitEditToolbars();
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }
        private void ShowInfo(Model.WX_NativePay model)
        {
            ddlAttach.Items.FindByValue(model.attach).Selected = true;
            txtBody.Text = model.body;
            lbNotityUrl.Text = model.notify_url;
            txtOutTradeNo.Text = model.out_trade_no;
            txtProductName.Text = model.product_name;
            txtTimeExpire.Text = model.time_expire.HasValue == true ? model.time_expire.ToString() : "";
            txtTotalFee.Text = model.total_fee.ToString();
            lbProductId.Text = model.product_id;
            rblIsAct.Items.FindByValue(model.isact.ToString()).Selected = true;
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
            Model.WX_NativePay model = new Model.WX_NativePay();
            //保存单据
            if (hfMode.Value == "add")
            {
                model = this.SetModelValue(model);
                model.trade_type = "NATIVE";
                model.spbill_create_ip = App.Helper.WxBaseConfig.ServerIp;
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

        private Model.WX_NativePay SetModelValue(Model.WX_NativePay model)
        {
            model.product_id = lbProductId.Text;
            model.attach = ddlAttach.SelectedValue;
            model.body = txtBody.Text;
            model.isact = int.Parse(rblIsAct.SelectedValue);
            model.notify_url = lbNotityUrl.Text;
            model.out_trade_no = txtOutTradeNo.Text;
            model.product_id = lbProductId.Text;
            model.product_name = txtProductName.Text;
            model.time_expire = txtTimeExpire.Text.Trim() == "" ? 5 : int.Parse(txtTimeExpire.Text);
            model.total_fee=txtTotalFee.Text.Trim()==""?0:int.Parse(txtTotalFee.Text);
            return model;
        }
        private string checkform()
        {
            string strErr = "";
            if (string.IsNullOrEmpty(txtProductName.Text.Trim())) {
                strErr += "商品名称不能为空！\\n";
            }
            if (string.IsNullOrEmpty(txtBody.Text) ) {
                strErr += "商品描述不能为空！\\n";
            }
            else if (txtBody.Text.Length > 64) {
                strErr += "商品描述不能大于64个字符！\\n";
            }
            if (string.IsNullOrEmpty(txtTotalFee.Text)) {
                strErr += "商品价格不能为空！\\n";
            }
            else if (SfSoft.Common.PageValidate.IsNumber(txtTotalFee.Text) == false) {
                strErr += "商品价格不合法！\\n";
            }
            if (string.IsNullOrEmpty(txtOutTradeNo.Text.Trim())) {
                strErr += "商商户订单前缀不能为空！\\n";
            }
            else if (txtOutTradeNo.Text.Trim().Length != 10) {
                strErr += "商户订单前缀必须10个字符！\\n";
            }
            else if ( hfMode.Value == "add" && CheckOutTradeNo(txtOutTradeNo.Text) == true)
            {
                strErr += "商户订单前缀必须是唯一，请重新输入！\\n";
            }
            if (string.IsNullOrEmpty(txtTimeExpire.Text)) {
                if (PageValidate.IsNumber1(txtTimeExpire.Text)==false)
                {
                    strErr += "交易结束时间不是有效的数字！\\n";
                }
                else if (int.Parse(txtTimeExpire.Text) < 5) {
                    strErr += "交易结束时间不能少于5分钟！\\n";
                }
            }
            if (ddlAttach.SelectedItem == null || ddlAttach.SelectedValue == "") {
                strErr += "请选择商品类型！\\n";
            }
            return strErr;
        }
        private string CreateProductId()
        {
            return Guid.NewGuid().ToString("N");
        }
        private bool CheckOutTradeNo(string tradeNo)
        {

            BLL.WX_NativePay bll = new BLL.WX_NativePay();
            var list= bll.GetModelList("");
            return list.Exists(e => e.out_trade_no == tradeNo);
        }
        private void InitDropDownList()
        {
            foreach (WxPayAPI.WxPayProjectEnum item in Enum.GetValues(typeof(WxPayAPI.WxPayProjectEnum)))
            {
                ddlAttach.Items.Add(new ListItem() { 
                    Text=item.ToString(),
                    Value=((int)item).ToString()
                });
            }
            ddlAttach.Items.Insert(0, new ListItem { 
                Text="。。。请选择产品类型。。。。",
                Value=""
            });
        }
    }
}


