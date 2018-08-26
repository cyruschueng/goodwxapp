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

[AjaxPro.AjaxNamespace("AjaxProSample")]
public partial class AjaxPro_ReturnDataSet : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        AjaxPro.Utility.RegisterTypeForAjax(typeof(AjaxPro_ReturnDataSet));
    }


    [AjaxPro.AjaxMethod]
    public static DataSet GetProductSet()
    {
        return CreateSampleProductSet();
    }

     #region sample data

    static DataSet CreateSampleProductSet()
    {
        DataSet ds = new DataSet();
        ds.Tables.Add(CreateSampleProductData());
        return ds;
    }

    static DataTable CreateSampleProductData()
    {
        DataTable tbl = new DataTable("Products");

        tbl.Columns.Add("ProductID", typeof(int));
        tbl.Columns.Add("ProductName", typeof(string));
        tbl.Columns.Add("UnitPrice", typeof(decimal));
        tbl.Columns.Add("CategoryID", typeof(int));

        tbl.Rows.Add(1, "Chai", 18, 1);
        tbl.Rows.Add(2, "Chang", 19, 1);
        tbl.Rows.Add(3, "Aniseed Syrup", 10, 2);
        tbl.Rows.Add(4, "Chef Anton's Cajun Seasoning", 22, 2);
        tbl.Rows.Add(5, "Chef Anton's Gumbo Mix", 21.35, 2);
        tbl.Rows.Add(47, "Zaanse koeken", 9.5, 3);
        tbl.Rows.Add(48, "Chocolade", 12.75, 3);
        tbl.Rows.Add(49, "Maxilaku", 20, 3);

        return tbl;
    }

    #endregion    
}


