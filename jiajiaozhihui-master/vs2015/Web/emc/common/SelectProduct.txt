using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;

namespace SfSoft.web.emc.common
{
    public partial class SelectProduct : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                if (Request.QueryString["goodstype"] != null) {
                    BindData(Request.QueryString["goodstype"].ToString());
                }
                if (Request.QueryString["productidbags"] != null)
                {
                    hfIDBags.Value = Request.QueryString["productidbags"].ToString();
                }
            }
        }
        private void BindData(string goodsType)
        {
            BLL.WX_PublicGood bll = new BLL.WX_PublicGood();
            DataSet ds = bll.GetList(0, "isnull(GoodsType,0)="+goodsType, "id desc");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                this.GridView1.DataSource = ds;
                this.GridView1.DataBind();
            }
            else {
                Common.SetEmptyGridView.GridViewDataBind(GridView1, ds.Tables[0]);
            }
        }
    }
}

