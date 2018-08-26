using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Yuedu_Award:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Yuedu_Award
	{
		public WX_Yuedu_Award()
		{}
		#region Model
		private int _id;
		private string _openid;
		private int? _awardtype;
		private int? _earn;
		private int? _expense;
		/// <summary>
		/// 
		/// </summary>
		public int Id
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string OpenId
		{
			set{ _openid=value;}
			get{return _openid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? AwardType
		{
			set{ _awardtype=value;}
			get{return _awardtype;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Earn
		{
			set{ _earn=value;}
			get{return _earn;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Expense
		{
			set{ _expense=value;}
			get{return _expense;}
		}
		#endregion Model

	}
}

