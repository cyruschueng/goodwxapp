using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace SfSoft.web.Gxdr.Helper
{
    public class QuestionGradeProvide
    {
        private string OpenId = "";
        private int ActiveId = 0;
        public QuestionGradeProvide(string openId, int activeId)
        {
            this.OpenId = openId;
            this.ActiveId = activeId;
        }
        public string GetGradeStatus(int newscore)
        {
            BLL.WX_TestQuestion_Item_Score bll = new BLL.WX_TestQuestion_Item_Score();
            Model.WX_TestQuestion_Item_Score model = bll.GetModel(OpenId, ActiveId);
            string result = "";
            if (model != null)
            {
                result=GetGradeInfo(newscore, model.Score ?? 0);
            }
            else {
                result=GetGradeInfo(newscore, 0);
            }
            return result;
        }
        /// <summary>
        /// 是否升级
        /// </summary>
        /// <returns></returns>
        private  string GetGradeInfo(int newscore, int totalscore)
        {
            int grade = 0;
            int newgrade = 0;
            BLL.WX_TestQuestion_Grade bll = new BLL.WX_TestQuestion_Grade();
            DataSet ds = bll.GetList(1, totalscore + " between LowerLimit and UpperLimit", "id");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                grade = int.Parse(ds.Tables[0].Rows[0]["Grade"].ToString());
            }
            ds = bll.GetList(1, totalscore + newscore + " between LowerLimit and UpperLimit", "id");
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                newgrade = int.Parse(ds.Tables[0].Rows[0]["Grade"].ToString());
            }
            if (newgrade > grade)
            {
                return "true";
            }
            else
            {
                return "false";
            }
        }
    }
}