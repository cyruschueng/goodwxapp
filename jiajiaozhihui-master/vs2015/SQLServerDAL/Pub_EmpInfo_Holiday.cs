using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//请先添加引用
namespace SfSoft.SQLServerDAL
{
    /// <summary>
    /// 数据访问类Pub_EmpInfo_Holiday。
    /// </summary>
    public class Pub_EmpInfo_Holiday : IPub_EmpInfo_Holiday
    {
        public Pub_EmpInfo_Holiday()
        { }
        #region  成员方法
        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(int ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from Pub_EmpInfo_Holiday");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
            parameters[0].Value = ID;

            return DbHelperSQL.Exists(strSql.ToString(), parameters);
        }



        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(SfSoft.Model.Pub_EmpInfo_Holiday model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Pub_EmpInfo_Holiday(");
            strSql.Append("UID,ItemNo,Days,Hours,Years,ItemName)");
            strSql.Append(" values (");
            strSql.Append("@UID,@ItemNo,@Days,@Hours,@Years,@ItemName)");
            strSql.Append(";select @@IDENTITY");
            SqlParameter[] parameters = {
					new SqlParameter("@UID", SqlDbType.Int,4),
					new SqlParameter("@ItemNo", SqlDbType.NVarChar,20),
					new SqlParameter("@Days", SqlDbType.Float,8),
					new SqlParameter("@Hours", SqlDbType.Float,8),
					new SqlParameter("@Years", SqlDbType.Int,4),
					new SqlParameter("@ItemName", SqlDbType.NVarChar,20)};
            parameters[0].Value = model.UID;
            parameters[1].Value = model.ItemNo;
            parameters[2].Value = model.Days;
            parameters[3].Value = model.Hours;
            parameters[4].Value = model.Years;
            parameters[5].Value = model.ItemName;

            object obj = DbHelperSQL.GetSingle(strSql.ToString(), parameters);
            if (obj == null)
            {
                return 1;
            }
            else
            {
                return Convert.ToInt32(obj);
            }
        }
        /// <summary>
        /// 更新一条数据
        /// </summary>
        public void Update(SfSoft.Model.Pub_EmpInfo_Holiday model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Pub_EmpInfo_Holiday set ");
            strSql.Append("UID=@UID,");
            strSql.Append("ItemNo=@ItemNo,");
            strSql.Append("Days=@Days,");
            strSql.Append("Hours=@Hours,");
            strSql.Append("Years=@Years,");
            strSql.Append("ItemName=@ItemName");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4),
					new SqlParameter("@UID", SqlDbType.Int,4),
					new SqlParameter("@ItemNo", SqlDbType.NVarChar,20),
					new SqlParameter("@Days", SqlDbType.Float,8),
					new SqlParameter("@Hours", SqlDbType.Float,8),
					new SqlParameter("@Years", SqlDbType.Int,4),
					new SqlParameter("@ItemName", SqlDbType.NVarChar,20)};
            parameters[0].Value = model.ID;
            parameters[1].Value = model.UID;
            parameters[2].Value = model.ItemNo;
            parameters[3].Value = model.Days;
            parameters[4].Value = model.Hours;
            parameters[5].Value = model.Years;
            parameters[6].Value = model.ItemName;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }
 


        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_EmpInfo_Holiday GetModel(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 ID,UID,ItemNo,Days,Hours,Years,ItemName from Pub_EmpInfo_Holiday ");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
            parameters[0].Value = ID;

            SfSoft.Model.Pub_EmpInfo_Holiday model = new SfSoft.Model.Pub_EmpInfo_Holiday();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ID"].ToString() != "")
                {
                    model.ID = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
                }
                if (ds.Tables[0].Rows[0]["UID"].ToString() != "")
                {
                    model.UID = int.Parse(ds.Tables[0].Rows[0]["UID"].ToString());
                }
                model.ItemNo = ds.Tables[0].Rows[0]["ItemNo"].ToString();
                if (ds.Tables[0].Rows[0]["Days"].ToString() != "")
                {
                    model.Days = decimal.Parse(ds.Tables[0].Rows[0]["Days"].ToString());
                }
                if (ds.Tables[0].Rows[0]["Hours"].ToString() != "")
                {
                    model.Hours = decimal.Parse(ds.Tables[0].Rows[0]["Hours"].ToString());
                }
                if (ds.Tables[0].Rows[0]["Years"].ToString() != "")
                {
                    model.Years = int.Parse(ds.Tables[0].Rows[0]["Years"].ToString());
                }
                model.ItemName = ds.Tables[0].Rows[0]["ItemName"].ToString();
                return model;
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetList(string strWhere)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,UID,ItemNo,Days,Hours,Years,ItemName ");
            strSql.Append(" FROM Pub_EmpInfo_Holiday ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
            return DbHelperSQL.Query(strSql.ToString());
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(int UID, int Years)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Pub_EmpInfo_Holiday ");
            strSql.Append(" where UID=@UID and Years=@Years ");
            SqlParameter[] parameters = {
					new SqlParameter("@UID", SqlDbType.Int,4),
                    new SqlParameter("@Years", SqlDbType.Int,4)
            };
            parameters[0].Value = UID;
            parameters[1].Value = Years;
            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }

        /*
        /// <summary>
        /// 分页获取数据列表
        /// </summary>
        public DataSet GetList(int PageSize,int PageIndex,string strWhere)
        {
            SqlParameter[] parameters = {
                    new SqlParameter("@tblName", SqlDbType.VarChar, 255),
                    new SqlParameter("@fldName", SqlDbType.VarChar, 255),
                    new SqlParameter("@PageSize", SqlDbType.Int),
                    new SqlParameter("@PageIndex", SqlDbType.Int),
                    new SqlParameter("@IsReCount", SqlDbType.Bit),
                    new SqlParameter("@OrderType", SqlDbType.Bit),
                    new SqlParameter("@strWhere", SqlDbType.VarChar,1000),
                    };
            parameters[0].Value = "Pub_EmpInfo_Holiday";
            parameters[1].Value = "ID";
            parameters[2].Value = PageSize;
            parameters[3].Value = PageIndex;
            parameters[4].Value = 0;
            parameters[5].Value = 0;
            parameters[6].Value = strWhere;	
            return DbHelperSQL.RunProcedure("UP_GetRecordByPage",parameters,"ds");
        }*/

        #endregion  成员方法
    }
}

