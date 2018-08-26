using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//请先添加引用
namespace SfSoft.SQLServerDAL
{
    /// <summary>
    /// 数据访问类Pub_Msn。
    /// </summary>
    public class Pub_Msn : IPub_Msn
    {
        public Pub_Msn()
        { }
        #region  成员方法
        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(int ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from Pub_Msn");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
            parameters[0].Value = ID;

            return DbHelperSQL.Exists(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(SfSoft.Model.Pub_Msn model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Pub_Msn(");
            strSql.Append("Msn,SendTime,UID,Name)");
            strSql.Append(" values (");
            strSql.Append("@Msn,@SendTime,@UID,@Name)");
            strSql.Append(";select @@IDENTITY");
            SqlParameter[] parameters = {
					new SqlParameter("@Msn", SqlDbType.NVarChar,500),
					new SqlParameter("@SendTime", SqlDbType.DateTime),
					new SqlParameter("@UID", SqlDbType.Int,4),
					new SqlParameter("@Name", SqlDbType.NVarChar,20)};
            parameters[0].Value = model.Msn;
            parameters[1].Value = model.SendTime;
            parameters[2].Value = model.UID;
            parameters[3].Value = model.Name;

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
        public void Update(SfSoft.Model.Pub_Msn model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Pub_Msn set ");
            strSql.Append("Msn=@Msn,");
            strSql.Append("UID=@UID,");
            strSql.Append("Name=@Name");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4),
					new SqlParameter("@Msn", SqlDbType.NVarChar,500),
					new SqlParameter("@SendTime", SqlDbType.DateTime),
					new SqlParameter("@UID", SqlDbType.Int,4),
					new SqlParameter("@Name", SqlDbType.NVarChar,20)};
            parameters[0].Value = model.ID;
            parameters[1].Value = model.Msn;
            parameters[2].Value = model.SendTime;
            parameters[3].Value = model.UID;
            parameters[4].Value = model.Name;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(int ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Pub_Msn ");
            strSql.Append(" where ID=@ID ");
                SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
                parameters[0].Value = ID;
                DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
            
            
        }


        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_Msn GetModel(int ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,Msn,SendTime,UID,Name from Pub_Msn ");
            strSql.Append(" where ID=@ID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)};
            parameters[0].Value = ID;

            SfSoft.Model.Pub_Msn model = new SfSoft.Model.Pub_Msn();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ID"].ToString() != "")
                {
                    model.ID = int.Parse(ds.Tables[0].Rows[0]["ID"].ToString());
                }
                model.Msn = ds.Tables[0].Rows[0]["Msn"].ToString();
                if (ds.Tables[0].Rows[0]["SendTime"].ToString() != "")
                {
                    model.SendTime = DateTime.Parse(ds.Tables[0].Rows[0]["SendTime"].ToString());
                }
                if (ds.Tables[0].Rows[0]["UID"].ToString() != "")
                {
                    model.UID = int.Parse(ds.Tables[0].Rows[0]["UID"].ToString());
                }
                model.Name = ds.Tables[0].Rows[0]["Name"].ToString();
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
            strSql.Append("select ID,Msn,SendTime,UID,Name ");
            strSql.Append(" FROM Pub_Msn ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
            return DbHelperSQL.Query(strSql.ToString());
        }

        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetTop1List(string strWhere)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select top 100  b.ID,b.UID,b.Name,b.Msn,b.SendTime  from Pub_Msn_Addressee as a  ");
            strSql.Append(" left join Pub_Msn as b on a.MsnID=b.ID  ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
            strSql.Append(" order by SendTime desc ");
            
            return DbHelperSQL.Query(strSql.ToString());
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
            parameters[0].Value = "Pub_Msn";
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

