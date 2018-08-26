using System;
using System.Data;
using System.Text;
using System.Data.SqlClient;
using SfSoft.IDAL;
using SfSoft.DBUtility;//Please add references
namespace SfSoft.SQLServerDAL
{
	/// <summary>
	/// 数据访问类:WX_PublicGood
	/// </summary>
	public partial class WX_PublicGood:IWX_PublicGood
	{
		public WX_PublicGood()
		{}
		#region  BasicMethod

		/// <summary>
		/// 得到最大ID
		/// </summary>
		public int GetMaxId()
		{
		return DbHelperSQL.GetMaxID("ID", "WX_PublicGood"); 
		}

		/// <summary>
		/// 是否存在该记录
		/// </summary>
		public bool Exists(int ID)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) from WX_PublicGood");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			return DbHelperSQL.Exists(strSql.ToString(),parameters);
		}


		/// <summary>
		/// 增加一条数据
		/// </summary>
		public int Add(SfSoft.Model.WX_PublicGood model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("insert into WX_PublicGood(");
            strSql.Append("GoodNo,GoodName,MarketPrice,PublicPrice,Number,[Desc],CreateDate,Creator,BuyNumber,InfoDesc,ValidityDate,Score,GoodsType,ImgURL,IsAct,OrderBy,StartDate,EndDate,Discount,Depreciate,GoodsLink,Exchange,GoodClass,IsRecommend,IsOnlinePayment,IsRosebery)");
			strSql.Append(" values (");
            strSql.Append("@GoodNo,@GoodName,@MarketPrice,@PublicPrice,@Number,@Desc,@CreateDate,@Creator,@BuyNumber,@InfoDesc,@ValidityDate,@Score,@GoodsType,@ImgURL,@IsAct,@OrderBy,@StartDate,@EndDate,@Discount,@Depreciate,@GoodsLink,@Exchange,@GoodClass,@IsRecommend,@IsOnlinePayment,@IsRosebery)");
			strSql.Append(";select @@IDENTITY");
			SqlParameter[] parameters = {
					new SqlParameter("@GoodNo", SqlDbType.NVarChar,50),
					new SqlParameter("@GoodName", SqlDbType.VarChar,200),
					new SqlParameter("@MarketPrice", SqlDbType.Float,8),
					new SqlParameter("@PublicPrice", SqlDbType.Float,8),
					new SqlParameter("@Number", SqlDbType.Int,4),
					new SqlParameter("@Desc", SqlDbType.NText),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@Creator", SqlDbType.NVarChar,50),
                    new SqlParameter("@BuyNumber", SqlDbType.Int,4),
                    new SqlParameter("@InfoDesc", SqlDbType.NVarChar,4000),
                    new SqlParameter("@ValidityDate", SqlDbType.DateTime),
                    new SqlParameter("@Score", SqlDbType.Int,4),
                    new SqlParameter("@GoodsType", SqlDbType.Int,4),
                    new SqlParameter("@ImgURL", SqlDbType.NVarChar,100),
                    new SqlParameter("@IsAct", SqlDbType.Int,4),
                    new SqlParameter("@OrderBy", SqlDbType.Int,4),
                    new SqlParameter("@StartDate", SqlDbType.DateTime),
                    new SqlParameter("@EndDate", SqlDbType.DateTime),
                    new SqlParameter("@Discount", SqlDbType.Decimal,9),
                    new SqlParameter("@Depreciate", SqlDbType.Decimal,9),
                    new SqlParameter("@GoodsLink", SqlDbType.NVarChar,1000),
                    new SqlParameter("@Exchange", SqlDbType.NVarChar,100),
                    new SqlParameter("@GoodClass", SqlDbType.Int,4),
                    new SqlParameter("@IsRecommend", SqlDbType.Int,4),
                    new SqlParameter("@IsOnlinePayment", SqlDbType.Int,4),
                    new SqlParameter("@IsRosebery", SqlDbType.Int,4)};
			parameters[0].Value = model.GoodNo;
			parameters[1].Value = model.GoodName;
			parameters[2].Value = model.MarketPrice;
			parameters[3].Value = model.PublicPrice;
			parameters[4].Value = model.Number;
			parameters[5].Value = model.Desc;
			parameters[6].Value = model.CreateDate;
			parameters[7].Value = model.Creator;
            parameters[8].Value = model.BuyNumber;
            parameters[9].Value = model.InfoDesc;
            parameters[10].Value = model.ValidityDate;
            parameters[11].Value = model.Score;
            parameters[12].Value = model.GoodsType;
            parameters[13].Value = model.ImgURL;
            parameters[14].Value = model.IsAct;
            parameters[15].Value = model.OrderBy;
            parameters[16].Value = model.StartDate;
            parameters[17].Value = model.EndDate;
            parameters[18].Value = model.Discount;
            parameters[19].Value = model.Depreciate;
            parameters[20].Value = model.GoodsLink;
            parameters[21].Value = model.Exchange;
            parameters[22].Value = model.GoodClass;
            parameters[23].Value = model.IsRecommend;
            parameters[24].Value = model.IsOnlinePayment;
            parameters[25].Value = model.IsRosebery;
			object obj = DbHelperSQL.GetSingle(strSql.ToString(),parameters);
			if (obj == null)
			{
				return 0;
			}
			else
			{
				return Convert.ToInt32(obj);
			}
		}
		/// <summary>
		/// 更新一条数据
		/// </summary>
		public bool Update(SfSoft.Model.WX_PublicGood model)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("update WX_PublicGood set ");
			strSql.Append("GoodNo=@GoodNo,");
			strSql.Append("GoodName=@GoodName,");
			strSql.Append("MarketPrice=@MarketPrice,");
			strSql.Append("PublicPrice=@PublicPrice,");
			strSql.Append("Number=@Number,");
			strSql.Append("[Desc]=@Desc,");
			strSql.Append("CreateDate=@CreateDate,");
			strSql.Append("Creator=@Creator,");
            strSql.Append("BuyNumber=@BuyNumber,");
            strSql.Append("InfoDesc=@InfoDesc,");
            strSql.Append("ValidityDate=@ValidityDate,");
            strSql.Append("Score=@Score,");
            strSql.Append("GoodsType=@GoodsType,");
            strSql.Append("ImgURL=@ImgURL,");
            strSql.Append("IsAct=@IsAct,");
            strSql.Append("OrderBy=@OrderBy,");
            strSql.Append("StartDate=@StartDate,");
            strSql.Append("EndDate=@EndDate,");
            strSql.Append("Discount=@Discount,");
            strSql.Append("Depreciate=@Depreciate,");
            strSql.Append("GoodsLink=@GoodsLink,");
            strSql.Append("Exchange=@Exchange,");
            strSql.Append("GoodClass=@GoodClass,");
            strSql.Append("IsRecommend=@IsRecommend,");
            strSql.Append("IsOnlinePayment=@IsOnlinePayment,");
            strSql.Append("IsRosebery=@IsRosebery");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@GoodNo", SqlDbType.NVarChar,50),
					new SqlParameter("@GoodName", SqlDbType.VarChar,200),
					new SqlParameter("@MarketPrice", SqlDbType.Float,8),
					new SqlParameter("@PublicPrice", SqlDbType.Float,8),
					new SqlParameter("@Number", SqlDbType.Int,4),
					new SqlParameter("@Desc", SqlDbType.NText),
					new SqlParameter("@CreateDate", SqlDbType.DateTime),
					new SqlParameter("@Creator", SqlDbType.NVarChar,50),
                    new SqlParameter("@BuyNumber", SqlDbType.Int,4),
                    new SqlParameter("@InfoDesc", SqlDbType.NVarChar,4000),
                    new SqlParameter("@ValidityDate", SqlDbType.DateTime),
                    new SqlParameter("@Score", SqlDbType.Int,4),
                    new SqlParameter("@GoodsType", SqlDbType.Int,4),
                    new SqlParameter("@ImgURL", SqlDbType.NVarChar,100),
                    new SqlParameter("@IsAct", SqlDbType.Int,4),
                    new SqlParameter("@OrderBy", SqlDbType.Int,4),
					new SqlParameter("@StartDate", SqlDbType.DateTime),
					new SqlParameter("@EndDate", SqlDbType.DateTime),
					new SqlParameter("@Discount", SqlDbType.Decimal,9),
					new SqlParameter("@Depreciate", SqlDbType.Decimal,9),
                    new SqlParameter("@GoodsLink", SqlDbType.NVarChar,1000),
                    new SqlParameter("@Exchange", SqlDbType.NVarChar,100),
                    new SqlParameter("@GoodClass", SqlDbType.Int,4),
                    new SqlParameter("@IsRecommend", SqlDbType.Int,4),
                    new SqlParameter("@IsOnlinePayment", SqlDbType.Int,4),
                    new SqlParameter("@IsRosebery", SqlDbType.Int,4),
					new SqlParameter("@ID", SqlDbType.Int,4)};
			parameters[0].Value = model.GoodNo;
			parameters[1].Value = model.GoodName;
			parameters[2].Value = model.MarketPrice;
			parameters[3].Value = model.PublicPrice;
			parameters[4].Value = model.Number;
			parameters[5].Value = model.Desc;
			parameters[6].Value = model.CreateDate;
			parameters[7].Value = model.Creator;
            parameters[8].Value = model.BuyNumber;
            parameters[9].Value = model.InfoDesc;
            parameters[10].Value = model.ValidityDate;
            parameters[11].Value = model.Score;
            parameters[12].Value = model.GoodsType;
            parameters[13].Value = model.ImgURL;
            parameters[14].Value = model.IsAct;
            parameters[15].Value = model.OrderBy;
            parameters[16].Value = model.StartDate;
            parameters[17].Value = model.EndDate;
            parameters[18].Value = model.Discount;
            parameters[19].Value = model.Depreciate;
            parameters[20].Value = model.GoodsLink;
            parameters[21].Value = model.Exchange;
            parameters[22].Value = model.GoodClass;
            parameters[23].Value = model.IsRecommend;
            parameters[24].Value = model.IsOnlinePayment;
            parameters[25].Value = model.IsRosebery;
			parameters[26].Value = model.ID;

			int rows=DbHelperSQL.ExecuteSql(strSql.ToString(),parameters);
			if (rows > 0)
			{
				return true;
			}
			else
			{
				return false;
			}
		}

		/// <summary>
		/// 删除一条数据
		/// </summary>
		public bool Delete(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_PublicGood ");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			int rows=DbHelperSQL.ExecuteSql(strSql.ToString(),parameters);
			if (rows > 0)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		/// <summary>
		/// 批量删除数据
		/// </summary>
		public bool DeleteList(string IDlist )
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("delete from WX_PublicGood ");
			strSql.Append(" where ID in ("+IDlist + ")  ");
			int rows=DbHelperSQL.ExecuteSql(strSql.ToString());
			if (rows > 0)
			{
				return true;
			}
			else
			{
				return false;
			}
		}


		/// <summary>
		/// 得到一个对象实体
		/// </summary>
		public SfSoft.Model.WX_PublicGood GetModel(int ID)
		{
			
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select  top 1 ID,GoodNo,GoodName,MarketPrice,PublicPrice,Number,[Desc],CreateDate,Creator,BuyNumber,InfoDesc,ValidityDate,Score,GoodsType,ImgURL,IsAct,OrderBy,StartDate,EndDate,Discount,Depreciate,GoodsLink,Exchange,GoodClass,IsRecommend,IsOnlinePayment,IsRosebery from WX_PublicGood ");
			strSql.Append(" where ID=@ID");
			SqlParameter[] parameters = {
					new SqlParameter("@ID", SqlDbType.Int,4)
			};
			parameters[0].Value = ID;

			SfSoft.Model.WX_PublicGood model=new SfSoft.Model.WX_PublicGood();
			DataSet ds=DbHelperSQL.Query(strSql.ToString(),parameters);
			if(ds.Tables[0].Rows.Count>0)
			{
				return DataRowToModel(ds.Tables[0].Rows[0]);
			}
			else
			{
				return null;
			}
		}


		/// <summary>
		/// 得到一个对象实体
		/// </summary>
		public SfSoft.Model.WX_PublicGood DataRowToModel(DataRow row)
		{
			SfSoft.Model.WX_PublicGood model=new SfSoft.Model.WX_PublicGood();
			if (row != null)
			{
				if(row["ID"]!=null && row["ID"].ToString()!="")
				{
					model.ID=int.Parse(row["ID"].ToString());
				}
				if(row["GoodNo"]!=null)
				{
					model.GoodNo=row["GoodNo"].ToString();
				}
				if(row["GoodName"]!=null)
				{
					model.GoodName=row["GoodName"].ToString();
				}
				if(row["MarketPrice"]!=null && row["MarketPrice"].ToString()!="")
				{
					model.MarketPrice=decimal.Parse(row["MarketPrice"].ToString());
				}
				if(row["PublicPrice"]!=null && row["PublicPrice"].ToString()!="")
				{
					model.PublicPrice=decimal.Parse(row["PublicPrice"].ToString());
				}
				if(row["Number"]!=null && row["Number"].ToString()!="")
				{
					model.Number=int.Parse(row["Number"].ToString());
				}
				if(row["Desc"]!=null)
				{
					model.Desc=row["Desc"].ToString();
				}
				if(row["CreateDate"]!=null && row["CreateDate"].ToString()!="")
				{
					model.CreateDate=DateTime.Parse(row["CreateDate"].ToString());
				}
				if(row["Creator"]!=null)
				{
					model.Creator=row["Creator"].ToString();
				}
                if (row["BuyNumber"] != null && row["BuyNumber"].ToString() != "")
                {
                    model.BuyNumber = int.Parse(row["BuyNumber"].ToString());
                }

                if (row["InfoDesc"] != null)
                {
                    model.InfoDesc = row["InfoDesc"].ToString();
                }
                if (row["ValidityDate"] != null && row["ValidityDate"].ToString() != "")
                {
                    model.ValidityDate = DateTime.Parse(row["ValidityDate"].ToString());
                }
                if (row["Score"] != null && row["Score"].ToString() != "")
                {
                    model.Score = int.Parse(row["Score"].ToString());
                }
                if (row["GoodsType"] != null && row["GoodsType"].ToString() != "")
                {
                    model.GoodsType = int.Parse(row["GoodsType"].ToString());
                }
                if (row["ImgURL"] != null)
                {
                    model.ImgURL = row["ImgURL"].ToString();
                }
                if (row["IsAct"] != null && row["IsAct"].ToString() != "")
                {
                    model.IsAct = int.Parse(row["IsAct"].ToString());
                }
                if (row["OrderBy"] != null && row["OrderBy"].ToString() != "")
                {
                    model.OrderBy = int.Parse(row["OrderBy"].ToString());
                }
                if (row["StartDate"] != null && row["StartDate"].ToString() != "")
                {
                    model.StartDate = DateTime.Parse(row["StartDate"].ToString());
                }
                if (row["EndDate"] != null && row["EndDate"].ToString() != "")
                {
                    model.EndDate = DateTime.Parse(row["EndDate"].ToString());
                }
                if (row["Discount"] != null && row["Discount"].ToString() != "")
                {
                    model.Discount = decimal.Parse(row["Discount"].ToString());
                }
                if (row["Depreciate"] != null && row["Depreciate"].ToString() != "")
                {
                    model.Depreciate = decimal.Parse(row["Depreciate"].ToString());
                }
                if (row["GoodsLink"] != null)
                {
                    model.GoodsLink = row["GoodsLink"].ToString();
                }
                if (row["Exchange"] != null)
                {
                    model.Exchange = row["Exchange"].ToString();
                }
                if (row["GoodClass"] != null && row["GoodClass"].ToString() != "")
                {
                    model.GoodClass = int.Parse(row["GoodClass"].ToString());
                }

                if (row["IsRecommend"] != null && row["IsRecommend"].ToString() != "")
                {
                    model.IsRecommend = int.Parse(row["IsRecommend"].ToString());
                }
                if (row["IsOnlinePayment"] != null && row["IsOnlinePayment"].ToString() != "")
                {
                    model.IsOnlinePayment = int.Parse(row["IsOnlinePayment"].ToString());
                }
                if (row["IsRosebery"] != null && row["IsRosebery"].ToString() != "")
                {
                    model.IsRosebery = int.Parse(row["IsRosebery"].ToString());
                }
			}
			return model;
		}

		/// <summary>
		/// 获得数据列表
		/// </summary>
		public DataSet GetList(string strWhere)
		{
			StringBuilder strSql=new StringBuilder();
            strSql.Append("select ID,GoodNo,GoodName,MarketPrice,PublicPrice,Number,[Desc],CreateDate,Creator,BuyNumber,InfoDesc,ValidityDate,Score,GoodsType,ImgURL,IsAct,OrderBy,StartDate,EndDate,Discount,Depreciate,GoodsLink,Exchange,GoodClass,IsRecommend,IsOnlinePayment,IsRosebery ");
			strSql.Append(" FROM WX_PublicGood ");
			if(strWhere.Trim()!="")
			{
				strSql.Append(" where "+strWhere);
			}
			return DbHelperSQL.Query(strSql.ToString());
		}

		/// <summary>
		/// 获得前几行数据
		/// </summary>
		public DataSet GetList(int Top,string strWhere,string filedOrder)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select ");
			if(Top>0)
			{
				strSql.Append(" top "+Top.ToString());
			}
            strSql.Append(" ID,GoodNo,GoodName,MarketPrice,PublicPrice,Number,[Desc],CreateDate,Creator,BuyNumber,InfoDesc,ValidityDate,Score,GoodsType,ImgURL,IsAct,OrderBy,StartDate,EndDate,Discount,Depreciate,GoodsLink,Exchange,GoodClass,IsRecommend,IsOnlinePayment,IsRosebery ");
			strSql.Append(" FROM WX_PublicGood ");
			if(strWhere.Trim()!="")
			{
				strSql.Append(" where "+strWhere);
			}
			strSql.Append(" order by " + filedOrder);
			return DbHelperSQL.Query(strSql.ToString());
		}

		/// <summary>
		/// 获取记录总数
		/// </summary>
		public int GetRecordCount(string strWhere)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("select count(1) FROM WX_PublicGood ");
			if(strWhere.Trim()!="")
			{
				strSql.Append(" where "+strWhere);
			}
			object obj = DbHelperSQL.GetSingle(strSql.ToString());
			if (obj == null)
			{
				return 0;
			}
			else
			{
				return Convert.ToInt32(obj);
			}
		}
		/// <summary>
		/// 分页获取数据列表
		/// </summary>
		public DataSet GetListByPage(string strWhere, string orderby, int startIndex, int endIndex)
		{
			StringBuilder strSql=new StringBuilder();
			strSql.Append("SELECT * FROM ( ");
			strSql.Append(" SELECT ROW_NUMBER() OVER (");
			if (!string.IsNullOrEmpty(orderby.Trim()))
			{
				strSql.Append("order by T." + orderby );
			}
			else
			{
				strSql.Append("order by T.ID desc");
			}
			strSql.Append(")AS Row, T.*  from WX_PublicGood T ");
			if (!string.IsNullOrEmpty(strWhere.Trim()))
			{
				strSql.Append(" WHERE " + strWhere);
			}
			strSql.Append(" ) TT");
			strSql.AppendFormat(" WHERE TT.Row between {0} and {1}", startIndex, endIndex);
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
			parameters[0].Value = "WX_PublicGood";
			parameters[1].Value = "ID";
			parameters[2].Value = PageSize;
			parameters[3].Value = PageIndex;
			parameters[4].Value = 0;
			parameters[5].Value = 0;
			parameters[6].Value = strWhere;	
			return DbHelperSQL.RunProcedure("UP_GetRecordByPage",parameters,"ds");
		}*/

		#endregion  BasicMethod
		#region  ExtensionMethod

		#endregion  ExtensionMethod

        /// <summary>
        /// 是否还有库存
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public bool IsStore(int ID)
        {
            Model.WX_PublicGood model = GetModel(ID);
            if (model != null)
            {
                if (model.Number == 0 || model.Number < 0)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
            else {
                return false;
            }
        }
    }
}

