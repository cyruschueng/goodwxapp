using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
namespace SfSoft.SfEmc
{
    public class EbsMemberPage :EbsWebBasePage 
    {
        protected void  Page_PreInit(object sender, EventArgs e)

        {
            
            if (Session["LoginFlag"] == null || Session["LoginFlag"].ToString () =="" || Session["LoginFlag"].ToString() != "ok")
            {
                
                Response.Write("<script>document.location='../mlogin.aspx';</script>");
            }
        }
    
    }
}
