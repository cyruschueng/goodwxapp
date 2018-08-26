using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Data;
using System.Xml.Serialization;
using System.Text;

namespace SfSoft.web.Service
{
    /// <summary>
    /// ShenerWeiXin 的摘要说明
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // 若要允许使用 ASP.NET AJAX 从脚本中调用此 Web 服务，请取消对下行的注释。
    // [System.Web.Script.Services.ScriptService]
    public class ShenerWeiXin : System.Web.Services.WebService
    {
        [XmlInclude(typeof(Model.WX_MessageReply))]
        [WebMethod]
        public List<Model.WX_MessageReply> GetMessageReplyDataSet(int Top, string strWhere, string filedOrder)
        {
            BLL.WX_MessageReply bll = new BLL.WX_MessageReply();
            return bll.GetModelList(Top, strWhere, filedOrder);
        }
        
        [WebMethod]
        public string  GetMessageReplyJson(int Top, string strWhere, string filedOrder)
        {
            string result = "{}";
            BLL.WX_MessageReply bll = new BLL.WX_MessageReply();
            DataSet ds = bll.GetList(Top, strWhere, filedOrder);
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                result = SfSoft.SfEmc.FormatToJson.ToJson(ds);
            }
            return result;
        }

        [WebMethod]
        public string PagingMessageReply(int pageSize, int pageIndex, string strWhere)
        {
            string result = "{}";
            StringBuilder sb = new StringBuilder();
            sb.Append("select top "+pageSize+ " * from (");
            sb.Append("select row_number() over(order by id desc ) as RowNumber,* from dbo.WX_MessageReply where "+strWhere);
            sb.Append(")a");
            sb.Append(" where RowNumber > " + (pageIndex - 1) * pageSize);

            DataSet ds = SfSoft.DBUtility.DbHelperSQL.Query(sb.ToString());
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0) {
                result = SfSoft.SfEmc.FormatToJson.ToJson(ds);
            }
            return result;
        }
    }
}
