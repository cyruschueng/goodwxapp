using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SfSoft.SfEmc;
using System.Data;
using System.Text;
using SfSoft.DBUtility;

namespace SfSoft.web.emc.common
{
    public partial class SelectArea : SfSoft.SfEmc.EmcBasePage
    {
 
        protected void Page_Load(object sender, EventArgs e)
        {
 
   
            if (!IsPostBack)
            {

                if (Request.Params["ObjID"] != null)
                {
                    hfObjID.Value = Request.Params["ObjID"].ToString();
                }
                if (Request.Params["ObjhfID"] != null)
                {
                    hfObjhfID.Value = Request.Params["ObjhfID"].ToString();
                }
                if (Request.Params["Flag"] != null)
                {
                    hfFlag.Value = Request.Params["Flag"].ToString();
                }
                if (Request.Params["OID"] != null)
                {
                    hfOID.Value = Request.Params["OID"].ToString();
                }
             
            }
            txtSelect.Attributes.Add("readonly", "true");
        }
        protected override void VtInitOthersToolbars()
        {
            Button tsbtnSelect = new Button();
            tsbtnSelect.ID = "tsbtnSelect";
            tsbtnSelect.Text = "确定";
            tsbtnSelect.Attributes.Add("onmouseout", "this.className='btn'");
            tsbtnSelect.Attributes.Add("onmouseover", "this.className='btn_mouseover'");
            tsbtnSelect.CssClass = "btn";
            tsbtnSelect.OnClientClick = "SelectMember();return false;";
            phToolBars.Controls.Add(tsbtnSelect);
        }
        protected override void VtInitBaseToolsBars()
        {
            VtInitBaseDetailToolsBars();
        }

   
    }
}

