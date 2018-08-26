using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//请先添加引用
namespace SfSoft.SQLServerDAL
{
    /// <summary>
    /// 数据访问类Pub_Modules_Fun。


    /// </summary>
    public class Pub_Modules_Fun : IPub_Modules_Fun
    {
        public Pub_Modules_Fun()
        { }
        #region  成员方法

        /// <summary>
        /// 得到一个对象实体


        /// </summary>
        public SfSoft.Model.Pub_Modules_Fun GetModel(string FunType, string MPath)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ModulesID,FunID,FunName,FunType,MPath,OrderID,IsAcl,Icon from Pub_Modules_Fun ");
            strSql.Append(" where FunType=@FunType and MPath=@MPath ");
            SqlParameter[] parameters = {
					new SqlParameter("@FunType", SqlDbType.NVarChar,50),
					new SqlParameter("@MPath", SqlDbType.NVarChar,50),
                };
            parameters[3].Value = FunType;
            parameters[4].Value = MPath;

            SfSoft.Model.Pub_Modules_Fun model = new SfSoft.Model.Pub_Modules_Fun();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                model.ModulesID = ds.Tables[0].Rows[0]["ModulesID"].ToString();
                model.FunID = ds.Tables[0].Rows[0]["FunID"].ToString();
                model.FunName = ds.Tables[0].Rows[0]["FunName"].ToString();
                model.FunType = ds.Tables[0].Rows[0]["FunType"].ToString();
                model.MPath = ds.Tables[0].Rows[0]["MPath"].ToString();
                model.Icon = ds.Tables[0].Rows[0]["Icon"].ToString();
                if (ds.Tables[0].Rows[0]["OrderID"].ToString() != "")
                {
                    model.OrderID = int.Parse(ds.Tables[0].Rows[0]["OrderID"].ToString());
                }
                if (ds.Tables[0].Rows[0]["IsAcl"].ToString() != "")
                {
                    model.IsAcl = int.Parse(ds.Tables[0].Rows[0]["IsAcl"].ToString());
                }
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
            strSql.Append("select ModulesID,FunID,FunName,FunType,MPath,OrderID,IsAcl,Icon ");
            strSql.Append(" FROM Pub_Modules_Fun ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
            return DbHelperSQL.Query(strSql.ToString());
        }

        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetListByFunTypeAndMPath(string funType, string mPath)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ModulesID,FunID,FunName,FunType,MPath,OrderID,IsAcl,Icon ");
            strSql.Append(" FROM Pub_Modules_Fun where isAct='1' ");
            if (funType.Trim() != "" && mPath.Trim() != "")
            {
                strSql.Append(" and FunType = '" + funType + "' and MPath= '" + mPath + "'");
            }
            return DbHelperSQL.Query(strSql.ToString());
        }
        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetListByFunTypeAndModulesID(string funType, string ModulesID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ModulesID,FunID,FunName,FunType,MPath,OrderID,IsAcl,Icon ");
            strSql.Append(" FROM Pub_Modules_Fun where isAct='1' ");
            if (funType.Trim() != "" && ModulesID.Trim() != "")
            {
                strSql.Append(" and FunType = '" + funType + "' and ModulesID= '" + ModulesID + "'");
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
            parameters[0].Value = "Pub_Modules_Fun";
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

