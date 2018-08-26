using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;

namespace SfSoft.web.emc.common
{
    public partial class Like : SfSoft.SfEmc.EmcBasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                
            }
        }

        protected void btnLike_Click(object sender, EventArgs e)
        {
            BLL.WX_Doublenovember_File bll = new BLL.WX_Doublenovember_File();
            DataSet ds = bll.GetList("Create_Date between '" + txtStartDate.Text + "' and '" + txtEndDate.Text + " 23:59:59.000'");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                try
                {
                    Random rd = new Random();
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        Model.WX_Doublenovember_File model = bll.GetModel(int.Parse(dr["ID"].ToString()));
                        int like = rd.Next(1, int.Parse(txtLikeNumber.Text));
                        if (model != null)
                        {
                            if (model.Like_Number == null)
                            {
                                model.Like_Number = like;
                            }
                            else
                            {
                                model.Like_Number += like;
                            }
                            bll.Update(model);
                        }
                    }
                    Response.Write("<script>alert('执行完成');</script>");
                }
                catch (Exception ex)
                {
                    Response.Write("<script>alert('执行出错');</script>");
                }
                finally {
                    Response.Write("<script>parent.ClosePop();</script>");
                }
            }
        }
    }
}

