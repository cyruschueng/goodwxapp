using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace SfSoft.web.WxOpen.Provide.Habit
{
    public class Rank
    {
        public object GetRank(int habitId)
        {
            var sql = "select row,b.nickName,b.headImgUrl,a.finish from (" +
                "select row_number() over(order by finish  desc) as row, * from dbo.wx_habit_my where habit_id="+habitId+" )a " +
                "left join wx_userinfo b on a.openid=b.openid";

            var ds= SfSoft.DBUtility.DbHelperSQL.Query(sql);
            List<dynamic> list = new List<dynamic>();
            List<dynamic> top3 = new List<dynamic>();
            List<dynamic> top = new List<dynamic>();

            foreach (DataRow dr in ds.Tables[0].Rows) {
                var row = dr.Field<Int64>("row");
                var m = new
                {
                    row = row,
                    nickName = dr.Field<string>("nickName"),
                    headImgUrl = dr.Field<string>("headImgUrl"),
                    finish = dr.Field<int>("finish")
                };

                if (row < 4) {
                    top3.Add(m);
                } else {
                    top.Add(m);
                }
            }
            return new {
                top3=top3,
                top=top
            };
        }
    }
}