using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Collections;

namespace SfSoft.web.game.brainsexpert.lib
{
    public class Ranking
    {
        /// <summary>
        /// 排名数据集
        /// </summary>
        private DataSet  DSCollection { get; set; }
        /// <summary>
        /// 总排名数
        /// </summary>
        private int Amount { get; set; }

        public Ranking(string openId, int itemId,string province="",string city="",int top=20)
        {
            DataSet dsCollection = new DataSet();
            DataTable top20Dt = SfSoft.DBUtility.DbHelperSQL.Query(ReturnTop20Sql(itemId, top,province, city)).Tables[0];
            top20Dt.TableName = "top20";
            dsCollection.Tables.Add(top20Dt.Copy());
            DataTable dt = SfSoft.DBUtility.DbHelperSQL.Query(ReturnPersonneSql(openId,itemId,province,city)).Tables[0];
            dt.TableName = "top";
            dsCollection.Tables.Add(dt.Copy());
            DataTable dtSubtotal = SfSoft.DBUtility.DbHelperSQL.Query(ReturnSubtotalSql(itemId,province,city)).Tables[0];
            dtSubtotal.TableName = "subtotal";
            dsCollection.Tables.Add(dtSubtotal.Copy());
            DSCollection = dsCollection;
        }
        public Ranking(string openId, string province = "", string city = "",int top=20)
        {
            DataSet dsCollection = new DataSet();
            DataTable top20Dt = SfSoft.DBUtility.DbHelperSQL.Query(ReturnTop20Sql(top,province,city)).Tables[0];
            top20Dt.TableName = "top20";
            dsCollection.Tables.Add(top20Dt.Copy());
            DataTable dt = SfSoft.DBUtility.DbHelperSQL.Query(ReturnPersonneSql(openId,province,city)).Tables[0];
            dt.TableName = "top";
            dsCollection.Tables.Add(dt.Copy());
            DataTable dtSubtotal = SfSoft.DBUtility.DbHelperSQL.Query(ReturnSubtotalSql(province,city)).Tables[0];
            dtSubtotal.TableName = "subtotal";
            dsCollection.Tables.Add(dtSubtotal.Copy());
            DSCollection = dsCollection;
            
        }
        public string ReturnRankingJson()
        {
            return Newtonsoft.Json.JsonConvert.SerializeObject(DSCollection);
        }
       
        private string ReturnTop20Sql(int itemId,int top, string province="",string city="")
        {
            string sql = "select top "+top.ToString()+"  row_number() over( order by Score desc, UsingTime) RowIndex,a.* from (" +
                " select a.OpenId,a.Score,a.UsingTime,b.NickName,b.HeaderImgUrl,b.Province,b.City,c.GradeName from (select * from WX_TestQuestion_Item_Score where Score<=100) a" +
                " left join WX_TestQuestion_Player b on a.openId=b.ServiceOpenId" +
                " left join WX_TestQuestion_Grade c on b.Score between c.LowerLimit and c.UpperLimit" +
                " where  a.Item=" + itemId.ToString() + " and '"+province+"' in(b.Province,'') and '"+city+"' in(b.City,''))a";
            return sql;
        }
        private string ReturnTop20Sql(int top, string province="",string city="")
        {
            string sql = "select top "+top.ToString()+" row_number() over( order by Score desc, UsingTime) as RowIndex ,a.* from (" +
                " select ServiceOpenId as OpenId,Score,UsingTime,NickName,HeaderImgUrl,Province,City,b.GradeName  from WX_TestQuestion_Player a" +
                " left join WX_TestQuestion_Grade b on a.Score between b.LowerLimit and b.UpperLimit"+
                " where '"+province+"' in(a.Province,'') and '"+city+"' in(a.City,''))a";
            return sql;
        }
        private string ReturnPersonneSql(string openId, int itemId, string province = "", string city = "")
        {
            string sql = "select top 1 * from(" +
                " select row_number() over( order by Score desc, UsingTime) RowIndex,a.* from (" +
                " select a.OpenId,a.Score,a.UsingTime,b.NickName,b.HeaderImgUrl,b.Province,b.City,c.GradeName from (select * from WX_TestQuestion_Item_Score where Score<=100) a" +
                " left join WX_TestQuestion_Player b on a.openId=b.ServiceOpenId" +
                " left join WX_TestQuestion_Grade c on b.Score between c.LowerLimit and c.UpperLimit" +
                " where a.Item=" + itemId + " and '"+province+"' in(b.Province,'') and '"+city+"' in(b.City,'')" +
                " )a)a where OpenId='" + openId + "'";
            return sql;
        }
        private string ReturnPersonneSql(string openId, string province = "", string city = "")
        {
            string sql = "select top 1 * from (" +
                " select  row_number() over( order by Score desc, UsingTime) RowIndex ,a.* from (" +
                " select ServiceOpenId as OpenId,Score,UsingTime,NickName,HeaderImgUrl,Province,City,b.GradeName  from WX_TestQuestion_Player a" +
                " left join WX_TestQuestion_Grade b on a.Score between b.LowerLimit and b.UpperLimit" +
                " where '"+province+"' in(a.Province,'') and '"+city+"' in(a.City,'')"+
                " )a )a where openid='" + openId + "'";
            return sql;
        }
        private string ReturnSubtotalSql(string province = "", string city = "")
        {
            string sql = "select count(1) as Amount from WX_TestQuestion_Player where '"+province+"' in(Province,'') and '"+city+"' in(City,'')";
            return sql;
        }
        private string ReturnSubtotalSql(int itemId,string province = "", string city = "")
        {
            string sql = "select count(1) as Amount from (select * from  WX_TestQuestion_Item_Score where  Score<=100 ) a" +
                " left join WX_TestQuestion_Player b on a.OpenId=b.ServiceOpenId"+
                " where a.Item=" + itemId.ToString() + " and '" + province + "' in(b.Province,'') and '" + city + "' in(b.City,'')";
            return sql;
        }
    }
}