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
    public partial class reginfo : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                EMCLOGO.InnerHtml = "神尔EMC-企业协同办公管理系统";
            }
        }
    }
}

