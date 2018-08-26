using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Share:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Share
	{
		public WX_Share()
		{}
		#region Model
		private int _id;
		private string _openid;
		private int? _articletype;
		private int? _articleid;
		private string _integralcode;
		private DateTime? _createdate;
		/// <summary>
		/// 
		/// </summary>
		public int ID
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Openid
		{
			set{ _openid=value;}
			get{return _openid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? ArticleType
		{
			set{ _articletype=value;}
			get{return _articletype;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? ArticleID
		{
			set{ _articleid=value;}
			get{return _articleid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string IntegralCode
		{
			set{ _integralcode=value;}
			get{return _integralcode;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? CreateDate
		{
			set{ _createdate=value;}
			get{return _createdate;}
		}
		#endregion Model

	}
}

