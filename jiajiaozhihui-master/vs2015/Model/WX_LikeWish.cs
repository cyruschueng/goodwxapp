using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_LikeWish:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_LikeWish
	{
		public WX_LikeWish()
		{}
		#region Model
		private int _id;
		private string _openid;
		private int? _wishid;
		private int? _opttype;
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
		public string OpenID
		{
			set{ _openid=value;}
			get{return _openid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? WishID
		{
			set{ _wishid=value;}
			get{return _wishid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? OptType
		{
			set{ _opttype=value;}
			get{return _opttype;}
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

