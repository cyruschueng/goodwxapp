using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace SfSoft.web.Gardenia.Helper
{
    public class TestProvide
    {
        public void DoTest(string openId, decimal score, decimal timer)
        {
            BLL.wx_gardenia_test bll = new BLL.wx_gardenia_test();
            var list = bll.GetModelList("openid='" + openId + "'");
            if (list.Count > 0)
            {
                var model = list.First();
                model.score = score;
                model.timer = timer;
                bll.Update(model);

            }
            else {
                var model = new Model.wx_gardenia_test
                {
                    openid=openId,
                    score=score,
                    timer=timer
                };
                bll.Add(model);
            }
        }
        public List<dynamic> GetList()
        {
            string sql = "select row_number() OVER (order by score desc,timer asc) as sn, a.OpenId,score,timer,b.nickname,headimgurl from wx_gardenia_test a" +
                " left join dbo.WX_UserInfo b on a.openid=b.openid";
            var ds= DBUtility.DbHelperSQL.Query(sql);

            List<dynamic> list = new List<dynamic>();
            foreach (DataRow dr in ds.Tables[0].Rows) {
                var score = dr["score"].ToString();
                var timer = dr["timer"].ToString();
                var index = dr["sn"].ToString();
                list.Add(new
                {
                    index=index,
                    openid = dr.Field<string>("openid"),
                    score=score,
                    timer=timer,
                    nickName=dr.Field<string>("nickName"),
                    headImgUrl=dr.Field<string>("headimgurl")
                });
            }
            return list;
        }
    }
}