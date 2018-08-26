using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace SfSoft.web.Microlecture.Provide
{
    public class LearnRecorderProvide
    {
        public bool IsLearn(int courseId)
        {
            BLL.wx_gardenia_learn_recoder bll = new BLL.wx_gardenia_learn_recoder();
            return bll.Exists(courseId);
        }

        public void AddLearnRecorder(int courseId, string learner)
        {
            if (IsLearn(courseId) == false)
            {
                var data = new Model.wx_gardenia_learn_recoder
                {
                    course_id = courseId,
                    learen_date = DateTime.Now,
                    learner = learner
                };
                BLL.wx_gardenia_learn_recoder bll = new BLL.wx_gardenia_learn_recoder();
                bll.Add(data);
                UpdateLearnQuantity(learner);
            }
        }
        public dynamic GetLearnRecordRank(string classNo)
        {
            var sql = "SELECT ROW_NUMBER() OVER (ORDER BY learn_quantity desc) AS RowNumber,* FROM ( " +
                "select b.NickName,b.HeadImgUrl,a.learn_quantity,a.class_no,a.class_name,a.class_type from wx_gardenia_user a  " +
                "left join WX_UserInfo b on a.openid=b.OpenId where a.class_no='" + classNo + "' " +
                ")a ";
            var ds = DBUtility.DbHelperSQL.Query(sql);
            List<dynamic> list = new List<dynamic>();
            if (ds != null && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    list.Add(new
                    {
                        index =Convert.ToInt64(dr["RowNumber"]),
                        headImgUrl=dr.Field<string>("HeadImgUrl"),
                        nickName=dr.Field<string>("NickName"),
                        classNo=dr.Field<string>("class_no"),
                        classType=dr.Field<string>("class_type"),
                        learnQuantity=dr.Field<int>("learn_quantity")
                    });
                }
            }
            return list;
        }

        private void UpdateLearnQuantity(string learner)
        {
            BLL.wx_gardenia_user bll = new BLL.wx_gardenia_user();
            var list = bll.GetModelList("openid='" + learner + "'");
            if (list.Count > 0)
            {
                var model = list.First();
                model.learn_quantity = (model.learn_quantity ?? 0) + 1;
                bll.Update(model);
            }
        }
    }
}