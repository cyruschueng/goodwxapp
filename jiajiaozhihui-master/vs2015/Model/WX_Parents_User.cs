using System;
namespace SfSoft.Model
{
	/// <summary>
	/// WX_Parents_User:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class WX_Parents_User
	{
		public WX_Parents_User()
		{}
		#region Model
		private string _appid;
		private string _openid;
		private string _title;
		private int? _age;
		private string _telephone;
		private int? _isact;
		private DateTime? _regiondate;
		/// <summary>
		/// 
		/// </summary>
		public string AppId
		{
			set{ _appid=value;}
			get{return _appid;}
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
		public string Title
		{
			set{ _title=value;}
			get{return _title;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Age
		{
			set{ _age=value;}
			get{return _age;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Telephone
		{
			set{ _telephone=value;}
			get{return _telephone;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? IsAct
		{
			set{ _isact=value;}
			get{return _isact;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? RegionDate
		{
			set{ _regiondate=value;}
			get{return _regiondate;}
		}
		#endregion Model

	}
}

