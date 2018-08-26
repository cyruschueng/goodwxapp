using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//请先添加引用
namespace SfSoft.SQLServerDAL
{
    /// <summary>
    /// 数据访问类Pub_Data_Assign。
    /// </summary>
    public class Pub_Data_Assign : IPub_Data_Assign
    {
        public Pub_Data_Assign()
        { }
        #region  成员方法
        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(int AsID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from Pub_Data_Assign");
            strSql.Append(" where AsID=@AsID ");
            SqlParameter[] parameters = {
					new SqlParameter("@AsID", SqlDbType.Int,4)};
            parameters[0].Value = AsID;

            return DbHelperSQL.Exists(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(SfSoft.Model.Pub_Data_Assign model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Pub_Data_Assign(");
            strSql.Append("ModulesID,DataID,AssignType,AssignID,AssignName)");
            strSql.Append(" values (");
            strSql.Append("@ModulesID,@DataID,@AssignType,@AssignID,@AssignName)");
            strSql.Append(";select @@IDENTITY");
            SqlParameter[] parameters = {
					new SqlParameter("@ModulesID", SqlDbType.NVarChar,50),
					new SqlParameter("@DataID", SqlDbType.Int,4),
					new SqlParameter("@AssignType", SqlDbType.NVarChar,10),
					new SqlParameter("@AssignID", SqlDbType.Int,4),
					new SqlParameter("@AssignName", SqlDbType.NVarChar,150)};
            parameters[0].Value = model.ModulesID;
            parameters[1].Value = model.DataID;
            parameters[2].Value = model.AssignType;
            parameters[3].Value = model.AssignID;
            parameters[4].Value = model.AssignName;

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
        public void Update(SfSoft.Model.Pub_Data_Assign model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Pub_Data_Assign set ");
            strSql.Append("ModulesID=@ModulesID,");
            strSql.Append("DataID=@DataID,");
            strSql.Append("AssignType=@AssignType,");
            strSql.Append("AssignID=@AssignID,");
            strSql.Append("AssignName=@AssignName");
            strSql.Append(" where AsID=@AsID ");
            SqlParameter[] parameters = {
					new SqlParameter("@AsID", SqlDbType.Int,4),
					new SqlParameter("@ModulesID", SqlDbType.NVarChar,50),
					new SqlParameter("@DataID", SqlDbType.Int,4),
					new SqlParameter("@AssignType", SqlDbType.NVarChar,10),
					new SqlParameter("@AssignID", SqlDbType.Int,4),
					new SqlParameter("@AssignName", SqlDbType.NVarChar,150)};
            parameters[0].Value = model.AsID;
            parameters[1].Value = model.ModulesID;
            parameters[2].Value = model.DataID;
            parameters[3].Value = model.AssignType;
            parameters[4].Value = model.AssignID;
            parameters[5].Value = model.AssignName;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(int AsID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Pub_Data_Assign ");
            strSql.Append(" where AsID=@AsID ");
            SqlParameter[] parameters = {
					new SqlParameter("@AsID", SqlDbType.Int,4)};
            parameters[0].Value = AsID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(int DocID, string ModulesID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Pub_Data_Assign ");
            strSql.Append(" where DataID=@DataID and ModulesID=@ModulesID ");
            SqlParameter[] parameters = {
					new SqlParameter("@DataID", SqlDbType.Int,4),
                    new SqlParameter("@ModulesID", SqlDbType.NVarChar ,80)
            };
            parameters[0].Value = DocID;
            parameters[1].Value = ModulesID;
            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }
        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_Data_Assign GetModel(int AsID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 AsID,ModulesID,DataID,AssignType,AssignID,AssignName from Pub_Data_Assign ");
            strSql.Append(" where AsID=@AsID ");
            SqlParameter[] parameters = {
					new SqlParameter("@AsID", SqlDbType.Int,4)};
            parameters[0].Value = AsID;

            SfSoft.Model.Pub_Data_Assign model = new SfSoft.Model.Pub_Data_Assign();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["AsID"].ToString() != "")
                {
                    model.AsID = int.Parse(ds.Tables[0].Rows[0]["AsID"].ToString());
                }
                model.ModulesID = ds.Tables[0].Rows[0]["ModulesID"].ToString();
                if (ds.Tables[0].Rows[0]["DataID"].ToString() != "")
                {
                    model.DataID = int.Parse(ds.Tables[0].Rows[0]["DataID"].ToString());
                }
                model.AssignType = ds.Tables[0].Rows[0]["AssignType"].ToString();
                if (ds.Tables[0].Rows[0]["AssignID"].ToString() != "")
                {
                    model.AssignID = int.Parse(ds.Tables[0].Rows[0]["AssignID"].ToString());
                }
                model.AssignName = ds.Tables[0].Rows[0]["AssignName"].ToString();
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
            strSql.Append("select AsID,ModulesID,DataID,AssignType,AssignID,AssignName ");
            strSql.Append(" FROM Pub_Data_Assign ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
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
            parameters[0].Value = "Pub_Data_Assign";
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

