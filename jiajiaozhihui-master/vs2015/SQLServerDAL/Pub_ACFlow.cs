using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//请先添加引用
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类Pub_ACFlow。
	/// </summary>
	public class Pub_ACFlow:IPub_ACFlow
	{
		public Pub_ACFlow()
		{}
		#region  成员方法

 
		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ACID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from Pub_ACFlow");
			strSql.Append(" where ACID=@ACID ");
			SqlParameter[] parameters = {
					new SqlParameter("@ACID", SqlDbType.Int,4)};
			parameters[0].Value = ACID;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


        /// <summary>
        /// 增加一条数据
        /// </summary>
        public int Add(SfSoft.Model.Pub_ACFlow model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Pub_ACFlow(");
            strSql.Append("SelValue,SelText,FunID,MID,ConditionName,LogicName,BoxHtml,OrderID,FieldName,InputFlag,dt)");
            strSql.Append(" values (");
            strSql.Append("@SelValue,@SelText,@FunID,@MID,@ConditionName,@LogicName,@BoxHtml,@OrderID,@FieldName,@InputFlag,@dt)");
            strSql.Append(";select @@IDENTITY");
            SqlParameter[] parameters = {
					new SqlParameter("@SelValue", SqlDbType.NVarChar,100),
					new SqlParameter("@SelText", SqlDbType.NVarChar,100),
					new SqlParameter("@FunID", SqlDbType.NVarChar,100),
					new SqlParameter("@MID", SqlDbType.NVarChar,80),
					new SqlParameter("@ConditionName", SqlDbType.NVarChar,100),
					new SqlParameter("@LogicName", SqlDbType.NVarChar,3),
					new SqlParameter("@BoxHtml", SqlDbType.NVarChar,500),
					new SqlParameter("@OrderID", SqlDbType.Int,4),
					new SqlParameter("@FieldName", SqlDbType.NVarChar,20),
					new SqlParameter("@InputFlag", SqlDbType.NVarChar,25),
					new SqlParameter("@dt", SqlDbType.NVarChar,55)};
            parameters[0].Value = model.SelValue;
            parameters[1].Value = model.SelText;
            parameters[2].Value = model.FunID;
            parameters[3].Value = model.MID;
            parameters[4].Value = model.ConditionName;
            parameters[5].Value = model.LogicName;
            parameters[6].Value = model.BoxHtml;
            parameters[7].Value = model.OrderID;
            parameters[8].Value = model.FieldName;
            parameters[9].Value = model.InputFlag;
            parameters[10].Value = model.dt;

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
        public void Update(SfSoft.Model.Pub_ACFlow model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Pub_ACFlow set ");
            strSql.Append("SelValue=@SelValue,");
            strSql.Append("SelText=@SelText,");
            strSql.Append("FunID=@FunID,");
            strSql.Append("MID=@MID,");
            strSql.Append("ConditionName=@ConditionName,");
            strSql.Append("LogicName=@LogicName,");
            strSql.Append("BoxHtml=@BoxHtml,");
            strSql.Append("OrderID=@OrderID,");
            strSql.Append("FieldName=@FieldName,");
            strSql.Append("InputFlag=@InputFlag,");
            strSql.Append("dt=@dt");
            strSql.Append(" where ACID=@ACID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ACID", SqlDbType.Int,4),
					new SqlParameter("@SelValue", SqlDbType.NVarChar,100),
					new SqlParameter("@SelText", SqlDbType.NVarChar,100),
					new SqlParameter("@FunID", SqlDbType.NVarChar,100),
					new SqlParameter("@MID", SqlDbType.NVarChar,80),
					new SqlParameter("@ConditionName", SqlDbType.NVarChar,100),
					new SqlParameter("@LogicName", SqlDbType.NVarChar,3),
					new SqlParameter("@BoxHtml", SqlDbType.NVarChar,500),
					new SqlParameter("@OrderID", SqlDbType.Int,4),
					new SqlParameter("@FieldName", SqlDbType.NVarChar,20),
					new SqlParameter("@InputFlag", SqlDbType.NVarChar,25),
					new SqlParameter("@dt", SqlDbType.NVarChar,55)};
            parameters[0].Value = model.ACID;
            parameters[1].Value = model.SelValue;
            parameters[2].Value = model.SelText;
            parameters[3].Value = model.FunID;
            parameters[4].Value = model.MID;
            parameters[5].Value = model.ConditionName;
            parameters[6].Value = model.LogicName;
            parameters[7].Value = model.BoxHtml;
            parameters[8].Value = model.OrderID;
            parameters[9].Value = model.FieldName;
            parameters[10].Value = model.InputFlag;
            parameters[11].Value = model.dt;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 删除一条数据
        /// </summary>
        public void Delete(int ACID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Pub_ACFlow ");
            strSql.Append(" where ACID=@ACID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ACID", SqlDbType.Int,4)};
            parameters[0].Value = ACID;

            DbHelperSQL.ExecuteSql(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public SfSoft.Model.Pub_ACFlow GetModel(int ACID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 ACID,SelValue,SelText,FunID,MID,ConditionName,LogicName,BoxHtml,OrderID,FieldName,InputFlag,dt from Pub_ACFlow ");
            strSql.Append(" where ACID=@ACID ");
            SqlParameter[] parameters = {
					new SqlParameter("@ACID", SqlDbType.Int,4)};
            parameters[0].Value = ACID;

            SfSoft.Model.Pub_ACFlow model = new SfSoft.Model.Pub_ACFlow();
            DataSet ds = DbHelperSQL.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                if (ds.Tables[0].Rows[0]["ACID"].ToString() != "")
                {
                    model.ACID = int.Parse(ds.Tables[0].Rows[0]["ACID"].ToString());
                }
                model.SelValue = ds.Tables[0].Rows[0]["SelValue"].ToString();
                model.SelText = ds.Tables[0].Rows[0]["SelText"].ToString();
                model.FunID = ds.Tables[0].Rows[0]["FunID"].ToString();
                model.MID = ds.Tables[0].Rows[0]["MID"].ToString();
                model.ConditionName = ds.Tables[0].Rows[0]["ConditionName"].ToString();
                model.LogicName = ds.Tables[0].Rows[0]["LogicName"].ToString();
                model.BoxHtml = ds.Tables[0].Rows[0]["BoxHtml"].ToString();
                if (ds.Tables[0].Rows[0]["OrderID"].ToString() != "")
                {
                    model.OrderID = int.Parse(ds.Tables[0].Rows[0]["OrderID"].ToString());
                }
                model.FieldName = ds.Tables[0].Rows[0]["FieldName"].ToString();
                model.InputFlag = ds.Tables[0].Rows[0]["InputFlag"].ToString();
                model.dt = ds.Tables[0].Rows[0]["dt"].ToString();
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
            strSql.Append("select ACID,SelValue,SelText,FunID,MID,ConditionName,LogicName,BoxHtml,OrderID,FieldName,InputFlag,dt ");
            strSql.Append(" FROM Pub_ACFlow ");
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
			parameters[0].Value = "Pub_ACFlow";
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

