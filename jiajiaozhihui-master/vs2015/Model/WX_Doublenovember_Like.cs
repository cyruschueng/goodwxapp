using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Doublenovember_Like:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Doublenovember_Like
	{
		public WX_Doublenovember_Like()
		{}
		#region Model
		private int _id;
		private int? _fileid;
		private string _to_openid;
		private string _from_openid;
		private DateTime? _create_date;
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
		public int? FileID
		{
			set{ _fileid=value;}
			get{return _fileid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string To_OpenID
		{
			set{ _to_openid=value;}
			get{return _to_openid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string From_OpenID
		{
			set{ _from_openid=value;}
			get{return _from_openid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? Create_Date
		{
			set{ _create_date=value;}
			get{return _create_date;}
		}
		#endregion Model

	}
}

